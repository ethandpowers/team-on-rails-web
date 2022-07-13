import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.database();

// exports.createAccount = functions.https.onCall(async (data, context) => {
//     const email:string = data.email;
//     const password:string = data.password;
//     const name:string = data.name;
//     let user = await admin.auth().createUser({
//         email: email,
//         emailVerified: false,
//         password: password,
//         displayName: name,
//         disabled: false
//     })

//     await db.ref(`users/${user.uid}`).set({
//         name,
//         email,
//         accountCreationTimeStamp: Date.now(),
//     });

//     functions.logger.log(`created user ${user.uid}`);
//     return user;
// });

exports.deleteAccount = functions.auth.user().onDelete(async (user) => {
    //TODO: remove user from all groups and conversations
    const userId = user.uid;
    // let groupsAsMember: any = (await db.ref(`user/${userId}/groupsAsMember`).get()).val();
    // groupsAsMember = Object.values(groupsAsMember);
    // const groupsAsAdmin: any = (await db.ref(`user/${userId}/groupsAsAdmin`).get()).val();
    // groupsAsMember.forEach(async (group: any) => {
    //     let groupId = group.groupId;
    // });

    // Delete all the user's data
    db.ref(`users/${userId}`).remove();
});

exports.joinGroup = functions.https.onCall(async (data, context) => {
    //request must be authenticated
    if (context.auth) {
        try {
            // check if user is already in group
            let gam = (await db.ref(`users/${context.auth.uid}/groupsAsMember`).get()).val();
            if (gam) {
                Object.values(gam).forEach((group: any) => {
                    if (group.groupId === data.groupId) {
                        throw new Error("User is already in group");
                    }
                });
            }

            let gaa = (await db.ref(`users/${context.auth.uid}/groupsAsAdmin`).get()).val();
            if (gaa) {
                Object.values(gaa).forEach((group: any) => {
                    if (group.groupId === data.groupId) {
                        throw new Error("User is already in group");
                    }
                });
            }

            const groupId = data.groupId;
            //must retrieve the group name from the database
            const groupName: string = (await db.ref(`groups/${groupId}/name`).get()).val();
            const userId = context.auth.uid;
            const displayName = context.auth.token.name || null;
            if (!displayName) {
                functions.logger.error(`user ${userId} has no display name`);
                return;
            }

            //add the user to the group
            await db.ref(`groups/${groupId}/members/${userId}`).update({
                userId: userId,
                name: displayName,
            });

            //add the group to the user
            await db.ref(`users/${userId}/groupsAsMember`).push({
                groupId: groupId,
                name: groupName,
                joinedTimeStamp: Date.now(),
            });
            functions.logger.info(`user ${userId} joined group ${groupId}`);
            return true;
        } catch (e) {
            functions.logger.error(e);
            return false;
        }
    } else {
        functions.logger.warn("Unauthenticated request to 'joinGroup' cloud function.");
        //this should not be reached.  If it is, something went terribly wrong.
        return false;
    }
});


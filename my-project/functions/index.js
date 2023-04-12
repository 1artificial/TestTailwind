const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.checkTasksAndSendNotification = functions.pubsub
  .schedule("every 6 hours")
  .onRun(async (context) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const usersSnapshot = await admin.firestore().collection("users").get();

    usersSnapshot.forEach(async (userDoc) => {
      const userId = userDoc.id;
      const userFcmToken = userDoc.data().fcmToken;

      const datesSnapshot = await admin
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("dates")
        .doc(currentDate)
        .get();

      if (datesSnapshot.exists) {
        const todos = datesSnapshot.data().todos;

        if (todos && todos.length > 0) {
          const payload = {
            notification: {
              title: "Don't forget!",
              body: "Don't forget to complete your tasks for today.",
            },
          };

          try {
            await admin.messaging().sendToDevice(userFcmToken, payload);
            console.log("Notification sent to:", userId);
          } catch (error) {
            console.error("Error sending notification:", error);
          }
        }
      }
    });
  });

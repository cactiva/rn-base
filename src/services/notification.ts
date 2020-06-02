import { Notifications } from "expo";
import { Platform } from "react-native";
import exampleNotification, { actionHandler } from "./exampleNotification";

export default async () => {
  await registerChannelAndroid();

  // register notification
  exampleNotification();

  // notification listener
  Notifications.addListener(handleNotification);
};

const registerChannelAndroid = async () => {
  if (Platform.OS === "android") {
    await Notifications.createChannelAndroidAsync("notification", {
      name: "RN Base",
      sound: true,
      priority: "high",
      vibrate: [0, 250, 250, 250],
    });
  }
};

const handleNotification = (notif) => {
  const { data, origin } = notif;
  const { action, meta } = data;

  if (origin === "selected") {
    switch (action) {
      case "onpress":
        actionHandler(meta);
        break;

      default:
        console.log(notif);
        break;
    }
  }
};

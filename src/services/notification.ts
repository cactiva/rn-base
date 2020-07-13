import { Notifications } from "expo";
import { Platform } from "react-native";
import { exampleActionHandler } from "./exampleNotification";
import global from "@src/stores/global";

export default async () => {
  global.pushToken = await Notifications.getExpoPushTokenAsync();
  Notifications.createChannelAndroidAsync("notification", {
    name: "RN Base",
    sound: true,
    priority: "high",
    vibrate: true,
  });
  // notification listener
  Notifications.addListener(handleNotification);
};

const handleNotification = (notif) => {
  const { data, origin, notificationId } = notif;
  const { type, meta } = data;
  const notifications = global.notifications;
  let index = notifications.findIndex(
    (x) => x.data.type === type && x.data.meta.id === meta.id
  );
  notif.date = new Date();
  if (index === -1) {
    notifications.unshift(notif);
  } else {
    notifications.splice(index, 1);
    notifications.unshift(notif);
  }
  global.notifications = notifications;

  let localNotifIdx = global.localNotifications.findIndex((x) => {
    return x.notificationId * 1 === notificationId * 1;
  });
  if (localNotifIdx > -1) {
    global.localNotifications.splice(index, 1);
  }

  actionHandler(notif);
};

const actionHandler = (notif) => {
  const { data, origin } = notif;
  const { action, meta } = data;

  if (origin === "selected") {
    switch (action) {
      case "example":
        exampleActionHandler(meta);
        break;

      default:
        console.log(notif);
        break;
    }
  }
};

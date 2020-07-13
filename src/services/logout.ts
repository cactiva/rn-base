import api from "@src/libs/utils/api";
import global from "@src/stores/global";
import session from "@src/stores/session";
import { Notifications } from "expo";

export default async (msg: string = null) => {
  session.user = {};
  session.jwt = null;
  session.expired = null;
  session.isLoggedin = false;
  if (!!msg) alert(msg);

  global.notifications = [];
  if (global.localNotifications.length > 0) {
    await Promise.all(
      global.localNotifications.map(async (x) => {
        await Notifications.cancelScheduledNotificationAsync(x.notificationId);
        let index = global.localNotifications.findIndex(
          (y) => x.notificationId === y.notificationId
        );
        global.localNotifications.splice(index, 1);
      })
    );
  }
};

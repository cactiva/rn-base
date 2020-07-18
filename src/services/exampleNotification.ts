import { DateDiff } from "@src/libs";
import { Notifications } from "expo";
import _ from "lodash";
import { Platform } from "react-native";
import global from "@src/stores/global";
import { toJS } from "mobx";

export default async () => {
  let Data = await getData();
  generateNotif(Data);
};

export const exampleActionHandler = (meta) => {
  console.log("Action: ", JSON.stringify(meta));
};

const getData = async () => {
  // get your data
  return [
    {
      id: 1,
      title: "Example Notification",
      body: "This is a example for new notification.",
      date: new Date(),
    },
  ];
};

const generateNotif = async (items) => {
  if (!Array.isArray(items) || items.length === 0) return;
  const localNotifications = toJS(global.localNotifications);
  const screminderdays = "3,5,7"; // notification will present before event date
  const scremindertime = "08:00"; // notification present time
  const days = screminderdays.split(",");
  const time = scremindertime.split(":");
  await Promise.all(
    items.map(async (item) => {
      let dateTime = new Date(item.date);
      dateTime.setHours(parseInt(time[0]), parseInt(time[1]), 0);
      let content = {
        title: item.title,
        body: item.body,
        data: {
          action: "onpress",
          meta: item,
        },
        categoryId: "example",
      };
      if (Platform.OS === "android") {
        _.merge(content, {
          android: {
            channelId: "notification", // from registerChannelAndroid name
            color: "#fff",
          },
        });
      } else if (Platform.OS === "ios") {
        _.merge(content, {
          ios: {
            sound: true,
            _displayInForeground: true,
          },
        });
      }

      let localNotif = localNotifications.filter(
        (x) =>
          x.content.data.action === content.data.action &&
          x.content.data.meta.id === content.data.meta.id
      );
      if (localNotif.length > 0) {
        localNotif.map(async (x) => {
          let notificationId = x.notificationId;
          Notifications.cancelScheduledNotificationAsync(notificationId);
          let index = localNotifications.findIndex(
            (y) => x.notificationId === y.notificationId
          );
          if (index > -1) localNotifications.splice(index, 1);
        });
      }

      days.map((day) => {
        let diff = DateDiff.inDays(new Date(), new Date(item.date));
        let today = new Date();
        let eventDate = new Date(item.date);
        eventDate.setHours(parseInt(time[0]), parseInt(time[1]), 0);
        if (today.getTime() < eventDate.getTime()) {
          let notifDate = new Date();
          notifDate.setDate(today.getDate() + (diff - parseInt(day)));
          notifDate.setHours(parseInt(time[0]), parseInt(time[1]), 0);

          // This is example to present notif in second
          let tesdate = new Date();
          tesdate.setSeconds(tesdate.getSeconds() + 10);
          console.log("tes", tesdate);
          // end example
          let schedule = {
            time: tesdate, // change to notifDate for real time notification
          };
          let notificationId = Notifications.scheduleLocalNotificationAsync(
            content,
            schedule
          );
          localNotifications.push({
            notificationId,
            content,
            schedule,
          });
        }
      });
    })
  );
};

import { DateDiff } from "@src/libs";
import { Notifications } from "expo";
import _ from "lodash";
import { Platform } from "react-native";

export default async () => {
  let Data = await getData();
  generateNotif(Data);
};

export const actionHandler = (meta) => {
  console.log("Action: ", JSON.stringify(meta));
};

const getData = async () => {
  // get your data
  return [
    {
      title: "Test Notification",
      body: "This is a test for new notification.",
      date: new Date(),
    },
  ];
};

const generateNotif = async (items) => {
  if (!Array.isArray(items) || items.length === 0) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
  const screminderdays = "3,5,7"; // notification will present before event date
  const scremindertime = "08:00"; // notification present time
  const days = screminderdays.split(",");
  const time = scremindertime.split(":");
  items.map((item) => {
    let dateTime = new Date(item.date);
    dateTime.setHours(parseInt(time[0]), parseInt(time[1]), 0);
    let data = {
      title: item.title,
      body: item.body,
      data: {
        action: "onpress",
        meta: item,
      },
      categoryId: "example",
    };
    if (Platform.OS === "android") {
      _.merge(data, {
        android: {
          channelId: "notification", // from registerChannelAndroid name
          color: "#fff",
        },
      });
    } else if (Platform.OS === "ios") {
      _.merge(data, {
        ios: {
          sound: true,
          _displayInForeground: true,
        },
      });
    }

    days.map((day) => {
      let diff = DateDiff.inDays(new Date(), new Date(item.date));
      let today = new Date();
      let eventDate = new Date(item.date);
      eventDate.setHours(parseInt(time[0]), parseInt(time[1]), 0);
      if (today.getTime() < eventDate.getTime() && diff >= parseInt(day)) {
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
        Notifications.scheduleLocalNotificationAsync(data, schedule);
      }
    });
  });
};

import store from "@src/libs/store";

export const initDataGlobal = {
  setting: [],
  pushToken: null,
  notifications: [],
  localNotifications: [],
};

export default store("global", {
  setting: [],
  pushToken: null,
  notifications: [],
  localNotifications: [],
});

import { StatusBar } from "react-native";
import initDataStore, { initDataStoreAuth } from "./initDataStore";
import notification from "./notification";
import permissions from "./permissions";

export default () => {
  StatusBar.setBarStyle("light-content");

  // request permissions
  permissions();

  // init data store
  initDataStore();
};

// Service loaded after check authentication
export const servicesAuth = async () => {
  // init data store
  await initDataStoreAuth();

  // Notification service
  await notification();
};

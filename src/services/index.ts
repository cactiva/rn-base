import { StatusBar } from "react-native";
import initDataStore from "./initDataStore";
import permissions from "./permissions";
import { sourceFonts } from "@src/libs/fonts";
import * as Font from "expo-font";
import checkSession from "./checkSession";
import notification from "./notification";

export default async () => {
  StatusBar.setBarStyle("light-content");
  await Font.loadAsync(sourceFonts);

  // request permissions
  permissions();

  // notification
  notification();

  // init data store
  initDataStore();

  // check seasson
  checkSession();
  return true;
};

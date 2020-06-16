import { StatusBar } from "react-native";
import initDataStore from "./initDataStore";
import permissions from "./permissions";
import { sourceFonts } from "@src/libs/fonts";
import * as Font from "expo-font";
import checkSession from "./checkSession";

export default async () => {
  StatusBar.setBarStyle("light-content");
  await Font.loadAsync(sourceFonts);

  // request permissions
  permissions();

  // init data store
  initDataStore();
  await checkSession();
  return true;
};

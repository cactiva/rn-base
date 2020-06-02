import * as Permissions from "expo-permissions";
import { Platform } from "react-native";

export default () => {
  let permissionsRequest = [
    Permissions.NOTIFICATIONS,
    Permissions.CAMERA,
    Permissions.LOCATION,
  ] as any;
  if (Platform.OS === "ios") {
    permissionsRequest.push(Permissions.CAMERA_ROLL);
  }
  Permissions.getAsync(...permissionsRequest).then((res) => {
    Object.keys(res.permissions).map((key: any) => {
      if (res.permissions[key].status !== "granted") {
        Permissions.askAsync(key);
      }
    });
  });
};

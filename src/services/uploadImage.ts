import api from "@src/libs/utils/api";
import global from "@src/stores/global";
import { Platform } from "react-native";

export default async (value, path) => {
  if (!value) {
    return null;
  }
  const data = new FormData();
  const uri = value;
  const uripath = uri.split("/");
  const fileName = uripath[uripath.length - 1];
  const type = fileName.slice(fileName.length - 3);
  const file: any = {
    name: fileName,
    type: "image/" + type,
    uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
  };
  data.append("path", path);
  data.append("file", file);
  let res: any = await api({
    url: global.serverUrl + "index.php?r=apiService/postUpload",
    data: data,
    headers: {
      "Content-type": "multipart/form-data",
      "Secret-Key": `c5b8e538-5cd9-11ea-bc55-0242ac130003`,
    },
    method: "post",
    onError: (e) => {
      return null;
    },
  });
  if (res && res.code === 200 && !!res.compressPath) {
    let ret = res.compressPath.replace(global.serverUrl, "");
    return ret;
  } else return null;
};

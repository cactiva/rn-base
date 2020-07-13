import config from "@src/config";
import api from "@src/libs/utils/api";
import MimeType from "mime-types";
import Path from "path";

export default async (value, path) => {
  if (!value) {
    return null;
  }
  const data = new FormData();
  const fileName = Path.basename(value);
  const type = Path.extname(value);
  const file: any = {
    name: fileName,
    type: MimeType.lookup(type),
    uri: value,
  };
  data.append("path", path);
  data.append("file", file);
  let res: any = await api({
    url: config.serverUrl + "index.php?r=apiAsset/fileUpload",
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
  if (res && res.code === 200 && !!res.path) {
    return res.path;
  } else return null;
};

export const fileSave = async (path) => {
  const res: any = await api({
    method: "post",
    url: config.serverUrl + "index.php?r=apiAsset/saveFile",
    data: {
      path,
    },
    headers: {
      "Secret-Key": `c5b8e538-5cd9-11ea-bc55-0242ac130003`,
    },
  });
  if (!!res && !!res.status) {
    return res.baseUrl;
  }
  return null;
};

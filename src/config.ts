import _ from "lodash";
import setting from "../settings.json";

const mode = _.get(setting, "mode", "dev");

export default {
  appToken: "",
  serverUrl: mode === "dev" ? "" : "",
  assetUrl: mode === "dev" ? "" : "",
  mode,
};

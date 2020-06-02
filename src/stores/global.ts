import store from "@src/libs/store";

export const initDataGlobal = {
  serverUrl: "",
};

export default store("global", {
  serverUrl: "",
});

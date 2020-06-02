import store from "@src/libs/store";

export default store("session", {
  jwt: null,
  user: {},
  expired: null,
});

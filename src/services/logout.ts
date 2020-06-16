import api from "@src/libs/utils/api";
import global from "@src/stores/global";
import session from "@src/stores/session";

export default async (msg?: string) => {
  session.user = {};
  session.jwt = null;
  session.expired = null;
  session.isLoggedin = false;
  alert(msg || "You are logged out.");
};

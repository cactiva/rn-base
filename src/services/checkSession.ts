import session from "@src/stores/session";
import _ from "lodash";
import { servicesAuth } from ".";
import logout from "./logout";

export default async () => {
  if (!!session.jwt && !!_.get(session, "user.id", null)) {
    const today = new Date();
    if (today.getTime() > session.expired) {
      logout("Session has expired.");
      return false;
    } else {
      servicesAuth();
      return true;
    }
  } else if (!!session.jwt && !_.get(session, "user.id", null)) {
    setSession({
      jwt: "example",
      user: {
        id: 1,
        fullname: "user",
        role: "user",
      },
    });
    return true;
  }
  return false;
};

export const setSession = (data) => {
  session.jwt = data.jwt;
  session.user = data.user;
  const expired = new Date();
  expired.setHours(expired.getHours() + 10);
  session.expired = expired.getTime();
};

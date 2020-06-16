import session from "@src/stores/session";
import _ from "lodash";
import logout from "./logout";
import { servicesAuth } from "./serviceAuth";

export default async () => {
  if (!!session.jwt && !!_.get(session, "user.id", null)) {
    const today = new Date();
    if (today.getTime() > session.expired) {
      logout("Session has expired.");
      return (session.isLoggedin = false);
    } else {
      await servicesAuth();
      return (session.isLoggedin = true);
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
    return (session.isLoggedin = true);
  }
  return (session.isLoggedin = false);
};

export const setSession = (data) => {
  session.jwt = data.jwt;
  session.user = data.user;
  session.isLoggedin = true;
  const expired = new Date();
  expired.setHours(expired.getHours() + 10);
  session.expired = expired.getTime();
};

import { NavigationContainer } from "@react-navigation/native";
import session from "@src/stores/session";
import { observer } from "mobx-react-lite";
import React from "react";
import Guest from "./Guest";
import User from "./User";

export default observer(({ navigationRef }: any) => {
  return (
    <NavigationContainer ref={navigationRef}>
      {!!session.isLoggedin ? <User /> : <Guest />}
    </NavigationContainer>
  );
});

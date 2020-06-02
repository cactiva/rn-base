import { NavigationContainer } from "@react-navigation/native";
import Loading from "@src/pages/Loading";
import checkSession from "@src/services/checkSession";
import session from "@src/stores/session";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import Guest from "./Guest";
import User from "./User";

export default observer(({ navigationRef }: any) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loading, setLoading] = useState(true);
  const getSession = async () => {
    setIsLoggedin(await checkSession());
    setLoading(false);
  };

  useEffect(() => {
    getSession();
  }, [session.jwt]);

  if (loading) return <Loading />;

  return (
    <NavigationContainer ref={navigationRef}>
      {isLoggedin ? <User /> : <Guest />}
    </NavigationContainer>
  );
});

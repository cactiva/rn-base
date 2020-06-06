import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MainTab from "./MainTab";

const routes: any = {
  "pages/sample": require("@src/pages/Sample").default,
  "user/payment": require("@src/pages/Payment").default,
  "user/payment/detail": require("@src/pages/Payment/Detail").default,
  "user/payment/response": require("@src/pages/Payment/Response").default,
};

const Stack = createStackNavigator();
export default () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name={"Home"} component={MainTab} />
      {Object.keys(routes).map((name: string) => (
        <Stack.Screen key={name} name={name} component={routes[name]} />
      ))}
    </Stack.Navigator>
  );
};

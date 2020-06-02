import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const routes: any = {
  "guest/Login": require("../pages/Login").default,
  "guest/Loading": require("../pages/Loading").default,
};
const Stack = createStackNavigator();
export default () => {
  return (
    <Stack.Navigator initialRouteName="guest/Login" headerMode="none">
      {Object.keys(routes).map((name: string) => (
        <Stack.Screen key={name} name={name} component={routes[name]} />
      ))}
    </Stack.Navigator>
  );
};

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBar, Button, Icon, Text } from "@src/libs";
import Theme from "@src/libs/theme";
import React from "react";
import session from "@src/stores/session";
import { ViewStyle } from "react-native";

const Tab = createBottomTabNavigator();
const TabBarComponent = ({ state, descriptors, navigation }: any) => {
  return (
    <TabBar
      shadow={true}
      style={{
        backgroundColor: Theme.UIColors.primary,
      }}
      menu={[
        {
          label: "Dashboard",
          path: "Dashboard",
          icon: {
            name: "ios-home",
            size: 22,
            color: "#8A8A8A",
          },
          role: ["user", "admin"],
        },
        {
          label: "Example",
          path: "Example",
          icon: {
            name: "ios-walk",
            size: 22,
            color: "#8A8A8A",
          },
          role: ["user"],
        },
        {
          label: "Gallery",
          path: "Gallery",
          icon: {
            name: "md-images",
            size: 22,
            color: "#8A8A8A",
          },
          role: ["user"],
        },
      ]}
      template={(props: any) => {
        const { label, path, icon, role } = props;
        if (role.indexOf(session.user.role) === -1) return null;
        const active = state.routes[state.index].name === path;
        const isSales = session.user.role === "sales";
        let baseStyle: ViewStyle = {
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          borderRadius: 0,
          margin: 0,
          backgroundColor: active ? Theme.UIColors.primary : "transparent",
          padding: 5,
          height: 50,
          minWidth: 54,
          flexDirection: "column",
          width: 100,
        };
        if (isSales)
          baseStyle = {
            ...baseStyle,
            flexGrow: active ? 1 : 0,
            flexDirection: "row",
            width: undefined,
          };
        return (
          <Button
            mode="clean"
            style={baseStyle}
            onPress={() => {
              navigation.navigate(path);
            }}
          >
            {icon && <Icon style={{ margin: 0 }} {...icon} color={"#fff"} />}
            {(active || !isSales) && (
              <Text
                style={{
                  marginLeft: isSales ? 10 : 0,
                  fontSize: 12,
                  color: "#fff",
                  flexWrap: "nowrap",
                }}
                numberOfLines={1}
                ellipsizeMode={"tail"}
              >
                {label}
              </Text>
            )}
          </Button>
        );
      }}
    />
  );
};
const routes: any = {
  Dashboard: require("../pages/Dashboard").default,
  Gallery: require("../pages/Gallery").default,
  Example: require("../pages/Example").default,
};
export default () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      lazy={true}
      backBehavior="initialRoute"
      tabBar={(props) => <TabBarComponent {...props} />}
    >
      {Object.keys(routes).map((name: string) => (
        <Tab.Screen key={name} name={name} component={routes[name]} />
      ))}
    </Tab.Navigator>
  );
};

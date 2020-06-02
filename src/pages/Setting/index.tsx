import { observer } from "mobx-react-lite";
import { Screen, TopBar, Container, Button, Text, Icon } from "@src/libs";
import React from "react";
import Theme from "@src/libs/theme";
import logout from "@src/services/logout";
import { Alert } from "react-native";
import { IIconProps } from "@src/libs/ui/Icon";
import { useNavigation } from "@react-navigation/native";

export default observer(() => {
  const nav = useNavigation();
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: logout,
      },
    ]);
  };
  const menu = [
    {
      label: "Ubah Sandi",
      action: () => nav.navigate("changePassword"),
      icon: {
        name: "md-key",
      } as IIconProps,
    },
    {
      label: "Keluar",
      action: handleLogout,
      icon: {
        source: "AntDesign",
        name: "logout",
        size: 18,
      } as IIconProps,
    },
  ];
  return (
    <Screen>
      <TopBar backButton>Setting</TopBar>
      <Container
        style={{
          backgroundColor: "#fff",
          padding: 15,
        }}
      >
        {menu.map((item, key) => {
          return (
            <Button
              key={key}
              mode={"clean"}
              style={{
                paddingHorizontal: 10,
                borderRadius: 0,
                justifyContent: "flex-start",
                borderBottomWidth: 1,
                borderColor: "#ccc",
              }}
              onPress={item.action}
            >
              <Icon
                size={20}
                color={Theme.UIColors.primary}
                {...item.icon}
              ></Icon>
              <Text
                style={{
                  marginLeft: 10,
                }}
              >
                {item.label}
              </Text>
            </Button>
          );
        })}
      </Container>
    </Screen>
  );
});

import { Image, Spinner, View } from "@src/libs";
import Theme from "@src/libs/theme";
import React from "react";
import { Dimensions } from "react-native";

export default () => {
  const dim = Dimensions.get("window");
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      type={"View"}
    >
      <Image
        source={require("@src/assets/images/splash.png")}
        style={{
          width: dim.width,
          height: dim.width / 2,
          marginBottom: 20,
        }}
        disableLoading
      ></Image>
      <Spinner
        style={{
          alignSelf: "center",
        }}
        color={Theme.UIColors.primary}
      ></Spinner>
    </View>
  );
};

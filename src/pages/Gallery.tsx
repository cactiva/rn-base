import { Text, Screen, TopBar } from "@src/libs";
import React from "react";

export default () => {
  return (
    <Screen>
      <TopBar>Gallery</TopBar>
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          padding: 20,
        }}
      >
        Gallery
      </Text>
    </Screen>
  );
};

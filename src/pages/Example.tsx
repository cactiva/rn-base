import { Text, Screen, TopBar } from "@src/libs";
import React from "react";

export default () => {
  return (
    <Screen>
      <TopBar>Example</TopBar>
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          padding: 20,
        }}
      >
        Example
      </Text>
    </Screen>
  );
};

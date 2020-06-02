import { Text, Screen, Button, View } from "@src/libs";
import React from "react";
import logout from "@src/services/logout";

export default () => {
  return (
    <Screen>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            padding: 20,
          }}
        >
          Dashboard
        </Text>
        <Button
          styles={{
            label: {
              color: "white",
            },
          }}
          label="Logout"
          onPress={() => logout()}
        />
      </View>
    </Screen>
  );
};

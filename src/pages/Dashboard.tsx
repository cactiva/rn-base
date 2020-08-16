import { Text, Screen, Button, View } from "@src/libs";
import React, { useEffect } from "react";
import logout from "@src/services/logout";
import { observer, useObservable } from "mobx-react-lite";
import { Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const route = useRoute();
  const meta = useObservable({});

  useEffect(() => {}, []);

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
          Dashboard Test Deploy
        </Text>
        <Button
          styles={{
            label: {
              color: "white",
            },
          }}
          label="payment"
          onPress={() => {
            nav.navigate("user/payment");
          }}
        />
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
});

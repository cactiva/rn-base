import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Modal, View, Text } from "@src/libs";
import * as Updates from "expo-updates";

export default observer(({ meta }: any) => {
  const check = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        meta.update = true;
        await Updates.fetchUpdateAsync();
        // ... notify user of update ...
        await Updates.reloadAsync();
        meta.update = false;
      } else {
        alert("Already updated.");
      }
      meta.checkUpdate = false;
    } catch (e) {
      meta.checkUpdate = false;
      // handle or log error
      console.log(e);
    }
  };
  useEffect(() => {
    if (!!meta.checkUpdate) {
      check();
    }
  }, [meta.checkUpdate]);
  return (
    <Modal visible={meta.checkUpdate}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            height: 80,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text>
            {!meta.update ? "Checking new update..." : "Downloading update..."}
          </Text>
        </View>
      </View>
    </Modal>
  );
});

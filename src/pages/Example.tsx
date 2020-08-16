import {
  Text,
  Screen,
  TopBar,
  Container,
  BarCodeScanner,
  Camera,
} from "@src/libs";
import React, { useState, useEffect } from "react";
import libsStorage from "@src/libs/ui/store";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

export default observer(() => {
  const [value, setvalue] = useState(null);
  libsStorage.cacheImages = {};
  // useEffect(() => {
  //   setInterval(() => {
  //     console.log(toJS(libsStorage.cacheImages));
  //   }, 10000);
  // }, []);
  return (
    <Screen>
      <TopBar>Example</TopBar>
      <Container>
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            padding: 20,
          }}
        >
          Example
        </Text>
        <BarCodeScanner
          onBarCodeScanned={({ type, data }) => {
            console.log(type, data);
          }}
        ></BarCodeScanner>
        <Camera
          onCapture={(value) => {
            console.log(value);
            setvalue(value);
          }}
          value={value}
        />
      </Container>
    </Screen>
  );
});

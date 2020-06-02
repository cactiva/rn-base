import Loading from "@src/pages/Loading";
import AppRoutes from "@src/routes/AppRoutes";
import services from "@src/services";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { sourceFonts } from "@src/libs/fonts";
import { NavigationRef } from "@src/libs/RNavigation";

export default () => {
  const [loadedFont, setLoadedFont] = useState(false);
  const loadFont = async () => {
    await Font.loadAsync(sourceFonts);
    setLoadedFont(true);
  };
  useEffect(() => {
    services();
    loadFont();
  }, []);

  if (!loadedFont) {
    return <Loading />;
  }

  return <AppRoutes navigationRef={NavigationRef} />;
};

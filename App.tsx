import { NavigationRef } from "@src/libs/RNavigation";
import Loading from "@src/pages/Loading";
import AppRoutes from "@src/routes/AppRoutes";
import services from "@src/services";
import React, { useEffect, useState } from "react";

export default () => {
  const [loading, setLoading] = useState(true);
  const init = async () => {
    let res = await services();
    setLoading(res);
  };
  useEffect(() => {
    init();
  }, []);

  if (!!loading) {
    return <Loading />;
  }

  return <AppRoutes navigationRef={NavigationRef} />;
};

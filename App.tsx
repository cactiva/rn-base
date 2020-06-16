import { NavigationRef } from "@src/libs/RNavigation";
import Loading from "@src/pages/Loading";
import AppRoutes from "@src/routes/AppRoutes";
import services from "@src/services";
import React, { useEffect, useState } from "react";

export default () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(await services());
    })();
  }, []);

  if (!loading) {
    return <Loading />;
  }

  return <AppRoutes navigationRef={NavigationRef} />;
};

import { initDataStoreAuth } from "./initDataStore";

// Service loaded after check authentication
export const servicesAuth = async () => {
  // init data store
  await initDataStoreAuth();
};

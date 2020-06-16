import { initDataStoreAuth } from "./initDataStore";
import notification from "./notification";

// Service loaded after check authentication
export const servicesAuth = async () => {
  // init data store
  await initDataStoreAuth();

  // Notification service
  await notification();
};

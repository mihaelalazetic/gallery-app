import React, { createContext, useContext } from "react";
import { notification } from "antd";

type NotificationApi = ReturnType<typeof notification.useNotification>[0];

const NotificationContext = createContext<NotificationApi | null>(null);

export const useGlobalNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error(
      "useGlobalNotification must be used inside GlobalNotificationProvider"
    );
  }
  return ctx;
};

export const GlobalNotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [api, contextHolder] = notification.useNotification();

  const wrappedApi: NotificationApi = {
    ...api,
    open: (config) => {
      api.open({
        ...config,
        showProgress: config.showProgress ?? true,
        pauseOnHover: config.pauseOnHover ?? true,
      });
    },
    success: (config) => {
      api.success({
        ...config,
        showProgress: config.showProgress ?? true,
        pauseOnHover: config.pauseOnHover ?? true,
      });
    },
    error: (config) => {
      api.error({
        ...config,
        showProgress: config.showProgress ?? true,
        pauseOnHover: config.pauseOnHover ?? true,
      });
    },
    warning: (config) => {
      api.warning({
        ...config,
        showProgress: config.showProgress ?? true,
        pauseOnHover: config.pauseOnHover ?? true,
      });
    },
    info: (config) => {
      api.info({
        ...config,
        showProgress: config.showProgress ?? true,
        pauseOnHover: config.pauseOnHover ?? true,
      });
    },
  };

  return (
    <NotificationContext.Provider value={wrappedApi}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

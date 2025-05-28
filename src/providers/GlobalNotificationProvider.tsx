import React, { createContext, useContext } from "react";
import { notification } from "antd";

type NotificationApi = ReturnType<typeof notification.useNotification>[0];

const NotificationContext = createContext<NotificationApi | null>(null);

export const useGlobalNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useGlobalNotification must be used inside GlobalNotificationProvider"
    );
  return ctx;
};

export const GlobalNotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider value={api}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

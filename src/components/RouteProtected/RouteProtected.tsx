import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import useEndPoints from "../../hooks/useEndPoint";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Navigate } from "react-router-dom";
interface Props {
  children: ReactElement;
}
export const RouteProtected: FC<Props> = ({ children }) => {
  const { getFromLocalStorage } = useLocalStorage();

  return getFromLocalStorage("auth-cakes").token ? (
    children
  ) : (
    <Navigate to="/admin" replace />
  );
};

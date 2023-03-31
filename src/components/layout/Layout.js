import React from "react";
import MainNavigation from "../navigation/MainNavigation";

const Layout = ({ children }) => {
  return (
    <>
      <MainNavigation />
      {children}
    </>
  );
};

export default Layout;

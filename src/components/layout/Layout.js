import React from "react";
import MainNavigation from "../navigation/MainNavigation";
import LeftTopNav from "./LeftTopNav";
import Search from "../drawers/Search";

const Layout = ({ children }) => {
  return (
    <>
      {/* <MainNavigation /> */}
      <LeftTopNav />
      <Search />
      {children}
    </>
  );
};

export default Layout;

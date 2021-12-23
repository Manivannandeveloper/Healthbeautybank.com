import React, { FC, ReactNode, useEffect, useState } from "react";
import NcLink from "components/NcLink/NcLink";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { useHistory } from "react-router-dom";
export interface DashboardRootProps {
  className?: string;
}

const DashboardRoot: FC<DashboardRootProps> = ({ className = "" }) => {

  let history = useHistory();
  const handleLogout = () => {
    
    window.localStorage.removeItem('user-data');
    history.push("/");
  }

  return (
    <div className="rounded-xl min-h-full text-sm border border-neutral-100 dark:border-neutral-800 p-6 md:text-base">
      <span className="block text-lg mb-3">
        👋 Hello <strong>admin</strong>, (not <strong>admin</strong>?{" "}
        <a onClick={handleLogout}>Sign out</a>)
      </span>
      From your account dashboard you can view your dashboard, manage your
      {` `}
      <NcLink to="#">Posts</NcLink>, <NcLink to="#">Subscription</NcLink>,
      <NcLink to="#">edit your password and profile</NcLink>
    </div>
  );
};

export default DashboardRoot;

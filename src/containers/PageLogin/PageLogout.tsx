import LayoutPage from "components/LayoutPage/LayoutPage";
import React, { FC, ReactNode, useEffect, useState } from "react";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { API_URL } from "data/authors";

export interface PageLogoutProps {
  className?: string;
}

const PageLogout: FC<PageLogoutProps> = ({ className = "" }) => {
    window.localStorage.removeItem('user-data');
    let history = useHistory();
    useEffect(() => {
        window.localStorage.removeItem('user-data');
        history.push("/");  
        window.location.reload();
    }, []);
    
    return (
        <div className={`nc-PageLogout ${className}`} data-nc-id="PageLogout">
            <Helmet>
                <title>Login || Health Beauty Bank</title>
            </Helmet>
        </div>
    );
};

export default PageLogout;

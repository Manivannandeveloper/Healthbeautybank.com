import React, { FC, ReactNode, useEffect, useState } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { API_URL } from "data/authors";

export interface PageForgotPassProps {
  className?: string;
}

const PageForgotPass: FC<PageForgotPassProps> = ({ className = "" }) => {

  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState(false);
  let history = useHistory();

  const handleClick = () => {
    (email === '') ? setEmailValidation(true) : setEmailValidation(false); 
    const data = { 
      email: email,
    };
    if(email !== ''){
      fetch(API_URL+'thexbossapi/web/site/forgotpassword', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ 
           email: email,
         }),
       }).then((res) => res.json())
       .then((data) => {
         if(data.status === 'success'){
           window.localStorage.setItem("user-data", JSON.stringify(data));
           history.push("/");
           window.location.reload();
         }
       })
       .catch(console.log);
     }
  }

  return (
    <div
      className={`nc-PageForgotPass ${className}`}
      data-nc-id="PageForgotPass"
    >
      <Helmet>
        <title>Forgot Password || Health Beauty Bank</title>
      </Helmet>
      <LayoutPage
        subHeading="We will sent reset password instruction to your email"
        headingEmoji="🔐"
        heading="Forgot password"
      >
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            {emailValidation && <span className="validate-error">Email address cannot be blank.</span>}
            <ButtonPrimary type="button" onClick={handleClick}>Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Go back for {` `}
            <NcLink to="/login">Sign in</NcLink>
            {` / `}
            <NcLink to="/signup">Sign up</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageForgotPass;

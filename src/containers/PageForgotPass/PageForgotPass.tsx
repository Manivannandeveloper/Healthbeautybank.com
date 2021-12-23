import React, { FC, ReactNode, useEffect, useState } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";

export interface PageForgotPassProps {
  className?: string;
}

const PageForgotPass: FC<PageForgotPassProps> = ({ className = "" }) => {

  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState(false);

  const handleClick = () => {
    (email === '') ? setEmailValidation(true) : setEmailValidation(false); 
    const data = { 
      email: email,
    };
    if(email !== ''){
      fetch('https://example.com/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }

  return (
    <div
      className={`nc-PageForgotPass ${className}`}
      data-nc-id="PageForgotPass"
    >
      <Helmet>
        <title>Forgot Password || theXboss</title>
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
            {emailValidation && <span>Email address cannot be blank.</span>}
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

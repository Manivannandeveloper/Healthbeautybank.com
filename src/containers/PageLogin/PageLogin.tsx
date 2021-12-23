import LayoutPage from "components/LayoutPage/LayoutPage";
import React, { FC, ReactNode, useEffect, useState } from "react";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

export interface PageLoginProps {
  className?: string;
}

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  let history = useHistory();

  const handleLogin = () => {
    (email === '') ? setEmailValidation(true) : setEmailValidation(false); 
    (password === '') ? setPasswordValidation(true) : setPasswordValidation(false);
    if(email !== '' && password !== ''){
     fetch('http://localhost/thexbossapi/web/site/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email,
          password: password,
        }),
      }).then((res) => res.json())
      .then((data) => {
        if(data.status === 'success'){
          window.localStorage.setItem("user-data", JSON.stringify(data));
          history.push("/dashboard");
        }
      })
      .catch(console.log);
    }
  }
  
  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || theXboss</title>
      </Helmet>
      <LayoutPage
        subHeading="Welcome to our theXboss - blog Community"
        headingEmoji="🔑"
        heading="Login"
      >
        <div className="max-w-md mx-auto space-y-6">
         
          {/* FORM START*/}
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                onChange={(e) => {setEmail(e.target.value)}}
              />
              {emailValidation && <span className="mt-1">Email address cannot be blank.</span>}
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <NcLink to="/forgot-pass" className="text-sm">
                  Forgot password?
                </NcLink>
              </span>
              <Input type="password" className="mt-1" onChange={(e) => {setPassword(e.target.value)}} />
              {passwordValidation && <span className="mt-1">Password cannot be blank.</span>}
            </label>
            <ButtonPrimary type="button" 
            onClick={handleLogin}>Continue</ButtonPrimary>
          </form>
          {/* FORM END*/}

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <NcLink to="/signup">Create an account</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageLogin;

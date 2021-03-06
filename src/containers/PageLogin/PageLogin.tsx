import LayoutPage from "components/LayoutPage/LayoutPage";
import React, { FC, ReactNode, useEffect, useState } from "react";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { API_URL } from "data/authors";

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
     fetch(API_URL+'thexbossapi/web/site/login', {
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
          let role = data.role;
          window.localStorage.setItem("user-data", JSON.stringify(data));
          const articleLikePage = window.localStorage.getItem('article-id');
          const productLikePage = window.localStorage.getItem('product-id');
          if(!!articleLikePage){
            window.localStorage.removeItem('article-id');
            history.push("/article");
          }else if(!!productLikePage){
            window.localStorage.removeItem('product-id');
            history.push("/product");
          }else{
            if(role === 'Admin'){
              history.push("/dashboard");
            }else{
              history.push("/");
            }
          }
          window.location.reload();
        }
      })
      .catch(console.log);
    }
  }
  
  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Health Beauty Bank</title>
      </Helmet>
      <LayoutPage
        subHeading="Welcome to our Health Beauty Bank - blog Community"
        headingEmoji="????"
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
            </label>
            {emailValidation && <span className="validate-error">Email address cannot be blank.</span>}
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <NcLink to="/forgot-pass" className="text-sm">
                  Forgot password?
                </NcLink>
              </span>
              <Input type="password" className="mt-1" onChange={(e) => {setPassword(e.target.value)}} />
              
            </label>
            {passwordValidation && <span className="validate-error">Password cannot be blank.</span>}
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

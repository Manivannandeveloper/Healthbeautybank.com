import React, { FC, useState } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import { API_URL } from "data/authors";
import { useHistory } from "react-router-dom";


export interface PageSignUpProps {
  className?: string;
}

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  let history = useHistory();

  const sendMessage = () => {
    if(email !== ''){
      fetch(API_URL+'thexbossapi/web/site/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email,
          name: name,
          mobile: mobile,
          password: password,
        }),
      }).then((res) => res.json())
      .then((data) => {
        if(data.status === 'success'){
          history.push("/dashboard");
          window.location.reload();
        }
      })
      .catch(console.log);
    }
  }


  return (
    <div className={`nc-PageSignUp ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Health Beauty Bank</title>
      </Helmet>
      <LayoutPage
        subHeading="Welcome to our blog Health Beauty Bank Community"
        headingEmoji="🎉"
        heading="Sign up"
      >
        <div className="max-w-md mx-auto space-y-6">
          
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Name
              </span>
              <Input
                type="text"
                className="mt-1"
                onChange={(e) => {setName(e.target.value)}}
              />
            </label>
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
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input type="password" className="mt-1" onChange={(e) => {setPassword(e.target.value)}} />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirm Password
              </span>
              <Input type="password" className="mt-1" onChange={(e) => {setCpassword(e.target.value)}} />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Mobile Number
              </span>
              <Input
                type="text"
                className="mt-1"
                onChange={(e) => {setMobile(e.target.value)}}
              />
            </label>
            <ButtonPrimary type="button" onClick={sendMessage}>Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <NcLink to="/login">Sign in</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageSignUp;

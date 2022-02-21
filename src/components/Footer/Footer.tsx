import Logo from "components/Logo/Logo";
import SocialsList1 from "components/SocialsList1/SocialsList1";
import SocialsShare from "components/SocialsShare/SocialsShare";
import { CustomLink } from "data/types";
import React, {useEffect, useState} from "react";
import { API_URL } from "data/authors";
import TapTop from "./TapTop";
import { useHistory, useLocation } from "react-router-dom";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Textarea from "components/Textarea/Textarea";
import Label from "components/Label/Label";
import Input from "components/Input/Input";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Getting started",
    menus: [
      { href: "#", label: "Installation" },
      { href: "#", label: "Release Notes" },
      { href: "#", label: "Upgrade Guide" },
      { href: "#", label: "Browser Support" },
      { href: "#", label: "Editor Support" },
      { href: "#", label: "Utility-First" },
      { href: "#", label: "Dark Mode" },
      { href: "#", label: "Responsive Design" },
    ],
  },
  {
    id: "1",
    title: "Explore",
    menus: [
      { href: "#", label: "Design features" },
      { href: "#", label: "Prototyping" },
      { href: "#", label: "Design systems" },
      { href: "#", label: "Pricing" },
      { href: "#", label: "Customers" },
      { href: "#", label: "Security" },
      { href: "#", label: "Integrations" },
      { href: "#", label: "Contact" },
    ],
  },
  {
    id: "2",
    title: "Resources",
    menus: [
      { href: "#", label: "Best practices" },
      { href: "#", label: "Support" },
      { href: "#", label: "Developers" },
      { href: "#", label: "Learn design" },
      { href: "#", label: "What's new" },
      { href: "#", label: "Releases" },
      { href: "#", label: "Careers" },
      { href: "#", label: "About us" },
    ],
  },
  {
    id: "4",
    title: "Community",
    menus: [
      { href: "#", label: "Discussion Forums" },
      { href: "#", label: "Code of Conduct" },
      { href: "#", label: "Community Resources" },
      { href: "#", label: "Contributing" },
      { href: "#", label: "Concurrent Mode" },
      { href: "#", label: "API Reference" },
      { href: "#", label: "Advanced Guides" },
      { href: "#", label: "Main Concepts" },
    ],
  },
];

const Footer: React.FC = () => {
  const location = useLocation()
  const [getLocation, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [showMetaContainer, setShowMetaContainer] = useState(true);

  let history = useHistory();
  const userData = window.localStorage.getItem('user-data');
  let role = '';
  if(!!userData){
    let user = JSON.parse(userData);
    role = user.role;
  }
  useEffect( () => {
    const locPath = window.location.pathname;
    setLocation(locPath.toString());
  }, [location, getLocation]);

  useEffect(() => {
    if(getLocation !== ''){
      fetch(API_URL+'thexbossapi/web/site/seolist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: getLocation
        }),
      }).then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setId(data.id);
        setDescription(data.desc);
      })
      .catch(console.log);
    }
  },[getLocation]);

  const handleSubmit = () => {
    fetch(API_URL+'thexbossapi/web/site/addseolist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: getLocation,
        title: title,
        id: id,
        description: description,
      }),
    }).then((res) => res.json())
    .then((data) => {
      history.push(getLocation);
      window.location.reload();
    })
    .catch(console.log);
  }

  const toggleMetaContainer = () => {        
    setShowMetaContainer( showMetaContainer === true ?false : true);    
  }

  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className="nc-Footer-top relative py-4 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-2 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <a href='/policy'>Privacy Policy</a> | <a href='/terms'>Terms & conditions</a> | <a href='/disclaimer'>Disclaimer Policy</a> | <a href='/cookie'>Cookie Policy</a>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex items-center justify-end">
          {/* <div className="col-span-2 md:col-span-1"> */}
           
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className="nc-Footer relative py-4 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-2 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              @copyrights 2021 | Health Beauty Bank
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex items-center justify-end">Developed by <a href="https://inno8designs.in/">inno8 design</a></div>
        </div>
      </div>
      <div id="script-tags"></div>
      <div className="icon-bar"> 
        <SocialsShare />
      </div>      
      <TapTop />
      {(role === 'Admin' && 
        <div className="fixed grid metaInput gap-2">
          <div className="toggleBtn" onClick={toggleMetaContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absoulte" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
            </svg>
          </div>
          {showMetaContainer &&
            <>
              <h4>Meta Input</h4>
              <Label>URL</Label>
              <Input type='text' value={getLocation} readOnly className="gap-2"/>
              <Label>Title</Label>
              <Input type='text' className="gap-2" value={title} onChange={(e) => {setTitle(e.target.value)}} />
              <Label>Description</Label>
              <Textarea className="mt-1" value={description} onChange={(e) => {setDescription(e.target.value)}} />
              <ButtonPrimary className="mt-2" type="button" onClick={handleSubmit}>
                Submit
              </ButtonPrimary>
            </> 
          }
        </div>
      )}
    </>
  );
};

export default Footer;

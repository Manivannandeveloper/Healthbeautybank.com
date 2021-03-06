import React, { FC } from "react";
import Logo from "components/Logo/Logo";
import Navigation from "components/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "components/Button/ButtonPrimary";
import MenuBar from "components/MenuBar/MenuBar";
import DarkModeContainer from "containers/DarkModeContainer/DarkModeContainer";
import { useHistory } from "react-router-dom";
import {
  MegamenuItem,
  NavItemType,
} from "components/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";
import NavigationItem from "components/Navigation/NavigationItem";

export interface MainNav1Props {
  isTop: boolean;
}



const MainNav1: FC<MainNav1Props> = ({ isTop }) => {

  let userData = window.localStorage.getItem('user-data');
  let history = useHistory();
  let userName = '';
  if(!!userData){
    let user = JSON.parse(userData);
    userName = user.fullname;
  }
  const otherPageChildMenus: NavItemType[] = [
    {
      id: ncNanoId(),
      href: "/wishlist",
      name: "Wishlist",
    },
    {
      id: ncNanoId(),
      href: "/logout",
      name: "Logout",
    }
  ];

  const NAVIGATION_DEMO: NavItemType[] = [
    {
      id: ncNanoId(),
      href: "#",
      name: userName,
      type: "dropdown",
      children: otherPageChildMenus,
    },
  ];

  

  const handleLOgout = () => {
    window.localStorage.removeItem('user-data');
    history.push("/");
    window.location.reload();
  }

  return (
    <div
      className={`nc-MainNav1 relative z-10 ${
        isTop ? "onTop " : "notOnTop backdrop-filter"
      }`}
    >
      <div className="container py-4 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-4 sm:space-x-10 2xl:space-x-14">
          <Logo />
          <Navigation />
        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden items-center xl:flex space-x-1">
            <DarkModeContainer />
            <SearchDropdown />
            <div className="px-1" />
            {userName === '' ? <ButtonPrimary href="/login">Login</ButtonPrimary> : 
            <>
            {/* <div className="user-logout" onClick={handleLOgout}>
              <i className="las la-power-off mr-1"></i> {userName}
            </div> */}
            <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
              {NAVIGATION_DEMO.map((item) => (
                <NavigationItem key={item.id} menuItem={item} />
              ))}
            </ul>
            </>}
          </div>
          <div className="flex items-center xl:hidden">
            <ButtonPrimary href="/login">Sign up</ButtonPrimary>
            <div className="px-1" />
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;

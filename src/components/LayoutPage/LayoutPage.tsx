import HeadBackgroundCommon from "components/HeadBackgroundCommon/HeadBackgroundCommon";
import Heading2 from "components/Heading/Heading2";
import React, { FC } from "react";
import banner1 from "../../images/banner1.jpg";
import aboutBanner from "../../images/about-banner.jpg";

export interface LayoutPageProps {
  className?: string;
  heading: string;
  headingEmoji?: string;
  subHeading?: string;
  bannerImg: string;
}

const LayoutPage: FC<LayoutPageProps> = ({
  className = "",
  heading,
  subHeading,
  headingEmoji,
  children,
  bannerImg
}) => {
  return (
    <div
      className={`nc-LayoutPage relative ${className}`}
      data-nc-id="LayoutPage"
    >
      <HeadBackgroundCommon />
      <img src={(bannerImg === "about")? aboutBanner : banner1 } className="absolute"/>
      <div className="container relative pt-10 pb-16 lg:pt-20 lg:pb-28">        
        {/* HEADER */}
        <header className="text-center max-w-2xl mx-auto">
          <Heading2 emoji={headingEmoji}>{heading}</Heading2>
          {subHeading && (
            <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
              {subHeading}
            </span>
          )}
        </header>

        {/* CONTENT */}
        <div className="p-5 mx-auto bg-white rounded-[40px] shadow-lg sm:p-10 mt-10 lg:mt-20 lg:p-16 dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;

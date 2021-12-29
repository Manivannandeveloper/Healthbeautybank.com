import React, { FC } from "react";
import { Helmet } from "react-helmet";
import LayoutPage from "components/LayoutPage/LayoutPage";
import CookieContent from "./CookieContent";

export interface PageProductProps {
  className?: string;
}
const Cookie: FC<PageProductProps> = ({ className = "" }) => {

  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="Cookie"
    >
      <Helmet>
        <title>Cookie Policy || Health Beauty Bank</title>
      </Helmet>
      <LayoutPage
        subHeading="Drop us message and we will get back for you."
        headingEmoji=""
        heading="Cookie Policy"
      >
        <div className="container">
            <div className="nc-SingleContent space-y-10">
                <div
                    id="single-entry-content"
                    className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
                >
                    <CookieContent />
                </div>
            </div>
        </div>
      </LayoutPage>      
    </div>
  );
};

export default Cookie;

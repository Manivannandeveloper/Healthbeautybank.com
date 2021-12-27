import React, { FC } from "react";
import { Helmet } from "react-helmet";
import LayoutPage from "components/LayoutPage/LayoutPage";
import DisclaimerContent from "./DisclaimerContent";

export interface PageProductProps {
  className?: string;
}
const Disclaimer: FC<PageProductProps> = ({ className = "" }) => {

  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="Disclaimer"
    >
      <Helmet>
        <title>Disclaimer for Stylee Too || theXboss</title>
      </Helmet>
      <LayoutPage
        subHeading="Drop us message and we will get back for you."
        headingEmoji=""
        heading="Disclaimer for Stylee Too"
      >
        <div className="container">
            <div className="nc-SingleContent space-y-10">
                <div
                    id="single-entry-content"
                    className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
                >
                    <DisclaimerContent />
                </div>
            </div>
        </div>
      </LayoutPage>      
    </div>
  );
};

export default Disclaimer;
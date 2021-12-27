import React, { FC } from "react";
import { Helmet } from "react-helmet";
import LayoutPage from "components/LayoutPage/LayoutPage";
import TermsConditionsContent from "./TermsConditionsContent";

export interface PageProductProps {
  className?: string;
}
const TermsConditions: FC<PageProductProps> = ({ className = "" }) => {

  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="TermsConditions"
    >
      <Helmet>
        <title>Terms and Conditions || theXboss</title>
      </Helmet>
      <LayoutPage
        subHeading="Drop us message and we will get back for you."
        headingEmoji=""
        heading="Terms and Conditions"
      >
        <div className="container">
            <div className="nc-SingleContent space-y-10">
                <div
                    id="single-entry-content"
                    className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
                >
                    <TermsConditionsContent />
                </div>
            </div>
        </div>
      </LayoutPage>      
    </div>
  );
};

export default TermsConditions;
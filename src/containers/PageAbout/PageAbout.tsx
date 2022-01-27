import SectionHero from "components/SectionHero/SectionHero";
import rightImg from "images/about-hero-right.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import LayoutPage from "components/LayoutPage/LayoutPage";
import PageAboutContent from "./PageAboutContent";

export interface PageAboutProps {
  className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageAbout"
    >
      <Helmet>
        <title>About || Health Beauty Bank</title>
      </Helmet>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />
      <LayoutPage
        // subHeading="Drop us message and we will get back for you."
        headingEmoji=""
        heading="About us"
      >
        <div className="">
            <div className="nc-SingleContent space-y-10">
                <div
                    id="single-entry-content"
                    className="prose prose-sm !max-w-screen-md sm:prose mx-0 width-100 dark:prose-dark"
                >
                    <PageAboutContent />
                    <SectionSubscribe2 />
                </div>
            </div>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageAbout;

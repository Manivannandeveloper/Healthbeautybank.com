import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import React, { FC } from "react";
import SingleTitle from "./SingleTitle";

import { Helmet } from "react-helmet";

export interface SingleHeaderProps {
  pageData: [];
  hiddenDesc?: boolean;
  metaActionStyle?: "style1" | "style2";
  titleMainClass?: string;
  className?: string;
}

const SingleHeader: FC<SingleHeaderProps> = ({
  pageData,
  titleMainClass,
  hiddenDesc = false,
  className = "",
  metaActionStyle = "style1",
}) => {
  //const { categories, desc, title } = pageData;

  return (
    <>
      <Helmet>
        <title>Single || Blog Magazine React Template</title>
      </Helmet>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
          {/* <CategoryBadgeList itemClass="!px-3" categories={categories} />
          <SingleTitle mainClass={titleMainClass} title={title} /> */}
          
        </div>

      </div>
    </>
  );
};

export default SingleHeader;

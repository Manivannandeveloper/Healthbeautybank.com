import LayoutPage from "components/LayoutPage/LayoutPage";
import React, { ComponentType, FC } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import DashboardBillingAddress from "./DashboardBillingAddress";
import DashboardEditProfile from "./DashboardEditProfile";
import DashboardPosts from "./DashboardPosts";
import DashboardRoot from "./DashboardRoot";
import DashboardSubcription from "./DashboardSubcription";
import ArticleCategory from "./DashboardCategory";
import DashboardTags from "./DashboardTags";
import ProductCategory from "./ProductCategory";
import ArticleSubCategory from "./DashboardSubCategory";
import ProductSubCategory from "./ProductSubCategory";
import DashboardSubmitArticle from "./DashboardSubmitArticle";
import DashboardAboutUs from "./DashboardAboutUs";
import DashboardHome from "./DashboardHome";
import { Helmet } from "react-helmet";

export interface PageDashboardProps {
  className?: string;
}

interface DashboardLocationState {
  "/root"?: {};
  "/posts"?: {};
  "/edit-profile"?: {};
  "/subscription"?: {};
  "/billing-address"?: {};
  "/submit-post"?: {};
  "/submit-article"?: {};
  "/category"?: {};
  "/tags"?: {};
  "/sub-category"?: {};
  "/subcategory"?: {};
  "/product-category"?: {};
  "/product-sub-category"?: {};
  "/about-us"?: {};
  "/banner"?: {};
}

interface DashboardPage {
  sPath: keyof DashboardLocationState;
  exact?: boolean;
  component: ComponentType<Object>;
  emoij: string;
  pageName: string;
}

const subPages: DashboardPage[] = [
  {
    sPath: "/root",
    exact: true,
    component: DashboardRoot,
    emoij: "🕹",
    pageName: "Dash board",
  },
  {
    sPath: "/category",
    component: ArticleCategory,
    emoij: "📃",
    pageName: "Article Category",
  },
  {
    sPath: "/sub-category",
    component: ArticleSubCategory,
    emoij: "📃",
    pageName: "Article Sub-Category",
  },
  {
    sPath: "/product-category",
    component: ProductCategory,
    emoij: "📃",
    pageName: "Product Category",
  },
  {
    sPath: "/product-sub-category",
    component: ProductSubCategory,
    emoij: "📃",
    pageName: "Product Sub-Category",
  },
  {
    sPath: "/posts",
    component: DashboardPosts,
    emoij: "📕",
    pageName: "Article post",
  },
  {
    sPath: "/about-us",
    component: DashboardAboutUs,
    emoij: "🛠",
    pageName: "About Us",
  },
  {
    sPath: "/subscription",
    component: DashboardSubcription,
    emoij: "📃",
    pageName: "Subscription",
  },
  {
    sPath: "/banner",
    component: DashboardHome,
    emoij: "✈",
    pageName: "Home Image",
  },
  {
    sPath: "/tags",
    component: DashboardTags,
    emoij: "✍",
    pageName: "Tags",
  },
  {
    sPath: "/submit-article",
    component: DashboardSubmitArticle,
    emoij: "✍",
    pageName: "Product post",
  },
];

const PageDashboard: FC<PageDashboardProps> = ({ className = "" }) => {
  let { path, url } = useRouteMatch();

  return (
    <div className={`nc-PageDashboard ${className}`} data-nc-id="PageDashboard">
      <Helmet>
        <title>Dashboard || Health Beauty Bank</title>
      </Helmet>
      <LayoutPage
        subHeading="View your dashboard, manage your Posts, Subscription, edit password and profile"
        headingEmoji="⚙"
        heading="Dash board"
      >
        <div className="flex flex-col space-y-8 xl:space-y-0 xl:flex-row">
          {/* SIDEBAR */}

          <div className="flex-shrink-0 max-w-xl xl:w-80 xl:pr-8">
            <ul className="text-base space-y-1 text-neutral-6000 dark:text-neutral-400">
              {subPages.map(({ sPath, pageName, emoij }, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      className="flex px-6 py-2.5 font-medium rounded-lg hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                      to={`${url}${sPath}`}
                      activeClassName="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                    >
                      <span className="w-8 mr-1">{emoij}</span>
                      {pageName}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="border border-neutral-100 dark:border-neutral-800 md:hidden"></div>
          <div className="flex-grow">
            <Switch>
              {subPages.map(({ component, sPath, exact }, index) => {
                return (
                  <Route
                    key={index}
                    exact={exact}
                    component={component}
                    path={!!sPath ? `${path}${sPath}` : path}
                  />
                );
              })}
              <Redirect to={path + "/root"} />
            </Switch>
          </div>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageDashboard;

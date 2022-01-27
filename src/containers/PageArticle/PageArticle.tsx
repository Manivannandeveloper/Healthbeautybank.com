import React, { FC, useEffect,useState } from "react";
import ModalCategories from "./ModalCategories";
import ModalTags from "./ModalTags";
import { DEMO_POSTS } from "data/posts";
import { PostDataType, TaxonomyType } from "data/types";
import { DEMO_CATEGORIES, DEMO_TAGS } from "data/taxonomies";
import Pagination from "components/Pagination/Pagination";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import NcImage from "components/NcImage/NcImage";
import ArticleCard from "components/ArticleCard/ArticleCard";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import ButtonSecondary from "components/Button/ButtonSecondary";
import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import { DEMO_AUTHORS,API_URL } from "data/authors";
import articleBanner from "../../images/article-banner.jpg";


export interface PageArticleProps {
  className?: string;
}

// Tag and category have same data type - we will use one demo data
const posts: PostDataType[] = [];

const PageArticle: FC<PageArticleProps> = ({ className = "" }) => {
  const PAGE_DATA: TaxonomyType = DEMO_CATEGORIES[0];
  const [post, setPost] = useState(posts);
  const [postView, setPostView] = useState(false);
  const [categogyList, setCategogyList] = useState<any>([]);

  useEffect(() => {
    fetch(API_URL+'thexbossapi/web/site/article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ }),
      }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch(console.log);
      
        debugger;
        fetch(API_URL+'thexbossapi/web/site/category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ }),
        }).then((res) => res.json())
        .then((data) => {
          setCategogyList(data);
          console.log(categogyList);
        })
        .catch(console.log);
  },[]);

  const FILTERS = [...categogyList];


  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageArticle"
    >
      <Helmet>
        <title>Article || Health Beauty Bank</title>
      </Helmet>

      {/* HEADER */}
      <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl relative aspect-w-16 aspect-h-16 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-6 overflow-hidden ">
          <NcImage
            containerClassName="absolute inset-0"
            src={articleBanner}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
              {PAGE_DATA.name}
            </h2>
            <span className="block mt-4 text-neutral-300">
              {post.length} Articles
            </span>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <div>
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5">
              {/* <ModalCategories categories={DEMO_CATEGORIES} /> */}
              {/* <ModalTags tags={DEMO_TAGS} /> */}
              {FILTERS.length > 0 && 
              <ArchiveFilterListBox lists={FILTERS} />
              }
            </div>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-end">
              
            </div>
          </div>

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            {post.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>

          {/* PAGINATIONS */}
          {/* <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PageArticle;

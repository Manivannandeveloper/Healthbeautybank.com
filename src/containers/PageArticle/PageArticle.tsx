import React, { FC, useEffect,useState, useRef } from "react";
// import ModalCategories from "./ModalCategories";
// import ModalTags from "./ModalTags";
// import { DEMO_POSTS } from "data/posts";
import { PostDataType, TaxonomyType, categoryTypeNew } from "data/types";
import { DEMO_CATEGORIES, DEMO_TAGS } from "data/taxonomies";
// import Pagination from "components/Pagination/Pagination";
// import ButtonPrimary from "components/Button/ButtonPrimary";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBoxV1";
import { Helmet } from "react-helmet";
// import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import NcImage from "components/NcImage/NcImage";
import ArticleCard from "components/ArticleCard/ArticleCard";
// import BackgroundSection from "components/BackgroundSection/BackgroundSection";
// import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
// import ButtonSecondary from "components/Button/ButtonSecondary";
// import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import { DEMO_AUTHORS,API_URL } from "data/authors";
// import articleBanner from "../../images/article-banner.jpg";
import LeftNavMenu from "components/leftmenu/LeftMenu";


export interface PageArticleProps {
  className?: string;
}

export interface DropDownListItem {
  id: string;
  name: string;
  color: string;
  count: number;
  href: string;
  type: string;
  thumbnail: string;
}

// Tag and category have same data type - we will use one demo data
const posts: PostDataType[] = [];
const categoryTypeNew1: categoryTypeNew[] = [];

const PageArticle: FC<PageArticleProps> = ({ className = "" }) => {
  const PAGE_DATA: TaxonomyType = DEMO_CATEGORIES[0];
  const [post, setPost] = useState(posts);
  const [filterData, setFilterData] = useState(posts);
  const [postView, setPostView] = useState(false);
  const [categogyList, setCategogyList] = useState<any>([]);
  const [subCategogyList, setSubCategogyList] = useState(categoryTypeNew1);
  const [category, setCategory] = useState(0);
  const [subCategoryId, setSubCategoryId] = useState(0);
  const [filterSubCatData, setFilterSubCatData] = useState(categoryTypeNew1);
  const userData = window.localStorage.getItem('user-data');
  useEffect(() => {
    let userId = '';
    if(!!userData){
      let user = JSON.parse(userData);
      userId = user.id;
    }
    fetch(API_URL+'thexbossapi/web/site/article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
        }),
      }).then((res) => res.json())
      .then((data) => {
        setPost(data);
        setFilterData(data);
      })
      .catch(console.log);
      fetch(API_URL+'thexbossapi/web/site/articlecategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ }),
      }).then((res) => res.json())
      .then((data) => {
        setCategogyList(data);
      })
      .catch(console.log);
      fetch(API_URL+'thexbossapi/web/site/articlesubcategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ }),
      }).then((res) => res.json())
      .then((data) => {
        setSubCategogyList(data);
        setFilterSubCatData(data);
      })
      .catch(console.log);
  },[]);

  useEffect(() => {
    let data = subCategogyList;
    if(category != 0){
      data = data.filter(result=>{
        if((result.categoryId) == category){
          return result;
        }    
      });
    }
    setFilterSubCatData(data);
  },[category]);

  const FILTERS = [...categogyList];

  const filterCategory = (item: any) => {
    let data = post;
    let categoryId = item.id;
    setCategory(categoryId);
    if(categoryId != 0){
      data = data.filter(result=>{
        if((result.category) == categoryId){
          return result;
        }    
      });
    }
    setFilterData(data);
  };

  const filterSubCategory = (item: any) => {
    let data = post;
    let subCategoryId = item.id;
    setSubCategoryId(subCategoryId);
    if(subCategoryId != 0){
      data = data.filter(result=>{
        if((result.category) == category && result.subcategory == subCategoryId){
          return result;
        }    
      });
    }
    setFilterData(data);
  };

  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageArticle"
    >
      <Helmet>
        <title>Article || Health Beauty Bank</title>
      </Helmet>

      {/* HEADER */}
      <div className="w-full xl:max-w-screen-2xl mx-auto">
        <div className="relative aspect-w-16 aspect-h-16 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-6 overflow-hidden ">
          {/* <NcImage
            containerClassName="absolute inset-0"
            src={articleBanner}
            className="object-cover w-full h-full"
          /> */}
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

      <div className="container py-16 lg:py-18 space-y-8 lg:space-y-18">
        <div>
          {/* <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row lg:grid-cols-1"> */}
            {/* <div className="flex space-x-2.5"> */}
              {/* <ModalCategories categories={DEMO_CATEGORIES} /> */}
              {/* <ModalTags tags={DEMO_TAGS} /> */}
              {/* {FILTERS.length > 0 && 
                <ArchiveFilterListBox lists={FILTERS} getAlert={filterCategory} />
              }
              {!!category && filterSubCatData.length > 0 && 
                <ArchiveFilterListBox lists={filterSubCatData} getAlert={filterSubCategory} />
              }
            </div> */}            
              {/* <LeftNavMenu />
          </div> */}

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
          {FILTERS.length > 0 && 
          <LeftNavMenu lists={FILTERS} subLists={filterSubCatData}/>
          }
            {filterData.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PageArticle;

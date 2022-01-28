import React, { FC,useEffect,useState } from "react";
import ModalTags from "./ModalTags";
import { DEMO_POSTS } from "data/posts";
import { PostDataType, TaxonomyType, categoryTypeNew } from "data/types";
import { DEMO_CATEGORIES, DEMO_TAGS } from "data/taxonomies";
import { Helmet } from "react-helmet";
import NcImage from "components/NcImage/NcImage";
import Card11 from "components/Card11/Card11";
import { DEMO_AUTHORS,API_URL } from "data/authors";
import productBanner from "../../images/product-banner.jpg";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBoxV1";

export interface PageProductProps {
  className?: string;
}
// Tag and category have same data type - we will use one demo data

const PageProduct: FC<PageProductProps> = ({ className = "" }) => {
  const PAGE_DATA: TaxonomyType = DEMO_CATEGORIES[1];
  const categoryTypeNew1: categoryTypeNew[] = [];
  const posts: PostDataType[] = [];
  const FILTERS = [
    { name: "Most Recent" },
    { name: "Curated by Admin" },
    { name: "Most Appreciated" },
    { name: "Most Discussed" },
    { name: "Most Viewed" },
  ];
  const [post, setPost] = useState(posts);
  const [filterData, setFilterData] = useState(posts);
  const [postView, setPostView] = useState(false);
  const [categogyList, setCategogyList] = useState<any>([]);
  const [subCategogyList, setSubCategogyList] = useState(categoryTypeNew1);
  const [category, setCategory] = useState(0);
  const [subCategoryId, setSubCategoryId] = useState(0);
  const [filterSubCatData, setFilterSubCatData] = useState(categoryTypeNew1);
  useEffect(() => {
    fetch(API_URL+'thexbossapi/web/site/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ }),
      }).then((res) => res.json())
      .then((data) => {
        setPost(data);
        setFilterData(data);
      })
      .catch(console.log);
      fetch(API_URL+'thexbossapi/web/site/productcategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }).then((res) => res.json())
      .then((data) => {
        setCategogyList(data);
      })
      .catch(console.log);
      fetch(API_URL+'thexbossapi/web/site/productsubcategory', {
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

  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageProduct"
    >
      <Helmet>
        <title>Product || Health Beauty Bank</title>
      </Helmet>

      
      {/* HEADER */}
      {!postView && <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl relative aspect-w-16 aspect-h-16 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-6 overflow-hidden ">
          <NcImage
            containerClassName="absolute inset-0"
            src={productBanner}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
              {PAGE_DATA.name}
            </h2>
            <span className="block mt-4 text-neutral-300">
              {post.length} Products
            </span>
          </div>
        </div>
      </div>}
      {/* ====================== END HEADER ====================== */}

      {!postView &&<div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <div>
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5">
              {categogyList.length > 0 && 
                  <ArchiveFilterListBox lists={categogyList} getAlert={filterCategory} />
                }
                {!!category && filterSubCatData.length > 0 && 
                  <ArchiveFilterListBox lists={filterSubCatData} getAlert={filterSubCategory} />
                }
            </div>
          </div>

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            {filterData.map((post) => (
              <Card11 key={post.id} post={post} />
            ))}
          </div>

          {/* PAGINATIONS */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            {/* <Pagination /> */}
            {/* <ButtonPrimary>Show me more</ButtonPrimary> */}
          </div>
        </div>

        {/* MORE SECTIONS */}
        {/* === SECTION 5 === */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionGridCategoryBox
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          />
          <div className="text-center mx-auto mt-10 md:mt-16">
            <ButtonSecondary>Show me more</ButtonSecondary>
          </div>
        </div> */}

       

        {/* SUBCRIBES */}
        {/* <SectionSubscribe2 /> */}
      </div>}
      {postView &&
        <div>View</div>
      }
    </div>
  );
};

export default PageProduct;

import React, {useState, useEffect} from "react";
import SectionLatestPosts from "./SectionLatestPosts";
import SectionSliderPosts from "./SectionSliderPosts";
import SectionSliderPostsNew from "./SectionSliderPostsNew";
import SectionMagazine1 from "./SectionMagazine1";
import SectionVideos from "./SectionVideos";
import SectionLargeSlider from "./SectionLargeSlider";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import { PostDataType } from "data/types";
import {
  DEMO_POSTS,
  DEMO_POSTS_AUDIO,
  DEMO_POSTS_GALLERY,
  DEMO_POSTS_VIDEO,
} from "data/posts";
//import { DEMO_CATEGORIES } from "data/taxonomies";
import { TaxonomyType } from "data/types";
import { DEMO_AUTHORS } from "data/authors";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import SectionMagazine4 from "./SectionMagazine4";
import SectionAds from "./SectionAds";
import SectionGridPosts from "./SectionGridPosts";
import SectionMagazine7 from "./SectionMagazine7";
import SectionMagazine8 from "./SectionMagazine8";
import SectionMagazine9 from "./SectionMagazine9";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { API_URL } from "data/authors";
import CustomHelmet from "components/Footer/CustomHelmet";

//
const POSTS: PostDataType[] = [];

const POSTS1: PostDataType[] = DEMO_POSTS;

const DEMO_CATEGORIES: TaxonomyType[] = [];

//
const MAGAZINE1_TABS = ["all", "Garden", "Fitness", "Design"];
const MAGAZINE1_POSTS = DEMO_POSTS.filter((_, i) => i >= 8 && i < 16);
const MAGAZINE2_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7);
//


const PageHome: React.FC = () => {

  const [articleData, setArticleData] = useState(POSTS);
  const [productData, setProductData] = useState(POSTS);
  const [categoryList, setCategoryList] = useState(DEMO_CATEGORIES);
  const [whiteBg, setWhiteBg] = useState('');
  const userData = window.localStorage.getItem('user-data');
  useEffect(() => {
    setWhiteBg('white-bg');
    //Article list API
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
        setArticleData(data);
      })
      .catch(console.log);

      //Category list API
      fetch(API_URL+'thexbossapi/web/site/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ }),
      }).then((res) => res.json())
      .then((data) => {
        setCategoryList(data);
      })
      .catch(console.log);

      //Product list API
      fetch(API_URL+'thexbossapi/web/site/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
        }),
      }).then((res) => res.json())
      .then((data) => {
        setProductData(data);
      })
      .catch(console.log);
  },[]);

  return (
    <div className="nc-PageHome relative cstm-mob-home">
      
        <CustomHelmet />
      
      {/* ======== ALL SECTIONS ======== */}
      <div className="relative overflow-hidden">
        {/* ======== BG GLASS ======== */}
        <BgGlassmorphism />

        {/* ======= START CONTAINER ============= */}
        <div className="relative">
          {/* === SECTION  === */}
          <SectionLargeSlider
            className=""
            posts={POSTS1.filter((_, i) => i < 3)}
          />

          {/* === SECTION 5 === */}
          <SectionSliderNewCategories
            className="py-8 lg:py-8"
            heading="Top trending topics"
            subHeading= "Discover the most outstanding articles"
            categories={categoryList.filter((_, i) => i < 10)}
            categoryCardType="card4"
          />

        </div>


        <div className="container ">
          
          {/* === SECTION 12 === */}
          <div className="relative pt-16 hide-next-btn">
            <BackgroundSection />
            <SectionSliderPosts
              postCardName="card11"
              heading="Latest articles"
              subHeading={"Over " +articleData.length+ " articles "}
              posts={articleData?.slice(0, 4)}
              sliderStype="style2"
            />
          </div>
          <div className="relative pt-16 hide-next-btn">
            <BackgroundSection whiteBg = {whiteBg} />
            <SectionSliderPostsNew
              postCardName="card11"
              heading="Latest Products"
              subHeading={"Over " +productData.length+ " Products "}
              posts={productData?.slice(0, 4)}
              sliderStype="style2"
            />
          </div>

        </div>
        {/* ======= END CONTAINER ============= */}
      </div>
    </div>
  );
};

export default PageHome;

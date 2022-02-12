import React, {useState, useEffect} from "react";
import { Helmet } from "react-helmet";
import { PostDataType } from "data/types";
import ArticleCard from "components/ArticleCard/ArticleCard";
import Card15Podcast from "components/Card15Podcast/Card15Podcast";
import Card11 from "components/Card11/Card11";
import {
  DEMO_POSTS,
  DEMO_POSTS_AUDIO,
  DEMO_POSTS_GALLERY,
  DEMO_POSTS_VIDEO,
} from "data/posts";
//import { DEMO_CATEGORIES } from "data/taxonomies";
import { TaxonomyType } from "data/types";
import { API_URL } from "data/authors";

//
const POSTS: PostDataType[] = [];

const POSTS1: PostDataType[] = DEMO_POSTS;

const DEMO_CATEGORIES: TaxonomyType[] = [];

//
const MAGAZINE1_TABS = ["all", "Garden", "Fitness", "Design"];
const MAGAZINE1_POSTS = DEMO_POSTS.filter((_, i) => i >= 8 && i < 16);
const MAGAZINE2_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7);
//


const PageWishList: React.FC = () => {

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
    fetch(API_URL+'thexbossapi/web/site/articlewishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId : userId
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
      fetch(API_URL+'thexbossapi/web/site/productwishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId : userId
        }),
      }).then((res) => res.json())
      .then((data) => {
        setProductData(data);
      })
      .catch(console.log);
  },[]);

  return (
    <div className="nc-PageWishList relative">
      <Helmet>
        <title>Wishlist || Health Beauty Bank</title>
      </Helmet>

      {/* ======== ALL SECTIONS ======== */}
      <div className="relative overflow-hidden">
       
        <div className="container ">
          
            {/* === SECTION 12 === */}
            <div className="text-center w-full max-w-2xl mx-auto mt-4">
              <h2 className="text-3xl md:text-4xl font-semibold">Wishlist Articles</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
                {articleData.map((post) => (
                  // <ArticleCard key={post.id} post={post} />
                  <Card15Podcast key={post.id} post={post} />
                ))}
                {articleData.length === 0 &&
                  <div>No article added.</div>
                }
            </div>
            <div className="text-center w-full max-w-2xl mx-auto mt-4">
              <h2 className="text-3xl md:text-4xl font-semibold">Wishlist Products</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10 mb-4">
                {productData.map((post) => (
                  // <Card11 key={post.id} post={post} />
                  <Card15Podcast key={post.id} post={post} />
                ))}
                {productData.length === 0 &&
                  <div>No product added.</div>
                }
            </div>
        </div>
        {/* ======= END CONTAINER ============= */}
      </div>
    </div>
  );
};

export default PageWishList;

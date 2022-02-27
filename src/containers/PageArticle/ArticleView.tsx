import React, { FC, useEffect,useState } from "react";
import ModalTags from "./ModalTags";
import { DEMO_POSTS } from "data/posts";
import { PostDataType, TaxonomyType } from "data/types";
import { DEMO_CATEGORIES, DEMO_TAGS } from "data/taxonomies";
import { Helmet } from "react-helmet";
import { useHistory, useLocation, useParams } from "react-router-dom";
// import NcImage from "components/NcImage/NcImage";
// import articleBanner from "../../images/article-banner.jpg";
import { API_URL } from "data/authors";
import ButtonPrimary from "components/Button/ButtonPrimary";
import CustomHelmet from "components/Footer/CustomHelmet";
export interface ArticleViewProps {
  className?: string;
  title?: string
}
// Tag and category have same data type - we will use one demo data

const ArticleView: FC<ArticleViewProps> = ({ className = "" }) => {
    const PAGE_DATA: TaxonomyType = DEMO_CATEGORIES[0];
    interface IPost {
        id: number;
        userId?: number;
        title: string;
        body: string;
    }
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [articleId, setArticleId] = useState('');
    const location = useLocation<{ myState: 'value' }>();
    let { uid } = useParams<{ uid: string }>();
    const state = location?.state;
    let history = useHistory();
    const userData = window.localStorage.getItem('user-data');
    useEffect(() => {
        fetch(API_URL+'thexbossapi/web/site/articleview', {
            method: 'POST',
            body: JSON.stringify({
                id: state,
                uid: uid
            }),
          }).then((res) => res.json())
          .then((result) => {
              setTitle(result.title);
              setContent(result.desc);
              setArticleId(result.id);
              let scrtipt = result.scriptTagList;
              let scriptTag = document.getElementById('scriptInput');
              Object.keys(scrtipt).forEach(function(key) {
                  if(!!scriptTag){
                      scriptTag.innerHTML = scrtipt[key];
                      let scripts = scriptTag.getElementsByTagName('script');
                      if(scripts.length > 0){
                          let myScript = scripts[scripts.length - 1];
                          let my_awesome_script = document.createElement('script');
                          my_awesome_script.setAttribute('src',myScript.src);
                          document.head.appendChild(my_awesome_script);
                          scriptTag.innerHTML = '';
                      }
                      
                  }
              });
          })
          .catch(console.log);
        
    }, []);
    const addWishList = () => {
      let userId = '';
      if(!!userData){
          let user = JSON.parse(userData);
          userId = user.id;
          fetch(API_URL+'thexbossapi/web/site/addarticlewishlist', {
              method: 'POST',
              body: JSON.stringify({
                  user_id: userId,
                  article_id: articleId,
              }),
          }).then((res) => res.json())
          .then((result) => {
            history.push("/wishlist");  
            window.location.reload();
          })
          .catch(console.log);
      }else{
          history.push("/login");
          window.location.reload();
      }
  }
    return (
        <div
        className={`nc-PageAbout overflow-hidden relative ${className}`}
        data-nc-id="ArticleView"
        >
            <CustomHelmet />         
            
                <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
                {/* HEADER */}
      <div className="w-full xl:max-w-screen-2xl mx-auto absolute">
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
              {PAGE_DATA.count} Articles
            </span>
          </div>
        </div>
      </div>
      
      {/* ====================== END HEADER ====================== */}
            <div className="container article-container relative pt-10 pb-16 lg:pt-20 lg:pb-28">
              <div className="p-5 mx-auto bg-white rounded-[40px] shadow-lg sm:p-10 mt-10 lg:mt-20 lg:p-16 dark:bg-neutral-900">
                <div className="flex">
                <h2 className={className + "ml-0 text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 max-w-4xl "}>
                    {title}
                </h2>
                <div className="push-right">
                <ButtonPrimary className="ml-2 hide" type="button" onClick={addWishList}> Add to Wish List </ButtonPrimary>
                </div>
                </div>
                <div className="nc-SingleContent space-y-10">
                    <div
                        id="single-entry-content"
                        className=""
                        dangerouslySetInnerHTML={{ __html: content}} >
                    </div>
                </div>
              </div> 
        </div>
        <div id="scriptInput" className="hide"></div>
        </div>
  );
};

export default ArticleView;

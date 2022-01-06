import React, { FC, useEffect,useState } from "react";
import ModalTags from "./ModalTags";
import { DEMO_POSTS } from "data/posts";
import { PostDataType, TaxonomyType } from "data/types";
import { DEMO_CATEGORIES, DEMO_TAGS } from "data/taxonomies";
import Content from "./Content";
import { Helmet } from "react-helmet";
import { useHistory, useLocation } from "react-router-dom";
import { API_URL } from "data/authors";
export interface ProductViewProps {
  className?: string;
  title?: string
}
// Tag and category have same data type - we will use one demo data

const ProductView: FC<ProductViewProps> = ({ className = "" }) => {

    interface IPost {
        id: number;
        userId?: number;
        title: string;
        body: string;
    }
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const location = useLocation<{ myState: 'value' }>();
    const state = location?.state;

    useEffect(() => {
        //ajax
        fetch(API_URL+'thexbossapi/web/site/productview', {
            method: 'POST',
            body: JSON.stringify({
                id: state,
            }),
          }).then((res) => res.json())
          .then((result) => {
              setTitle(result.title);
              setContent(result.desc);
          })
          .catch(console.log);
        
    }, []);
    return (
        <div
        className={`nc-PageAbout overflow-hidden relative ${className}`}
        data-nc-id="ProductView"
        >
            <Helmet>
                <title>Product view || theXboss</title>
            </Helmet>
            {/* <div className="nc-PageSingleTemp3Sidebar "><div className="dark container relative z-10">
                <div className="nc-SingleHeader "><div className="space-y-5">
                <h1 className={className + " text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 max-w-4xl "} title={data?.title}>
                {data?.title}
                </h1>
                <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
                </div>
                </div>
                </div>
            </div> */}
            <h1 className={className + " ml-4 text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 max-w-4xl "}>
                {title}
                </h1>
                <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
            <div className="container">
            <div className="nc-SingleContent space-y-10">
                <div
                    id="single-entry-content"
                    className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
                    dangerouslySetInnerHTML={{ __html: content}} >
                </div>
            </div>
        </div>
        </div>
  );
};

export default ProductView;

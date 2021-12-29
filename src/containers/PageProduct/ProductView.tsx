import React, { FC, useEffect } from "react";
import ModalTags from "./ModalTags";
import { DEMO_POSTS } from "data/posts";
import { PostDataType, TaxonomyType } from "data/types";
import { DEMO_CATEGORIES, DEMO_TAGS } from "data/taxonomies";
import Content from "./Content";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
export interface ProductViewProps {
  className?: string;
}
// Tag and category have same data type - we will use one demo data

const ProductView: FC<ProductViewProps> = ({ className = "" }) => {
    const id = 1;
    const data ={
        "index": 1,
        "id": "1",
        "featuredImage": "./../images/slider1.jpg",
        "title": "test data",
        "desc": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
        "date": "May 20, 2021",
        "href": "/productview/1",
        "commentCount": 0,
        "viewdCount": 0,
        "readingTime": 0,
        "bookmark": { "count": 0, "isBookmarked": false },
        "like": { "count": 0, "isLiked": false },
        "authorId": 1,
        "categoriesId": [1],
        "postType": "standard"
    };
    // UPDATE CURRENTPAGE DATA IN PAGEREDUCERS
    useEffect(() => {
        //ajax
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
            <h1 className={className + " ml-4 text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 max-w-4xl "} title={data?.title}>
                {data?.title}
                </h1>
                <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
            <div className="container">
            <div className="nc-SingleContent space-y-10">
                <div
                    id="single-entry-content"
                    className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
                >
                    <Content />
                </div>
            </div>
        </div>
        </div>
  );
};

export default ProductView;

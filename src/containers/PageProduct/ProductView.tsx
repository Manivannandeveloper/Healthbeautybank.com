import React, { FC, useEffect,useState } from "react";
import ModalTags from "./ModalTags";
import { DEMO_POSTS } from "data/posts";
import { PostDataType, TaxonomyType } from "data/types";
import { DEMO_CATEGORIES, DEMO_TAGS } from "data/taxonomies";
import Content from "./Content";
import { Helmet } from "react-helmet";
import { useHistory, useLocation } from "react-router-dom";
import NcImage from "components/NcImage/NcImage";
import { API_URL } from "data/authors";
import productBanner from "../../images/product-banner.jpg";
import { DEMO_POSTS_GALLERY } from "data/posts";
import Card10 from "components/Card10/Card10";

const postsDemo: PostDataType[] = DEMO_POSTS_GALLERY.filter(
    (_, i) => i > 7 && i < 17
  );
export interface ProductViewProps {
  className?: string;
  title?: string;
  posts?: PostDataType[];
}
// Tag and category have same data type - we will use one demo data

const ProductView: FC<ProductViewProps> = ({ className = "", posts = postsDemo }) => {
    const PAGE_DATA: TaxonomyType = DEMO_CATEGORIES[1];
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
            <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
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
                    {PAGE_DATA.count} Products
                    </span>
                </div>
                </div>
            </div>
            <h1 className={className + " ml-4 text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 max-w-4xl "}>
                {title}
                </h1>
                <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
            <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-3">
                <Card10 post={posts[2]} />
            </div>
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

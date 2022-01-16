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
import PostTypeFeaturedIcon from "components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

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
    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [imagesList, setImagesList] = useState([]);
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
              setContent1(result.desc);
              setContent2(result.descNew);
              setImagesList(result.fileList);
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
            <div className="w-full xl:max-w-screen-2xl mx-auto">
                <div className="relative aspect-w-16 aspect-h-16 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-6 overflow-hidden ">
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
            
                <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
            <div className="container product-container my-10">
            <h2 className={className + "text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 max-w-4xl "}>
                {title}
            </h2>
            <div className={`nc-SectionMagazine1 ${className}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    <div className={`nc-Card2 group relative flex flex-col  [ nc-box-has-hover ] [  nc-dark-box-bg-has-hover ] overflow-hidden ${className}`} data-nc-id="Card2">
                        
                        <CarouselProvider
                            naturalSlideWidth={100}
                            naturalSlideHeight={125}
                            totalSlides={3}
                            disableAnimation={false}
                        >
                            <Slider>
                            
                            {imagesList.map((image:{images:string,id:number}) => (
                                <Slide index={image.id}>
                                <NcImage
                                containerClassName="absolute inset-0"
                                src={image.images}
                                alt={title}
                                />
                                </Slide>
                            ))}
                            </Slider>
                            <ButtonBack className={'left-carousel-btn'}>{'<'}</ButtonBack>
                            <ButtonNext className={'rigth-carousel-btn'}>{'>'}</ButtonNext>
                        </CarouselProvider>

                        
                    
                    </div>
                    <div className="grid gap-6 md:gap-8">
                        <div
                            className={`nc-Card6 relative  group flex-col-reverse sm:flex-row sm:items-center p-4  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
                            data-nc-id="Card6" dangerouslySetInnerHTML={{ __html: content1}}
                            >
                        </div>
                        <div
                            className={`nc-Card6 relative group flex-col-reverse sm:flex-row sm:items-center p-4  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
                            data-nc-id="Card6" dangerouslySetInnerHTML={{ __html: content2}}
                            >
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
        </div>
  );
};

export default ProductView;

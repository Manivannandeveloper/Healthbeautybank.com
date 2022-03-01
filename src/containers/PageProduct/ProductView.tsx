import React, { FC, useEffect,useState, useRef } from "react";
import ModalTags from "./ModalTags";
import { DEMO_POSTS } from "data/posts";
import { PostDataType, TaxonomyType } from "data/types";
import { DEMO_CATEGORIES, DEMO_TAGS } from "data/taxonomies";
import Content from "./Content";
import { Helmet } from "react-helmet";
import { useHistory, useLocation, useParams } from "react-router-dom";
// import NcImage from "components/NcImage/NcImage";
import { API_URL } from "data/authors";
// import productBanner from "../../images/product-banner.jpg";
import { DEMO_POSTS_GALLERY } from "data/posts";
import Card10 from "components/Card10/Card10";
import PostTypeFeaturedIcon from "components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
//import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { FacebookShareButton, LinkedinShareButton, InstapaperShareButton, TwitterShareButton, PinterestShareButton} from "react-share";
import { FacebookIcon } from "react-share";
// import ButtonPrimary from "components/Button/ButtonPrimary";
import Slider, { Settings as SliderSettings } from "react-slick";
import { Media} from 'reactstrap';
// import ImageGallery from 'react-image-gallery';

import {
    Container,
    Row,
    Col,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
  } from "reactstrap";
import CustomHelmet from "components/Footer/CustomHelmet";

  

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
    const [titleActive, setTitleActive] = useState(false);
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [quantityActive, setQuantityActive] = useState(false);
    const [size, setSize] = useState('');
    const [sizeActive, setSizeActive] = useState(false);
    const [color, setColor] = useState('');
    const [colorActive, setColorActive] = useState(false);
    const [discount, setDiscount] = useState('');
    const [discountAmount, setDiscountAmount] = useState('');
    const [discountActive, setDiscountActive] = useState(false);
    const [descActive, setDescActive] = useState(false);
    const [descNewActive, setDescNewActive] = useState(false);
    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');
    const [imagesList, setImagesList] = useState([]);
    const [productId, setProductId] = useState('');
    const location = useLocation<{ myState: 'value' }>();
    const [totalProduct, setTotalProduct] = useState(0);
    const [ttlQunty, setTtlQunty] = useState(0);
    const [productUrl, setProductUrl ] = useState('');  
    const [imageURL, setImageURL] = useState('');
    const [changeSrc, setChangeSrc] = useState('');
    const [productUuid, setProductUuid] = useState('');
    const state = location?.state;
    let history = useHistory();
    const userData = window.localStorage.getItem('user-data');
    const [activeTab, setActiveTab] = useState("1");
    const [activeSize, setActiveSize] = useState("");
    const [activeColor, setActiveColor] = useState("");
    let { uid } = useParams<{ uid: string }>();
    const [stateN, setState] = useState({ nav1: null, nav2: null });
    const slider1 = useRef();
    const slider2 = useRef();
    const [productImg, setProductImg] = useState<any>();

    // useEffect(() => {
    //     debugger;
    //     imagesList.map((images:string, id:number) => {        
    //         const imgs = {  original: images, thumbnail: images};
    //         setProductImg([...productImg, imgs]);
    //     })
    // },[])    

    var products = {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        fade: true,
        infinite: false
    };
    var productsnav = {
        slidesToShow: 3,
        swipeToSlide: true,
        arrows: false,
        dots: false,
        vertical:true,
        focusOnSelect: true,
        infinite: false
    };

    const { nav1, nav2 } = stateN;

    useEffect(() => {
        let userId = '';
        if(!!userData){
            let user = JSON.parse(userData);
            userId = user.id;
        }
        //ajax
        fetch(API_URL+'thexbossapi/web/site/productview', {
            method: 'POST',
            body: JSON.stringify({
                uid: uid,
                userId: userId,
            }),
          }).then((res) => res.json())
          .then((result) => {
              setTitle(result.title);
              setTitleActive(result.titleActive);
              setPrice(result.price);
              setDiscountActive(result.discountActive);
              setContent1(result.desc);
              setContent2(result.descNew);
              setImagesList(result.fileList);
              setProductId(result.id);
              setTotalProduct(result.total);
              setProductUrl(result.productUrl);
              setImageURL(result.featuredImage);
              setChangeSrc(result.featuredImage);
              setDiscount(result.discount);
              setProductUuid('https://healthbeautybank.com/productview/'+result.productUuid);
              setDiscountAmount(result.discountAmount);
              setSizeActive(result.sizeActive);
              setColorActive(result.colorActive);
              setDescActive(result.descActive);
              setDescNewActive(result.descNewActive);
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
            fetch(API_URL+'thexbossapi/web/site/addproductwishlist', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: userId,
                    product_id: productId,
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

    const handleImage  = (src:string) => {
        setChangeSrc(src);
    }

    const decreament = () => {
        let val = ttlQunty;
        if(val === 0){
            val = 0;
        }else{
            val = val - 1;
        }
        setTtlQunty(val);
    }

    const increament = () => {
        let val = ttlQunty;
        setTtlQunty(val + 1);
    }

    return (
        <div
        className={`nc-PageAbout overflow-hidden relative ${className}`}
        data-nc-id="ProductView"
        id="nc-product-view-id"
        >
            <CustomHelmet />
            <div className="w-full xl:max-w-screen-2xl mx-auto">
                <div className="relative aspect-w-16 aspect-h-16 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-6 overflow-hidden ">
                {/* <NcImage
                    containerClassName="absolute inset-0"
                    src={productBanner}
                    className="object-cover w-full h-full"
                /> */}
                <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
                    <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
                    {PAGE_DATA.name}
                    </h2>
                    <span className="block mt-4 text-neutral-300">
                    {totalProduct} Products
                    </span>
                </div>
                </div>
            </div>
            
                <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
            <div className="container product-container my-10">
            
            <div className="flex mb-2">
                <h2 className={className + "text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 max-w-4xl "}>
                    {title}
                </h2>
                {/* <div className="push-right">
                {productUrl !== '' && 
                    <a className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 login-btn bg-primary-6000 hover:bg-primary-700 text-neutral-50 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 remove-icon-pro" href={productUrl}>Buy Now</a>
                }
                <ButtonPrimary className="ml-2" type="button" onClick={addWishList}> Add to Wish List </ButtonPrimary>
                </div> */}
            </div>
            <div id="nc-product-view-id" className={`nc-SectionMagazine1 ${className}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                    <div className={`nc-Card2 group relative flex overflow-hidden ${className}`} data-nc-id="Card2">                  
                        {imagesList.length > 0 && <>
                        <div className="thumb-img gap-2">
                            {imagesList.map((image:{images:string,id:number}) => (
                                <div className="column">
                                    <img src={image.images} alt="Nature" onClick={() => handleImage(image.images)} />
                                </div>
                            ))}
                        </div>
                        <div className="slider-img gap-1">
                            <img id="expandedImg" src={changeSrc} />
                            <div id="imgtext"></div>
                        </div>
                        </>}
                    </div>
                    <div className="grid gap-6 md:gap-8 hide">
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
                    <div className="grid gap-6 md:gap-8">
                        <div className="product-right undefined">
                            {titleActive && <h2> {title} </h2>}
                            {discountActive && <h4>
                                <del>₹{price}</del>
                                <span>{discount}% off</span>
                            </h4>}
                            <h3>₹{!discountActive ? price : discountAmount}</h3>
                            {colorActive && <ul className="color-variant">
                                <li className={activeColor === "1" ? "white active" : "white"} onClick={() => setActiveColor("1")} title="white"></li>
                                <li className={activeColor === "2" ? "black active" : "black"} onClick={() => setActiveColor("2")} title="black"></li>
                            </ul>}
                            
                            <div className="product-description border-product">
                                {sizeActive && <div>
                                    <h6 className="product-title size-text">select size
                                        <span>
                                            <a data-toggle="modal" data-target="#sizemodal">size chart</a>
                                        </span>
                                    </h6>
                                    <div className="size-box">
                                        <ul>
                                            <li className={activeSize === "1" ? "active" : ""} onClick={() => setActiveSize("1")}><a>S</a></li>
                                            <li className={activeSize === "2" ? "active" : ""} onClick={() => setActiveSize("2")}><a>M</a></li>
                                            <li className={activeSize === "3" ? "active" : ""} onClick={() => setActiveSize("3")}><a>L</a></li>
                                            <li className={activeSize === "4" ? "active" : ""} onClick={() => setActiveSize("4")}><a>XL</a></li>
                                        </ul>
                                    </div>
                                </div>}
                                <span className="instock-cls">InStock</span>
                                <h6 className="product-title">quantity</h6>
                            </div>
                            <div className="qty-box"><div className="input-group">
                                <span className="input-group-prepend">
                                    <button type="button" className="btn quantity-left-minus" data-type="minus" onClick={decreament}>
                                        -
                                    </button>
                                </span>
                                <input name="quantity" type="text" className="form-control input-number form-control" value={ttlQunty} />
                                <span className="input-group-prepend">
                                    <button type="button" className="btn quantity-right-plus" data-type="plus" onClick={increament}>
                                        +
                                    </button>
                                </span>
                                </div>
                            </div>
                            <br/>
                            <div className="product-buttons">
                                <a className="btn btn-solid" onClick={addWishList}>Wishlist</a>
                                <a className="btn btn-solid" href={productUrl}>buy now</a>
                            </div>
                            {descActive && <div className="border-product">
                                <h6 className="product-title">product details</h6>
                                <p dangerouslySetInnerHTML={{ __html: content1}}></p>
                            </div>}
                            <div className="border-product">
                                <h6 className="product-title">Share it</h6>
                                <div className="mt-3">
                                    <FacebookShareButton
                                        url={productUuid}
                                        quote={title}
                                        className="Demo__some-network__share-button"
                                    >
                                        <a
                                            href="#"
                                            className={`rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 w-7 h-7 text-base hover:bg-neutral-100`}
                                            title={`Share on Facebook`}
                                            target="_blank"
                                        >
                                            <i className="lab la-facebook-f"></i>
                                        </a>
                                    </FacebookShareButton>
                                    <TwitterShareButton
                                        url={productUuid}
                                        className="Demo__some-network__share-button"
                                    >
                                        <a
                                            href="#"
                                            className={`rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 w-7 h-7 text-base hover:bg-neutral-100`}
                                            title={`Share on Twitter`}
                                            target="_blank"
                                        >
                                            <i className="lab la-twitter"></i>
                                        </a>
                                    </TwitterShareButton>
                                    <LinkedinShareButton
                                        url={productUuid}
                                        className="Demo__some-network__share-button"
                                    >
                                        <a
                                            href="#"
                                            className={`rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 w-7 h-7 text-base hover:bg-neutral-100`}
                                            title={`Share on Linkedin`}
                                            target="_blank"
                                        >
                                            <i className="lab la-linkedin-in"></i>
                                        </a>
                                    </LinkedinShareButton>
                                    <InstapaperShareButton
                                        url={productUuid}
                                        className="Demo__some-network__share-button"
                                    >
                                        <a
                                            href="#"
                                            className={`rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 w-7 h-7 text-base hover:bg-neutral-100`}
                                            title={`Share on Instagram`}
                                            target="_blank"
                                        >
                                            <i className="lab la-instagram"></i>
                                        </a>
                                    </InstapaperShareButton>
                                    <PinterestShareButton
                                        url={productUuid}
                                        media="/favicon.ico"
                                        className="Demo__some-network__share-button"
                                    >
                                        <a
                                            href="#"
                                            className={`rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 w-7 h-7 text-base hover:bg-neutral-100`}
                                            title={`Share on Pinterest`}
                                            target="_blank"
                                        >
                                            <i className="lab la-pinterest"></i>
                                        </a>
                                    </PinterestShareButton>
                                </div>
                            </div>
                            <div className="border-product hide">
                                <h6 className="product-title">Time Reminder</h6>
                                <div className="timer-box">
                                    <div>
                                        <div className="timer"><p id="demo"><span>9<span className="padding-l">:</span><span className="timer-cal">Days</span></span><span>8<span className="padding-l">:</span><span className="timer-cal">Hrs</span></span><span>2<span className="padding-l">:</span><span className="timer-cal">Min</span></span><span>46<span className="timer-cal">Sec</span></span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            {<section className="tab-product mt-5">
                {/* <Container> */}
                    <Row>
                        <Col sm="12" lg="12">
                            <Row className="product-page-main m-0">
                            <Nav tabs className="nav-material">
                                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                                {descNewActive && <NavLink
                                    className={activeTab === "1" ? "active" : ""}
                                    onClick={() => setActiveTab("1")}
                                >
                                    Additional Information
                                </NavLink>}
                                </NavItem>
                                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                                {descActive && <NavLink
                                    className={activeTab === "2" ? "active" : ""}
                                    onClick={() => setActiveTab("2")}
                                >
                                    Details
                                </NavLink>}
                                </NavItem>
                                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                                <NavLink
                                    className={activeTab === "3" ? "active" : "hide"}
                                    onClick={() => setActiveTab("3")}
                                >
                                    Vedio
                                </NavLink>
                                </NavItem>
                                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                                <NavLink
                                    className={activeTab === "4" ? "active" : "hide"}
                                    onClick={() => setActiveTab("4")}
                                >
                                    Write Review
                                </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab} className="nav-material">
                                {descNewActive && <TabPane tabId="1">
                                    <p className="mb-0 pb-0" dangerouslySetInnerHTML={{ __html: content2}}></p>
                                </TabPane>}
                                {descActive && <TabPane tabId="2">
                                    <p className="mb-0 pb-0" dangerouslySetInnerHTML={{ __html: content1}}></p>
                                </TabPane>}
                                <TabPane tabId="3">
                                <p className="mb-0 pb-0">
                                    {" "}
                                    sed do eiusmod tempor incididunt ut labore et dolore magna
                                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit
                                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                    occaecat cupidatat non proident, sunt in culpa qui officia
                                    deserunt mollit anim id est laborum."
                                </p>
                                </TabPane>
                                <TabPane tabId="4">
                                <p className="mb-0 pb-0">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                    do eiusmod tempor incididunt ut labore et dolore magna
                                    aliqua. Ut enim ad minim veniam, 
                                </p>
                                </TabPane>
                            </TabContent>
                            </Row>
                        </Col>
                    </Row>
                {/* </Container> */}
            </section>}
        </div>
        <div id="scriptInput" className="hide"></div>
        </div>
  );
};

export default ProductView;
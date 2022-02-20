import React,{useState,useEffect} from "react";
import NcImage from "components/NcImage/NcImage";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Select from "components/Select/Select";
import Textarea from "components/Textarea/Textarea";
import Label from "components/Label/Label";
import { useHistory, useLocation } from "react-router-dom";
import {Editor} from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, Modifier } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { API_URL } from "data/authors";
import { v4 as uuid } from "uuid";

export interface DashboardSubmitArticleProps {
  EditorState?: EditorState;
  ContentState?: ContentState;
}

const DashboardSubmitArticle = () => {
  const categoryData: {id:number,name:string}[] = [];
  const categoryListA: {id:number,name:string,categoryId:number,categoryName:string}[] = [];
  const data1: {id:number,title:string,script:string,script_tag:string}[] = [];
  const [tagsList, setTagsList ] = useState(data1);
  const [title, setTitle] = useState('');
  const [titleActive, setTitleActive] = useState('0');
  const [price, setPrice] = useState('');
  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');
  const [content1Active, setContent1Active] = useState('0');
  const [content2Active, setContent2Active] = useState('0');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [fileName, setFileName ] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState(categoryListA);
  const [filterCategory, setFilterCategory] = useState(categoryData);
  const [editor1State, setEditor1State ] = useState(EditorState.createEmpty());
  const [editor2State, setEditor2State ] = useState(EditorState.createEmpty());
  const [fileSelected, setFileSelected] = React.useState<FileList>() // also tried <string | Blob>
  const [editProductId, setEditProductId ] = useState(false);  
  const [fileUrl, setFileUrl ] = useState('');  
  const [productUrl, setProductUrl ] = useState('');  
  let history = useHistory();
  const location = useLocation<{ myState: 'value' }>();
  const state = location?.state;
  const [data, setData] = useState([]);
  const [addPost, setAddPost] = useState(false);
  const [type, setType] = useState('Product');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [sizeList, setSizeList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [discount, setDiscount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sizeActive, setSizeActive] = useState('0');
  const [colorActive, setColorActive] = useState('0');
  const [discountActive, setDiscountActive] = useState('0');
  const [quantityActive, setQuantityActive] = useState('0');
  const [postUUID, setPostUUID] = useState(uuid());
  useEffect(() => {
    fetch(API_URL+'thexbossapi/web/site/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ }),
      }).then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch(console.log);

      fetch(API_URL+'thexbossapi/web/site/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type
        }),
      }).then((res) => res.json())
      .then((data) => {
        setCategoryList(data);
      })
      .catch(console.log);

      fetch(API_URL+'thexbossapi/web/site/subcategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type
        }),
      }).then((res) => res.json())
      .then((data) => {
        setSubCategoryList(data);
      })
      .catch(console.log);

      fetch(API_URL+'thexbossapi/web/site/productitems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
      .then((data) => {
        setColorList(data.colorData);
        setSizeList(data.sizeData);
      })
      .catch(console.log);

      if(!!state){
        fetch(API_URL+'thexbossapi/web/site/productview', {
          method: 'POST',
          body: JSON.stringify({
              id: state,
          }),
        }).then((res) => res.json())
        .then((result) => {
            setTitle(result.title);
            let category = result.categoriesId;
            setCategory(category.toString());
        })
        .catch(console.log);
      }
      fetch(API_URL+'thexbossapi/web/site/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type
        }),
      }).then((res) => res.json())
      .then((data) => {
        setTagsList(data);
      })
      .catch(console.log);

  },[]);

  const handlePost = () => {
    if(title !== '' && content1 !== ''){
      const formData = new FormData();
      if (fileSelected && fileName !== '') {
        for (let i = 0; i < fileSelected.length; i++) {
            formData.append(`image[${i}]`, fileSelected[i])
        }
      }
      formData.append("title", title);
      formData.append("desc", content1);
      formData.append("aditional_info", content2);
      formData.append("category_id", category);
      formData.append("sub_category_id", subCategory);
      formData.append("prize", price);
      formData.append("url", productUrl);
      formData.append("title_active", titleActive);
      formData.append("desc_active", content1Active);
      formData.append("aditional_info_active", content2Active);
      formData.append("size_id", size);
      formData.append("color_id", color);
      formData.append("discount", discount);
      formData.append("quantity", quantity);
      formData.append("size_active", sizeActive);
      formData.append("color_active", colorActive);
      formData.append("discount_active", discountActive);
      formData.append("quantity_active", quantityActive);
      formData.append("product_uuid", postUUID);
      fetch(API_URL+'thexbossapi/web/site/addproduct', {
        method: 'POST',
        body: formData,
      }).then((res) => res.json())
      .then((data) => {
        if(data.status === 'success'){
          history.push("/product");
          window.location.reload();
        }
      })
      .catch(console.log);
    }
  }

  const onEditor1StateChange = (editorState:EditorState) => {
    setContent1(draftToHtml(convertToRaw(editorState.getCurrentContent())));
		setEditor1State(editorState);
	}

  const onEditor2StateChange = (editorState:EditorState) => {
    setContent2(draftToHtml(convertToRaw(editorState.getCurrentContent())));
		setEditor2State(editorState);
	}

  

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;
    let allFiles = '';
    let srcList = '';
    let imgTag = document.getElementById('thaumb-view');
    for (let i = 0; i < fileList.length; i++) {
      let fileNmae = fileList[i].name;
      let comma = i === 0 ? '' : ', ';
      allFiles = allFiles + comma +fileNmae;
      let src = URL.createObjectURL(fileList[i]);
      srcList = srcList + '<img class="img-thumb" src="'+src+'" />';
    }
    setFileName(allFiles);
    setFileSelected(fileList);
    if(!!imgTag){
      imgTag.innerHTML = srcList;
    }
  }

  const editProduct = (id:number) => {
    setAddPost(true);
    //history.push("/dashboard/submit-article",{ id: id});
    fetch(API_URL+'thexbossapi/web/site/productview', {
      method: 'POST',
      body: JSON.stringify({
        id: {id : id},
      }),
    }).then((res) => res.json())
    .then((result) => {
        setTitle(result.title);
        let category = result.categoriesId;
        setCategory(category.toString());
        const textToConvert = result.desc;
        const textToConvertNew = result.descNew;
        const contentBlock = htmlToDraft(textToConvert);
        const contentBlockNew = htmlToDraft(textToConvertNew);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const contentStateNew = ContentState.createFromBlockArray(contentBlockNew.contentBlocks);
        setEditor1State(EditorState.createWithContent(contentState));
        setEditor2State(EditorState.createWithContent(contentStateNew));
        setEditProductId(result.id);
        setContent1(result.desc);
        setContent2(result.descNew);
        setPrice(result.price)
        let filePath = result.filePath;
        //setFileName(filePath.replace("postimages/", ""));
        let imgTag = document.getElementById('thaumb-view');
        if(!!imgTag){
          imgTag.innerHTML = result.filePath;
        }
    })
    .catch(console.log);
  }

  const deleteProduct = (id:number) => {
    fetch(API_URL+'thexbossapi/web/site/deleteproduct', {
      method: 'POST',
      body: JSON.stringify({
        id: id,
    }),
    }).then((res) => res.json())
    .then((data) => {
      if(data.status === 'success'){
        setData(data.postList);
      }
    })
    .catch(console.log);
  }

  const uploadCallback1 = (file:Blob, callback:string) => {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      console.log(reader);
      reader.onloadend = async () => {
        const formData = new FormData();
        formData.append("image", file);
        const res = await fetch(API_URL+'thexbossapi/web/site/fileupload', {
          method: 'POST',
          body: formData,
        }).then((res) => res.json())
        .then((data) => {
          resolve({ data: { link: data.filePath } });
        })
        .catch(console.log);
      };
      reader.readAsDataURL(file);
    });
  }

  const config1 = {
    image: { uploadCallback: uploadCallback1,
      previewImage: true,
      alt: { present: false, mandatory: false } },
  };

  const uploadCallback2 = (file:Blob, callback:string) => {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      console.log(reader);
      reader.onloadend = async () => {
        const formData = new FormData();
        formData.append("image", file);
        const res = await fetch(API_URL+'thexbossapi/web/site/fileupload', {
          method: 'POST',
          body: formData,
        }).then((res) => res.json())
        .then((data) => {
          resolve({ data: { link: data.filePath } });
        })
        .catch(console.log);
      };
      reader.readAsDataURL(file);
    });
  }

  const config2 = {
    image: { uploadCallback: uploadCallback2,
      previewImage: true,
      alt: { present: false, mandatory: false } },
  };

  useEffect(() => {
    let res = subCategoryList;
    if(category !== ''){
      res = res.filter(result=>{
        if((result.categoryId) == parseInt(category)){
          return result;
        }
      });
    }
    setFilterCategory(res);
  }, [category]);

  const removeImg = () => {
    setFileName('');
    let imgTag = document.getElementById('thaumb-view');
    if(!!imgTag){
      imgTag.innerHTML = '';
    }
  }

  const ExtraTagsList1 = ( ) => {
    const save = (editorState:EditorState, value:string) => {
      const contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        value,
        editorState.getCurrentInlineStyle(),
      );
      EditorState.push(editorState, contentState, 'insert-characters');
      setEditor1State(EditorState.createWithContent(contentState));
      setContent1(draftToHtml(convertToRaw(contentState)));
    };
    return (
      <div className="rdw-inline-wrapper" aria-label="rdw-inline-control">
        {tagsList.length > 0 && tagsList.map((item, index) => {
          return (<div className="rdw-option-wrapper" aria-selected="false" onClick={() => save(editor1State,item.title)}>{item.title}</div>
        );})}
      </div>
    );
  }

  const ExtraTagsList2 = ( ) => {
    const save = (editorState:EditorState, value:string) => {
      const contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        value,
        editorState.getCurrentInlineStyle(),
      );
      EditorState.push(editorState, contentState, 'insert-characters');
      setEditor2State(EditorState.createWithContent(contentState));
      setContent2(draftToHtml(convertToRaw(contentState)));
    };
    return (
      <div className="rdw-inline-wrapper" aria-label="rdw-inline-control">
        {tagsList.length > 0 && tagsList.map((item, index) => {
          return (<div className="rdw-option-wrapper" aria-selected="false" onClick={() => save(editor2State,item.title)}>{item.title}</div>
        );})}
      </div>
    );
  }
  
  return (
    <>
      {!addPost && <div className="flex flex-col space-y-8">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          
          <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
          
            <div className="new-post" onClick={(e: React.MouseEvent<HTMLElement>) => setAddPost(true)}><span className="text-primary-800 dark:text-primary-500 hover:text-primary-900">
              New Product
            </span></div>
            <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                <thead className="bg-neutral-50 dark:bg-neutral-800">
                  <tr className="text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                    <th scope="col" className="px-6 py-3">
                      Product Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                  {data.length > 0 && data.map((item:{id:number,title:string,categoryName:string,featuredImage:string}) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                          <NcImage
                            containerClassName="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14"
                            src={item.featuredImage}
                          />
                          <div className="ml-4 flex-grow">
                            <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                              {item.title}
                            </h2>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                        <span> {item.categoryName}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-sm text-neutral-500 dark:text-neutral-400 rounded-full">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                        {/* <span
                          className="text-primary-800 dark:text-primary-500 hover:text-primary-900 cursor-pointer"
                          onClick={(e: React.MouseEvent<HTMLElement>) =>  editProduct(item.id)}
                        >
                          Edit
                        </span>
                        {` | `} */}
                        <span
                          onClick={(e: React.MouseEvent<HTMLElement>) =>  deleteProduct(item.id)}
                          className="text-rose-600 hover:text-rose-900 cursor-pointer"
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                  {data.length === 0 &&
                    <tr><td className="px-6 py-4">No data found</td>.</tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* <Pagination /> */}
      </div>}
      {addPost &&<div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
        <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
          <label className="block md:col-span-2">
            <Label>Category</Label>
            <Select className="mt-1" onChange={(e) => {setCategory(e.target.value)}} value={category}>
              <option value="-1">– select –</option>
              {categoryList.length > 0 && categoryList.map((item:{id:number,name:string,type:string}, index) => {
                if(item.type === 'Product'){
                  return <option value={item.id} key={item.id}>{item.name}</option>
                }
              })}
            </Select>
          </label>
          <label className="block md:col-span-2">
          <Label>Sub Category  *</Label>
            <Select className="mt-1" onChange={(e) => {setSubCategory(e.target.value)}} value={subCategory}>
              <option value="-1">– select –</option>
              {filterCategory.length > 0 && filterCategory.map((item:{id:number,name:string}, index) => {
                return <option value={item.id} key={index}>{item.name}</option>
              })}
            </Select>
          </label>
          <div className="block md:col-span-2">
            <Label>Product Images</Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-neutral-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                {/* <p className="text-xs text-neutral-500">
                  {fileName}
                </p> */}
                <p id="thaumb-view"></p>
                {fileName !== '' && <span className="remove-icon-pro" onClick={removeImg}>Remove</span>}
                <p className="text-xs text-neutral-500">
                  PNG, JPG, GIF up to 2MB
                </p>
              </div>
            </div>
          </div>
          <label className="block md:col-span-2">
            <Label>Product Title *</Label>
            <div className="check-flex">
              <input className="form-check-input form-checkbox-type" type="checkbox" onChange={() => setTitleActive(titleActive == '0' ? '1' : '0')} />
              <Input type="text" className="mt-1 ml-2" value={title}  onChange={(e) => {setTitle(e.target.value)}}/>
            </div>
          </label>
          <label className="block md:col-span-2">
            <input className="form-check-input form-checkbox-type" type="checkbox" onChange={() => setContent1Active(content1Active == '0' ? '1' : '0')} /><Label className="ml-2">Product Description</Label>
          </label>
          <label className="block md:col-span-2">
            <div className="check-flex">
              <div className="mt-2">
                <Editor
                  editorState={editor1State}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditor1StateChange}
                  toolbar={config1}
                  toolbarCustomButtons={[<ExtraTagsList1 />]}
                />
              </div>
            </div>
          </label>
          <label className="block md:col-span-2">
            <input className="form-check-input form-checkbox-type" type="checkbox" id="addinfo" onChange={() => setContent2Active(content2Active == '0' ? '1' : '0')} /><Label className="ml-2">Additional Information</Label>
          </label>
          <label className="block md:col-span-2">
              <div className="mt-2">
                <Editor
                  editorState={editor2State}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditor2StateChange}
                  toolbar={config2}
                  toolbarCustomButtons={[<ExtraTagsList2 />]}
                />
              </div>
          </label>
          <label className="block md:col-span-2">
            <Label>Size</Label>
            <div className="check-flex">
              <input className="form-check-input form-checkbox-type" type="checkbox" onChange={() => setSizeActive(sizeActive == '0' ? '1' : '0')} />
              <Select className="mt-1 ml-2" onChange={(e) => {setSize(e.target.value)}}>
                <option value="-1">– select –</option>
                {/* <option value="1">S</option>
                <option value="1">M</option>
                <option value="1">L</option>
                <option value="1">XL</option> */}
                {sizeList.length > 0 && sizeList.map((item:{id:number,title:string}, index) => {
                  return <option value={item.id} key={item.id}>{item.title}</option>
                })}
              </Select>
            </div>
          </label>
          <label className="block md:col-span-2">
            <Label>Color</Label>
            <div className="check-flex">
              <input className="form-check-input form-checkbox-type" type="checkbox" onChange={() => setColorActive(colorActive == '0' ? '1' : '0')} />
              <Select className="mt-1 ml-2" onChange={(e) => {setColor(e.target.value)}}>
                <option value="-1">– select –</option>
                {/* <option value="1">Red</option>
                <option value="1">Yellow</option> */}
                {colorList.length > 0 && colorList.map((item:{id:number,title:string}, index) => {
                  return <option value={item.id} key={item.id}>{item.title}</option>
                })}
              </Select>
            </div>
          </label>
          <label className="block md:col-span-2">
            <Label>Quantity</Label>
            <div className="check-flex">
              <input className="form-check-input form-checkbox-type" type="checkbox" onChange={() => setQuantityActive(quantityActive == '0' ? '1' : '0')} />
              <Input type="text" className="mt-1 ml-2" value={quantity}  onChange={(e) => {setQuantity(e.target.value)}}/>
            </div>
          </label>
          <label className="block md:col-span-2">
            <Label>Buy URL</Label>
            <Input type="text" className="mt-1" value={productUrl}  onChange={(e) => {setProductUrl(e.target.value)}}/>
          </label>
          <label className="block md:col-span-2">
            <Label>Price *</Label>
            <Input type="text" className="mt-1" value={price}  onChange={(e) => {setPrice(e.target.value)}}/>
          </label>
          <label className="block md:col-span-2">
            <Label>Discount</Label>
            <div className="check-flex">
              <input className="form-check-input form-checkbox-type" type="checkbox" onChange={() => setDiscountActive(discountActive == '0' ? '1' : '0')} />
              <Input type="text" className="mt-1 ml-2" value={discount}  onChange={(e) => {setDiscount(e.target.value)}}/>
            </div>
          </label>
          <ButtonPrimary className="md:col-span-2" type="button" onClick={handlePost}>
            Submit
          </ButtonPrimary>
        </form>
      </div>}
    </>
  );
};

export default DashboardSubmitArticle;

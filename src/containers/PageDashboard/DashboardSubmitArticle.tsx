import React,{useState,useEffect} from "react";
import NcImage from "components/NcImage/NcImage";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Select from "components/Select/Select";
import Textarea from "components/Textarea/Textarea";
import Label from "components/Label/Label";
import { useHistory, useLocation } from "react-router-dom";
import {Editor} from "react-draft-wysiwyg";
import { EditorState,convertToRaw,ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { API_URL } from "data/authors";

export interface DashboardSubmitArticleProps {
  EditorState?: EditorState;
  ContentState?: ContentState;
}

const DashboardSubmitArticle = () => {

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');
  const [categogy, setCategogy] = useState('');
  const [fileName, setFileName ] = useState('');
  const [categogyList, setCategogyList] = useState([]);
  const [editor1State, setEditor1State ] = useState(EditorState.createEmpty());
  const [editor2State, setEditor2State ] = useState(EditorState.createEmpty());
  const [fileSelected, setFileSelected] = React.useState<FileList>() // also tried <string | Blob>
  const [editProductId, setEditProductId ] = useState(false);  
  const [fileUrl, setFileUrl ] = useState('');  
  let history = useHistory();
  const location = useLocation<{ myState: 'value' }>();
  const state = location?.state;
  const [data, setData] = useState([]);
  const [addPost, setAddPost] = useState(false);
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
            setCategogy(category.toString());
        })
        .catch(console.log);
      }
  },[]);

  useEffect(() => {    
    fetch(API_URL+'thexbossapi/web/site/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ }),
    }).then((res) => res.json())
    .then((data) => {
      setCategogyList(data);
    })
    .catch(console.log);
  },[]);

  const handlePost = () => {
    if(title !== '' && content1 !== ''){
      const formData = new FormData();
      if (fileSelected) {
        for (let i = 0; i < fileSelected.length; i++) {
            formData.append(`image[${i}]`, fileSelected[i])
        }
      }
      formData.append("title", title);
      formData.append("content", content1);
      formData.append("content_new", content2);
      formData.append("category_id", categogy);
      formData.append("price", price);
      formData.append("category_id", categogy);
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
        setCategogy(category.toString());
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
            <Select className="mt-1" onChange={(e) => {setCategogy(e.target.value)}} value={categogy}>
              <option value="-1">– select –</option>
              {categogyList.length > 0 && categogyList.map((item:{id:number,name:string}, index) => {
                return <option value={item.id}>{item.name}</option>
              })}
            </Select>
          </label>
          <label className="block md:col-span-2">
            <Label>Post Title *</Label>
            <Input type="text" className="mt-1" value={title}  onChange={(e) => {setTitle(e.target.value)}}/>
          </label>
          

          <div className="block md:col-span-2">
            <Label>Featured Image</Label>

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
                <p className="text-xs text-neutral-500">
                  PNG, JPG, GIF up to 2MB
                </p>
              </div>
            </div>
          </div>
          {/* <label className="block md:col-span-2">
            <Label> Post Content</Label>
            <Textarea className="mt-1" rows={6} onChange={(e) => {setContent(e.target.value)}}  />
          </label> */}
          <label className="block md:col-span-2">
            <Label> Post Content 1</Label>
            <Editor
              editorState={editor1State}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditor1StateChange}
              toolbar={config1}
            />
          </label>
          <label className="block md:col-span-2">
            <Label> Post Content 2</Label>
            <Editor
              editorState={editor2State}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditor2StateChange}
              toolbar={config2}
            />
          </label>
          <label className="block md:col-span-2">
            <Label>Price *</Label>
            <Input type="text" className="mt-1" value={price}  onChange={(e) => {setPrice(e.target.value)}}/>
          </label>
          {/* <label className="block md:col-span-2">
            <Label> Post Content</Label>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
            />
          </label> */}
          <ButtonPrimary className="md:col-span-2" type="button" onClick={handlePost}>
            Submit
          </ButtonPrimary>
        </form>
      </div>}
    </>
  );
};

export default DashboardSubmitArticle;

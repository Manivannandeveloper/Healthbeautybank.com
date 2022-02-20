import React,{useState,useEffect} from "react";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Select from "components/Select/Select";
import Textarea from "components/Textarea/Textarea";
import Label from "components/Label/Label";
import { useHistory, useLocation } from "react-router-dom";
import {Editor} from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, convertFromHTML, convertFromRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { API_URL } from "data/authors";
import { v4 as uuid } from "uuid";

export interface DashboardHomeProps {
  EditorState?: EditorState;
  ContentState?: ContentState;
  editVal?: EditorState;
  postId?: number;
}

const DashboardHome = () => {
  const categoryData: {id:number,name:string}[] = [];
  const categoryListA: {id:number,name:string,categoryId:number,categoryName:string}[] = [];
  const resA: {id:number,name:string,categoriesId:string,categoryName:string}[] = [];
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState(categoryListA);
  const [editorState, setEditorState ] = useState(EditorState.createEmpty());
  const [editArticle, setEditArticle ] = useState(false);
  const [articleId, setArticleId ] = useState('');
  const [fileName, setFileName ] = useState('');
  const [status, setStatus ] = useState('1');
  const [srcPath, setSrcPath] = useState('');
  const [postUUID, setPostUUID] = useState(uuid());
  const [type, setType] = useState('Article');
  const [filterCategory, setFilterCategory] = useState(categoryData);
  const [res, setRes] = useState(resA);
  const [fileSelected, setFileSelected] = React.useState<File>() // also tried <string | Blob>
  let history = useHistory();
  const location = useLocation<{ id: string }>();
  const state = location?.state;

    useEffect(() => {
        fetch(API_URL+'thexbossapi/web/site/getbanner', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), 
        }).then((res) => res.json())
        .then((data) => {
            setSrcPath(data);
            setFileName(data);
        })
        .catch(console.log);
    },[]);

    const handlePost = () => {
        const formData = new FormData();
        formData.append("image", '');
        if (fileSelected && fileName !== '') {
            formData.append("image", fileSelected);
        }
        formData.append("id", articleId);
        fetch(API_URL+'thexbossapi/web/site/updatebanner', {
          method: 'POST',
          body: formData,
        }).then((res) => res.json())
        .then((data) => {
          if(data.status === 'success'){
            history.push("/");
            window.location.reload();
          }
        })
        .catch(console.log);
    }

   const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
      const fileList = e.target.files;
      if (!fileList) return;
      let file = fileList[0];
      let fileNmae = file.name;
      setFileName(fileNmae);
      setFileSelected(fileList[0]);
      setSrcPath(URL.createObjectURL(fileList[0]));
  };

  const removeImg = () => {
    setFileName('');
    //setFileSelected([]);
    setSrcPath('');
  }

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
       
        <div className="block md:col-span-2">
          <Label>Image</Label>

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
                    onChange={handleImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-neutral-500 flex">
                {fileName !== '' &&
                  <div className="img-wrap">
                    <img className="img-thumb" src={srcPath} />
                    <span className="remove-icon" onClick={removeImg}>x</span>
                  </div>
                }
              </p>
              <p className="text-xs text-neutral-500">
                PNG, JPG, GIF up to 2MB
              </p>
            </div>
          </div>
        </div>
        <div>
          <ButtonPrimary className="md:col-span-2 ml-2" type="button" onClick={handlePost}>
            Submit
          </ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default DashboardHome;

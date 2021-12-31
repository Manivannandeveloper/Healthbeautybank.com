import React,{useState,useEffect} from "react";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Select from "components/Select/Select";
import Textarea from "components/Textarea/Textarea";
import Label from "components/Label/Label";
import { useHistory } from "react-router-dom";
import {Editor} from "react-draft-wysiwyg";
import { EditorState,convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { API_URL } from "data/authors";

export interface DashboardSubmitArticleProps {
  EditorState?: EditorState;
}

const DashboardSubmitArticle = () => {

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [categogy, setCategogy] = useState('');
  const [categogyList, setCategogyList] = useState([]);
  const [ editorState, setEditorState ] = useState(EditorState.createEmpty());
  const [fileSelected, setFileSelected] = React.useState<File>() // also tried <string | Blob>
  let history = useHistory();

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
    if(title !== '' && content !== ''){
      const formData = new FormData();
      if (fileSelected) {
        formData.append("image", fileSelected);
      }
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category_id", categogy);
      fetch(API_URL+'thexbossapi/web/site/addpost', {
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

  const onEditorStateChange = (editorState:EditorState) => {
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
		setEditorState(editorState);
	}

  

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
      const fileList = e.target.files;

      if (!fileList) return;

      setFileSelected(fileList[0]);
  };


  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
        <label className="block md:col-span-2">
          <Label>Category</Label>
          <Select className="mt-1" onChange={(e) => {setCategogy(e.target.value)}}>
            <option value="-1">– select –</option>
            {categogyList.length > 0 && categogyList.map((item:{id:number,name:string}, index) => {
              return <option value={item.id}>{item.name}</option>
            })}
          </Select>
        </label>
        <label className="block md:col-span-2">
          <Label>Post Title *</Label>
          <Input type="text" className="mt-1"  onChange={(e) => {setTitle(e.target.value)}}/>
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
                    onChange={handleImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-neutral-500">
                PNG, JPG, GIF up to 2MB
              </p>
            </div>
          </div>
        </div>
        <label className="block md:col-span-2">
          <Label> Post Content</Label>
          <Textarea className="mt-1" rows={6} onChange={(e) => {setContent(e.target.value)}}  />
        </label>
        <label className="block md:col-span-2">
          <Label>Price *</Label>
          <Input type="text" className="mt-1"  onChange={(e) => {setPrice(e.target.value)}}/>
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
    </div>
  );
};

export default DashboardSubmitArticle;

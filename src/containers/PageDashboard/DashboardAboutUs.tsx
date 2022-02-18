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

export interface DashboardAboutUsProps {
  EditorState?: EditorState;
  ContentState?: ContentState;
  editVal?: EditorState;
  postId?: number;
}

const DashboardAboutUs = () => {
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
        fetch(API_URL+'thexbossapi/web/site/aboutus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: type
        }), 
        }).then((res) => res.json())
        .then((data) => {
            const textToConvert = data;
            const contentBlock = htmlToDraft(textToConvert);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            setEditorState(EditorState.createWithContent(contentState));
        })
        .catch(console.log);
    },[]);

    const uploadCallback = (file:Blob, callback:string) => {
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

    const config = {
        image: { uploadCallback: uploadCallback,
        previewImage: true,
        alt: { present: false, mandatory: false } },
    }

    const onEditorStateChange = (editorState:EditorState) => {
        setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        setEditorState(editorState);
    }

    const handlePost = () => {
        const formData = new FormData();
        formData.append("content", content);
        fetch(API_URL+'thexbossapi/web/site/updateaboutus', {
            method: 'POST',
            body: formData,
          }).then((res) => res.json())
          .then((data) => {
            if(data.status === 'success'){
              if(status == '1'){
                history.push("/article");
              }
              window.location.reload();
            }
          })
          .catch(console.log);
    }

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
       
        <label className="block md:col-span-2">
          <Label> Aount us content</Label>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
            toolbar={config}
          />
         </label>
        <div>
          <ButtonPrimary className="md:col-span-2 ml-2" type="button" onClick={handlePost}>
            Submit
          </ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default DashboardAboutUs;

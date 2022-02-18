import React,{ FC, ReactNode, useEffect, useState } from "react";
import { API_URL } from "data/authors";
import {Editor} from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, convertFromHTML, convertFromRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


const PageAboutContent = () => {
  const [content, setContent] = useState('');
  useEffect(() => {
    fetch(API_URL+'thexbossapi/web/site/aboutus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ }),
    }).then((res) => res.json())
    .then((data) => {
      setContent(data);
    })
    .catch(console.log);
  },[]);
  return (
    <div dangerouslySetInnerHTML={{ __html: content}}>
      
    </div>
  );
};

export default PageAboutContent;

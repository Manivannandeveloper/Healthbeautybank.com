import React, { FC, ReactNode, useEffect, useState } from "react";
import { API_URL } from "data/authors";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Select from "components/Select/Select";
import Textarea from "components/Textarea/Textarea";
import Label from "components/Label/Label";
import { useHistory, useLocation } from "react-router-dom";

const data1 = [
  { name: "", content: "", id: "" },
];

const DashboardSubCategory = () => {
  const [data, setData] = useState([]);
  const [addCategory, setAddCategory] = useState(false);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId ] = useState('');
  let history = useHistory();
  useEffect(() => {
    fetch(API_URL+'thexbossapi/web/site/subcategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ }),
      }).then((res) => res.json())
      .then((data) => {
        setData(data);
        setCategoryId('');
      })
      .catch(console.log);
  },[]);

  const deletePost = (id:number) => {
    fetch(API_URL+'thexbossapi/web/site/deletecategory', {
      method: 'POST',
      body: JSON.stringify({
        id: id,
    }),
    }).then((res) => res.json())
    .then((data) => {
      if(data.status === 'success'){
        setData(data.categoryList);
      }
    })
    .catch(console.log);
  }

  const editCategory = (id:number, name:string) => {
    setAddCategory(true);
    setTitle(name);
  }

  const handlePost = () => {
    if(title !== ''){
      fetch(API_URL+'thexbossapi/web/site/addcategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: title,
        }),
      }).then((res) => res.json())
      .then((data) => {
        if(data.status === 'success'){
          history.push("/dashboard/category");
          window.location.reload();
        }
      })
      .catch(console.log);
    }
  }

  return (
    <>
      {!addCategory &&<div className="bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 shadow overflow-hidden sm:rounded-lg">
        <div className="flex px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-neutral-900 dark:text-neutral-200">
            Category List
          </h3>
         
          <span className="text-primary-800 dark:text-primary-500 hover:text-primary-900 category-new" onClick={(e: React.MouseEvent<HTMLElement>) => {setAddCategory(true);}}>
              New Sub Category
            </span>
        </div>
        
        <div className="border-t border-neutral-200 dark:border-neutral-900">
          <dl>
            {data.length > 0 && data.map((item:{id:number,name:string,content:string}, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    index % 2 === 0
                      ? "bg-neutral-50 dark:bg-neutral-800"
                      : "bg-white dark:bg-neutral-900"
                  } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                >
                  <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-300 text-center">
                    {item?.name}
                  </dt>
                  <dd className="text-sm font-medium text-neutral-500 dark:text-neutral-300">
                    {item?.content}
                  </dd>
                  <dd>
                    {/* <span
                    onClick={(e: React.MouseEvent<HTMLElement>) =>  editCategory(item.id, item?.name)}
                    className="text-primary-800 dark:text-primary-500 hover:text-primary-900 cursor-pointer"
                  >
                    Edit
                  </span>
                  {` | `} */}
                  <span
                    onClick={(e: React.MouseEvent<HTMLElement>) =>  deletePost(item?.id)}
                    className="text-rose-600 hover:text-rose-900 cursor-pointer"
                  >
                    Delete
                  </span>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>}
      {addCategory &&
        <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
          <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
            <label className="block md:col-span-2">
              <Label>Category Title *</Label>
              <Input type="text" className="mt-1" value={title}  onChange={(e) => {setTitle(e.target.value)}}/>
            </label>
            <div>
              <ButtonPrimary className="md:col-span-2 ml-2" type="button" onClick={handlePost}>
                Submit
              </ButtonPrimary>
            </div>
          </form>
        </div>
      }
    </>
  );
};

export default DashboardSubCategory;

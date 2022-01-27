import React, { FC, ReactNode, useEffect, useState } from "react";
import { API_URL } from "data/authors";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Select from "components/Select/Select";
import Textarea from "components/Textarea/Textarea";
import Label from "components/Label/Label";
import { useHistory, useLocation } from "react-router-dom";

const data1: {id:number,name:string,type:string; categoryName:string, categoryId:string}[] = [];

const DashboardSubCategory = () => {
  const [data, setData] = useState(data1);
  const [addCategory, setAddCategory] = useState(false);
  const [categogy, setCategogy] = useState('');
  const [categogyList, setCategogyList] = useState([]);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId ] = useState(0);
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
        setCategoryId(0);
      })
      .catch(console.log);
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

  const editCategory = (id:number) => {
    setAddCategory(true);
    const res = data.filter(result=>{if((result?.id) == id){return result;}});
    if(res.length > 0){
      setCategoryId(id);
      setAddCategory(true);
      setTitle(res[0].name);
      setCategogy(res[0].categoryId);
    }
  }

  const handlePost = () => {
    if(title !== ''){
      let url = API_URL+'thexbossapi/web/site/addsubcategory';
      let jsonData = JSON.stringify({title: title,category_id: categogy});
      if(categoryId !== 0){
        url = API_URL+'thexbossapi/web/site/editsubcategory';
        jsonData = JSON.stringify({title: title, category_id: categogy, id: categoryId});
      }
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      }).then((res) => res.json())
      .then((data) => {
        if(data.status === 'success'){
          history.push("/dashboard/sub-category");
          window.location.reload();
          setCategoryId(0);
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
          SubCategory List
          </h3>
         
          <span className="text-primary-800 dark:text-primary-500 hover:text-primary-900 category-new" onClick={(e: React.MouseEvent<HTMLElement>) => {setAddCategory(true);}}>
              New SubCategory
            </span>
        </div>
        
        <div className="border-t border-neutral-200 dark:border-neutral-900">
          <dl>
            {data.length > 0 && data.map((item, index) => {
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
                    {item?.categoryName}
                  </dd>
                  <dd>
                    <span
                    onClick={(e: React.MouseEvent<HTMLElement>) =>  editCategory(item.id)}
                    className="text-primary-800 dark:text-primary-500 hover:text-primary-900 cursor-pointer"
                  >
                    Edit
                  </span>
                  {` | `}
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
            {data.length === 0 &&
              <div
              className={`bg-white dark:bg-neutral-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>No data found.</div>
            }
          </dl>
        </div>
      </div>}
      {addCategory &&
        <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
          <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
            <label className="block md:col-span-2">
              <Label>Category  *</Label>
              <Select className="mt-1" onChange={(e) => {setCategogy(e.target.value)}} value={categogy}>
                <option value="-1">– select –</option>
                {categogyList.length > 0 && categogyList.map((item:{id:number,name:string}, index) => {
                  return <option value={item.id} key={item.id}>{item.name}</option>
                })}
              </Select>
            </label>
            <label className="block md:col-span-2">
              <Label>Sub Category Title *</Label>
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

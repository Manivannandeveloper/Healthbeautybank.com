import React,{ FC, ReactNode, useEffect, useState } from "react";
import NcImage from "components/NcImage/NcImage";
import Pagination from "components/Pagination/Pagination";
import { API_URL } from "data/authors";
import DashboardSubmitPost from "./DashboardSubmitPost";
import { useHistory } from "react-router-dom";

const people = [
  {
    id: 1,
    title: "Tokyo Fashion Week Is Making Itself Great Again",
    image:
      "https://images.unsplash.com/photo-1617059063772-34532796cdb5?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
  {
    id: 2,
    title: "Traveling Tends to Magnify All Human Emotions",
    image:
      "https://images.unsplash.com/photo-1622987437805-5c6f7c2609d7?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
  {
    id: 3,
    title: "Interior Design: Hexagon is the New Circle in 2018",
    image:
      "https://images.unsplash.com/photo-1617201277988-f0efcc14e626?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
  {
    id: 4,
    title: "Heritage Museums & Gardens to Open with New Landscape",
    image:
      "https://images.unsplash.com/photo-1622960748096-1983e5f17824?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
  {
    id: 5,
    title:
      "Man agrees to complete $5,000 Hereford Inlet Lighthouse painting job",
    image:
      "https://images.unsplash.com/photo-1617202227468-7597afc7046d?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: false,
    payment: "Not Applicable",
  },
  {
    id: 6,
    title:
      "Denton Corker Marshall the mysterious black box is biennale pavilion",
    image:
      "https://images.unsplash.com/photo-1622978147823-33d5e241e976?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
];
export interface DashboardSubmitPostProps {
  postId?: number;
}
const DashboardPosts = () => {

  const [data, setData] = useState([]);
  const [addPost, setAddPost] = useState(false);
  const [postId, setPostId] = useState('');
  let history = useHistory();
  useEffect(() => {
    fetch(API_URL+'thexbossapi/web/site/articledash', {
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
  },[]);

  const editPost = (id:string) => {
    setAddPost(true);
    history.push("/dashboard/posts",{ id: id});
  }

  const deletePost = (id:number) => {
    fetch(API_URL+'thexbossapi/web/site/deletepost', {
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

  return (
    <>
      {!addPost && <div className="flex flex-col space-y-8">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          
          <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
          
            <div className="new-post" onClick={(e: React.MouseEvent<HTMLElement>) => {setAddPost(true); history.push("/dashboard/posts");}}><span className="text-primary-800 dark:text-primary-500 hover:text-primary-900">
              New Article
            </span></div>
            <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                <thead className="bg-neutral-50 dark:bg-neutral-800">
                  <tr className="text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                    <th scope="col" className="px-6 py-3">
                      Article Title
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
                  {data.length > 0 && data.map((item:{id:number,title:string,categoryName:string,featuredImage:string,status:string,uniqueId:string}) => (
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
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                        <span
                          className="text-primary-800 dark:text-primary-500 hover:text-primary-900 cursor-pointer"
                          onClick={(e: React.MouseEvent<HTMLElement>) =>  editPost(item.uniqueId)}
                        >
                          Edit
                        </span>
                        {` | `}
                        <span
                          onClick={(e: React.MouseEvent<HTMLElement>) =>  deletePost(item.id)}
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
      {addPost && <div>
        <DashboardSubmitPost />
      </div>}
    </>
  );
};

export default DashboardPosts;

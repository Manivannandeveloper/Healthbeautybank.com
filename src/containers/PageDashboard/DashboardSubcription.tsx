import React, { FC, ReactNode, useEffect, useState } from "react";
import { API_URL } from "data/authors";

const data1 = [
  { name: "", content: "", id: '' },
];

const DashboardSubcription = () => {
  const mydata: {id:number,name:string, content:string}[] = [];
  const [data, setData] = useState(mydata);
  useEffect(() => {
    fetch(API_URL+'thexbossapi/web/site/subscription', {
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

  const deletePost = (id:number) => {
    fetch(API_URL+'thexbossapi/web/site/deletesubscription', {
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
    <div className="bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-neutral-900 dark:text-neutral-200">
          Subscription User List
        </h3>
        {/* <p className="mt-1 max-w-2xl text-sm text-neutral-500 dark:text-neutral-400">
          You've subscribed to the following package
        </p> */}
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
                  {item?.content}
                </dd>
                <dd className="text-sm font-medium text-neutral-500 dark:text-neutral-300">
                  <span onClick={(e: React.MouseEvent<HTMLElement>) =>  deletePost(item.id)}
                  className="text-rose-600 hover:text-rose-900 cursor-pointer"> Delete </span>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
};

export default DashboardSubcription;

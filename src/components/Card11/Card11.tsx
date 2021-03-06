import React, { FC, useState } from "react";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardLikeAndCommentNew from "components/PostCardLikeAndComment/PostCardLikeAndCommentNew";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import PostFeaturedMedia from "components/PostFeaturedMedia/PostFeaturedMedia";
import { useHistory, useParams } from "react-router-dom";

export interface Card11Props {
  className?: string;
  post: PostDataType;
  ratio?: string;
  hiddenAuthor?: boolean;
}

const Card11: FC<Card11Props> = ({
  className = "h-full",
  post,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const { title, href, categories, date, id } = post;

  const [isHover, setIsHover] = useState(false);

  let history = useHistory();
  let { uid } = useParams<{ uid: string }>();

  

  return (
    <div
      className={`nc-Card11 relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="Card11"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <>
        <PostCardLikeAndCommentNew className="absolute postLike flex" postData={post} />
        {/* <PostCardSaveAction postData={post} /> */}
      </>
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}
      >
        <div>
          <PostFeaturedMedia post={post} isHover={isHover} />
        </div>
      </div>
      <Link to={href} className="absolute inset-0"></Link>
      <span className="absolute top-3 inset-x-3">
        {/* <CategoryBadgeList categories={categories} /> */}
      </span>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        {
          <span className="text-xs text-neutral-500">{date}</span>
        }
        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          <Link to={href} className="line-clamp-2" title={title}>
            {title}
          </Link>
        </h2>
        {/* <div className="flex items-end justify-between mt-auto">
          <PostCardLikeAndComment className="relative" postData={post} />
          <PostCardSaveAction className="relative" postData={post} />
        </div> */}
      </div>
    </div>
  );
};

export default Card11;

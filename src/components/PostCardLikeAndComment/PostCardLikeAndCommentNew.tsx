import React, { FC } from "react";
import PostCardCommentBtn from "components/PostCardCommentBtn/PostCardCommentBtn";
import PostCardLikeContainer from "containers/PostCardLikeContainer/PostCardLikeContainer";
import PostCardLikeContainerNew from "containers/PostCardLikeContainer/PostCardLikeContainerNew";
import { PostDataType } from "data/types";

export interface PostCardLikeAndCommentNewProps {
  className?: string;
  itemClass?: string;
  postData: Pick<PostDataType, "like" | "id" | "href" | "commentCount">;
  hiddenCommentOnMobile?: boolean;
  onClickLike?: (id: PostDataType["id"]) => void;
}

const PostCardLikeAndCommentNew: FC<PostCardLikeAndCommentNewProps> = ({
  className = "",
  itemClass = "p-3 h-8 w-2 center text-xs",
  hiddenCommentOnMobile = true,
  postData,
  onClickLike = () => {},
}) => {
  return (
    <div
      className={`nc-PostCardLikeAndComment flex items-center space-x-2 ${className}`}
      data-nc-id="PostCardLikeAndCommentNew"
    >
      <PostCardLikeContainerNew
        className={itemClass}
        like={postData.like}
        onClickLike={onClickLike}
        postId={postData.id}
      />
    </div>
  );
};

export default PostCardLikeAndCommentNew;

import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  selectRecentLikeds,
  selectRecentRemoveds,
  removeLikedByPostId,
  addNewLikedByPostId,
} from "app/postLikes/postLikes";

import { PostDataType } from "data/types";
import PostCardLikeAction, {
  PostCardLikeActionProps,
} from "components/PostCardLikeAction/PostCardLikeAction";
import { API_URL } from "data/authors";
import { useHistory, useLocation, useParams } from "react-router-dom";

export interface PostCardLikeContainerNewProps
  extends Omit<PostCardLikeActionProps, "isLiked" | "likeCount"> {
  like: PostDataType["like"];
}

const PostCardLikeContainerNew: FC<PostCardLikeContainerNewProps> = ({
  like,
  postId,
  onClickLike,
  ...args
}) => {
  const recentLikeds = useAppSelector(selectRecentLikeds);
  const recentRemoveds = useAppSelector(selectRecentRemoveds);
  const dispatch = useAppDispatch();
  const userData = window.localStorage.getItem('user-data');
  let history = useHistory();
  const isLiked = () => {
    if (recentLikeds.includes(postId)) {
      return true;
    }
    if (like.isLiked && !recentRemoveds.includes(postId)) {
      return true;
    }
    return false;
  };

  const getLikeCount = (): number => {
    // Recent Liked
    if (recentLikeds.includes(postId)) {
      return like.count + 1;
    }
    if (like.isLiked && recentRemoveds.includes(postId)) {
      return like.count - 1;
    }
    return like.count;
  };

  const handleClickLike = () => {
    if(!!userData){
      window.localStorage.removeItem('product-id');
    }else{
      history.push("/login");
      window.localStorage.setItem("product-id", postId.toString());
      window.location.reload();
    }
    if (isLiked()) {
      dispatch(removeLikedByPostId(postId));
    } else {
      dispatch(addNewLikedByPostId(postId));
    }
    onClickLike && onClickLike(postId);
    // call api
    let userId = '';
    if(!!userData){
      let user = JSON.parse(userData);
      userId = user.id;
      fetch(API_URL+'thexbossapi/web/site/addproductwishlist', {
          method: 'POST',
          body: JSON.stringify({
              user_id: userId,
              product_id: postId,
          }),
      }).then((res) => res.json())
      .then((result) => {
        //history.push("/wishlist");  
        //window.location.reload();
      })
      .catch(console.log);
    }
  };

  return (
    <PostCardLikeAction
      {...args}
      isLiked={isLiked()}
      likeCount={getLikeCount()}
      postId={postId}
      onClickLike={handleClickLike}
    />
  );
};

export default PostCardLikeContainerNew;

/**
   Component Post
*/

import React from 'react';
import PostSummary from './PostSummary'; 


export const Post = ({post}) => {
  
    return(
        <PostSummary post={post}/>
    );

};
export default Post;
/**
   "author": "thingone", "body": "Just kidding. It takes more than 10 minutes to learn technology.",
   "category": "redux", "commentCount": 0, "deleted": false, "id": "6ni6ok3ym7mf1p33lnez",
   "timestamp": 1468479767190, "title": "Learn Redux in 10 minutes!", "voteScore": -5}
*/


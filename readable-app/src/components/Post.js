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

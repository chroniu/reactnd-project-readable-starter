/**
   Shows a List of Posts
*/
import React from 'react';
import {List} from 'antd';
import PostSummary from './PostSummary';

const PostList = ({posts, voteAction}) =>{
    return(
        <List
          dataSource={posts}
          renderItem={post => <PostSummary post={post} voteAction={voteAction}/>}
        />

    );
};

export default PostList;

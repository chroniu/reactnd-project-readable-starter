import React from 'react';
import {List} from 'antd';
import {Link} from 'react-router-dom';
import {timeSince} from '../utils/helpers';
import IconText from './IconText';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';

/**
   @description An array with the actions that a post can have
*/
const PostActions = ({postID, voteScore, commentCount, voteAction,}) => [
    <IconText type="star" text={voteScore}/>,
    <IconText type="up" text="" onClick={() => voteAction(postID, "upVote")}/>,
    <IconText type="down" text="" onClick={() => voteAction(postID, "downVote")}/>,
    <IconText type="message" text={commentCount} />
];

/**
   @description Show a List of posts
   @param post: the post to show
   @param voteAction: a function to be called when an vote action is selected
   @param deletePost: a function to be called when the delete button is selected
   @param showBody: show the body of the post
*/

const PostSummary = ({post, voteAction, deletePost, showBody} = {showBody:false}) => (
    <List.Item
      key={post.id}
      extra={(<React.Fragment>
                <Link to={`/posts/${post.id}/edit`}>
                  <IconText type='edit' text='Edit' />
                </Link>
                <IconText type='delete' text='' onClick={() => deletePost(post.id)}/>
              </React.Fragment>)}
      actions={PostActions({postID: post.id, voteScore:post.voteScore,
                    commentCount: post.commentCount, voteAction:voteAction})}>
      <List.Item.Meta
        title={<Link to={`/${post.category}/${post.id}`}>{post.title}</Link>}
        description={`submited ${timeSince(post.timestamp)} by ${post.author}`}
      />
      {showBody && renderHTML(post.body)}


    </List.Item>
);
//<div dangerouslySetInnerHTML={{ __html: post.body }} />

PostSummary.propTypes = {
    post: PropTypes.object.isRequired,
    voteAction: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    showBody: PropTypes.bool,
};

export default PostSummary;

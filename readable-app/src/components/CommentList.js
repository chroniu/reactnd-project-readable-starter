import React from 'react';
import {List, Comment, Icon} from 'antd';
import {timeSince} from '../utils/helpers';
import IconText from './IconText';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';

/**
   @description An array with the actions that a comment can have
*/
const CommentActions = ({postID, commentID, voteScore, voteAction, deleteComment, handleEditing}) => [
    <IconText type="star" text={voteScore}/>,
    <IconText type="up" text="" onClick={() => voteAction(commentID, "upVote")}/>,
    <IconText type="down" text="" onClick={() => voteAction(commentID, "downVote")}/>,
    <IconText type='edit' text='' onClick={() => handleEditing(commentID)}/>,
    <IconText type='delete' text='' onClick={() => deleteComment(commentID)}/>
];

/**
   @description Show a List of Comments
   @param comments: an array of comments
   @param voteAction: a function to be called when an vote action is selected
   @param deleteComment: a function to be called when the delete button is selected
   @param handleEditing: a function to be called when the edit button is selected
*/
const CommentList  = ({comments, voteAction, deleteComment, handleEditing}) => (
    <List
      className="comment-list"
      header={`${comments.length} replies`}
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={comment => (
          <Comment
            author={comment.author}
            content={renderHTML(comment.body)}
            avatar={(<Icon type="message" />)}
            datetime={timeSince(comment.timestamp)}
            actions={CommentActions({postID: comment.parentId, commentID: comment.id,
                                     voteScore:comment.voteScore, voteAction:voteAction,
                                     deleteComment:deleteComment, handleEditing: handleEditing})}
          />
      )}
    />
);
   
CommentList.propTypes = {
    comments: PropTypes.array.isRequired,
    voteAction: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    handleEditing: PropTypes.func.isRequired,
};

export default CommentList;

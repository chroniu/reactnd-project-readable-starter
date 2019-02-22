/**
   Shows a List of Comments
*/
import React from 'react';
import {List, Comment, Icon} from 'antd';
import { Switch } from 'antd';
import { Select } from 'antd';
import {orderArrayBy} from '../utils/helpers';
import {timeSince} from '../utils/helpers';
import IconText from './IconText';
import {Link} from 'react-router-dom';
import CommentEditContainer from './CommentEditContainer';

const CommentActions = ({postID, commentID, voteScore, voteAction, deleteComment, editing}) => [
    <IconText type="star" text={voteScore}/>,
    <IconText type="up" text="" onClick={() => voteAction(commentID, "upVote")}/>,
    <IconText type="down" text="" onClick={() => voteAction(commentID, "downVote")}/>,
    <IconText type='edit' text='' onClick={() => editing(commentID)}/>,
    <IconText type='delete' text='' onClick={() => deleteComment(commentID)}/>
];

class CommentList extends React.Component{
   

    render(){
        const {comments, voteAction, deleteComment, editing} = this.props;
        
        return(
            <List
              className="comment-list"
              header={`${comments.length} replies`}
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={comment => (
                  <Comment
                    author={comment.author}
                    content={comment.body}
                    avatar={(<Icon type="message" />)}
                    datetime={timeSince(comment.timestamp)}
                    actions={CommentActions({postID: comment.parentId, commentID: comment.id,
                                             voteScore:comment.voteScore, voteAction:voteAction,
                                             deleteComment:deleteComment, editing: editing})}
                  />
              )}
            />
        );
    };
};

export default CommentList;

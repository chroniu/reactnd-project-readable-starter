import React from 'react';
import {List} from 'antd';
import {Link} from 'react-router-dom';
import {timeSince} from '../utils/helpers';
import IconText from './IconText';

const PostActions = ({postID, voteScore, commentCount, voteAction,}) => [
    <IconText type="star" text={voteScore}/>,
    <IconText type="up" text="" onClick={() => voteAction(postID, "upVote")}/>,
    <IconText type="down" text="" onClick={() => voteAction(postID, "downVote")}/>,
    <IconText type="message" text={commentCount} />
];

const PostSummary = ({post, voteAction, deletePost}) => (
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
      {post.body}
    </List.Item>
);



export default PostSummary;

import React from 'react';
import {List, Skeleton, Icon} from 'antd';
import {Link} from 'react-router-dom';
import Timestamp from 'react-timestamp';
import {timeSince} from '../utils/helpers';

// from https://ant.design/components/list/
const IconText = ({ type, text, onClick }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} onClick={onClick}/>
      {text}
    </span>
);

const PostActions = ({postID, voteScore, commentCount, voteAction,}) => [
    <IconText type="star" text={voteScore}/>,
    <IconText type="up" text="" onClick={() => voteAction(postID, "upVote")}/>,
    <IconText type="down" text="" onClick={() => voteAction(postID, "downVote")}/>,
    <IconText type="message" text="" />
];

const PostSummary = ({post, voteAction}) => (
    <List.Item
      key={post.id}
      extra={(<React.Fragment>
                <Link to='/'>
                  <IconText type='edit' text='Edit' />
                </Link>
                <IconText type='delete' text='Delete'/>
              </React.Fragment>)}
      actions={PostActions({postID: post.id, voteScore:post.voteScore,
                    commentCount: post.commentCount, voteAction:voteAction})}>
      <List.Item.Meta
        title={<Link to={`/${post.category}/${post.id}`}>{post.title}</Link>}
        description={`submited ${timeSince(post.timestamp)} ago by ${post.author}`}
      />
      {post.body}
    </List.Item>
);



export default PostSummary;

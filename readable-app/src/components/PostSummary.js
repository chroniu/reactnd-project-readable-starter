import React from 'react';
import {List, Skeleton, Icon} from 'antd';
import {Link} from 'react-router-dom';


// from https://ant.design/components/list/
const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
);

const PostActions = ({postID, voteScore, commentCount, voteAction,}) => {
    return (
        <ul className="ant-list-item-action"> 
          <li>
            <IconText type="star" text={voteScore}/>
          </li>
          <li onClick={() => voteAction(postID, "upVote")}>
            <IconText type="up" text=""/><
          /li>
          <li onClick={() => voteAction(postID, "downVote")}>
            <IconText type="down" text=""/>
          </li>
          <li>
            <IconText type="message" text={commentCount}/>
          </li>
        </ul>
    );
};
      
/**
   1) Título  x
   2) Autor    x
   3) Número de comentários  x
   4) Pontuação atual        x
   5) Mecanismo de voto para votar post com positivo ou negativo
*/
const PostSummary = ({post, voteAction}) =>(
    <List.Item
      key={post.id}>
      <Skeleton avatar title={false} loading={post.loading} active>
        <List.Item.Meta
          title={<Link to=''>{post.title}</Link>}
          description={post.body}
        />
        <PostActions voteScore={post.voteScore}
                     commentCount={post.commentCount}
                     voteAction={voteAction}
                     postID={post.id}/>
        by {post.author}
      </Skeleton>
    </List.Item>
);



export default PostSummary;

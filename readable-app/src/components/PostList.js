/**
   Shows a List of Posts
*/
import React from 'react';
import {List} from 'antd';
import PostSummary from './PostSummary';
import { Switch } from 'antd';
import { Select } from 'antd';
import {orderArrayBy} from '../utils/helpers';
import PropTypes from 'prop-types';

/**
   @description Shows a List of Posts with an ordenation option when the posts have more than 1 post.
   @param posts an array of posts
   @param voteAction: a function to be called when an vote action is selected
   @param deleteComment: a function to be called when the delete button is selected
*/
class PostList extends React.Component{
    state = {
        sortFunc: orderArrayBy('timestamp'),
        isReverse: false
    }
    
    changeOrderAttribute = (value) =>{
        this.setState({
            sortFunc: orderArrayBy(value)
        });
    }

    changeOrder = (value) => {
        this.setState({
            isReverse: value
        });
    }

    render(){
        const {posts, voteAction, deletePost} = this.props;
       
        const orderedPosts = posts.sort(this.state.sortFunc(this.state.isReverse));
        
        return(
            <List
              size="large"
              itemLayout="vertical"
              header={orderedPosts.length > 1 &&
                      (<React.Fragment>
                         Order By: 
                         <Select defaultValue="timestamp" style={{padding:'0.5em'}}
                                 onChange={this.changeOrderAttribute}>
                           <Select.Option value="timestamp">Creation Time</Select.Option>
                           <Select.Option value="voteScore">Votes</Select.Option>
                           <Select.Option value="commentCount">Comments</Select.Option>
                         </Select>
                         <Switch defaultChecked onChange={this.changeOrder}/>
                       </React.Fragment>)}
              dataSource={orderedPosts}
              renderItem={post => <PostSummary post={post} voteAction={voteAction}
                                               key={post.id} deletePost={deletePost}/>}
            />
            
        );
    }
};

PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    voteAction: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
};
export default PostList;

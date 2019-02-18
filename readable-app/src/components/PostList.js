/**
   Shows a List of Posts
*/
import React from 'react';
import {List} from 'antd';
import PostSummary from './PostSummary';
import { Switch } from 'antd';
import { Select } from 'antd';
import {orderArrayBy} from '../utils/helpers';


class PostList extends React.Component{
    state = {
        sortFunc: orderArrayBy('timestamp'),
        isReverse: false
    }
    
    changeOrderAttribute = (value) =>{
        console.log("attribute", value);
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
        const {posts, voteAction} = this.props;
        const orderedPosts = posts.sort(this.state.sortFunc(this.state.isReverse));
        console.log(this.state.isReverse, "ordered List", this.state.reverse,orderedPosts);
        
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
                                               key={post.id} deletePost={this.props.deletePost}/>}
            />
            
        );
    }
};

export default PostList;

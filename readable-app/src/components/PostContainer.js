import React from 'react';
import {connect} from 'react-redux';
import PostActions from '../redux/posts/actions';
import MessageActions from '../redux/messages/actions';
import Post from './Post';
import {Spin} from 'antd';
import MessageList from './MessageListContainer';

const mapStateToProps = (state, props) => {
    const postID = this.props.match.params.post_id;
    return{
        ...state.posts[postID],
        loading: state.messages[postID],
        ...props
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchPost: (postID) => dispatch(PostActions.fetchPost(postID)),
        fethMessages: (postID) => dispatch(MessageActions.fetchMessages(postID)),
    };
};


class PostContainer extends React.Component{

    componentDidMount(){
        const postID = this.props.match.params.post_id;
        const category = this.props.match.params.category;
        
        this.props.fetchMessages(postID);
    }

    render(){
        return(
            <Post key={this.props.postID} post={this.props.post}>
              {!this.props.loading &&
               <Spin /> }
              {this.props.loading &&
               <MessageList messages={this.props.messages} postID={this.props.postID}/>}
            </Post>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);

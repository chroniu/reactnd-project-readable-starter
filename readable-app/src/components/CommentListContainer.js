import React from 'react';
import {connect} from 'react-redux';
import PostActions from '../redux/posts/actions';
import {Spin} from 'antd';
import CommentList from './CommentList';
import MessageList from './MessageListContainer';
import MessageActions from '../redux/comments/actions';


const mapStateToProps = (state, props) =>{
    return {comments: Object.values(state.comments),
            loading: state.loading.comments.loading,
            ...props};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchComments: (postID) => dispatch(MessageActions.fetchComments(postID)),
        voteAction : (postID, option) => {dispatch(PostActions.votePost(postID, option));}
    };
};

class CommentListContainer extends React.Component{
    
    componentDidMount(){
        this.props.fetchComments(this.props.postID);
    }

    render(){
        console.log("props render commentlist", this.props);
        if (this.props.loading){
            return(<Spin />);
        }else{
            return(<CommentList comments={this.props.comments} voteAction={this.props.voteAction}/>);
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);


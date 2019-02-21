import React from 'react';
import {connect} from 'react-redux';
import CommentActions from '../redux/comments/actions';
import {Spin} from 'antd';
import CommentEdit from './CommentEdit';
import CategoryActions from '../redux/categories/actions';


const mapStateToProps = (state, props) =>{
    const {commentID, postID} = props.commentID;
    return {comment: state.comments[commentID],
            commentID,
            postID,
            loading: state.loading.comments,
            ...props}; 
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchComment : (commentID) => dispatch(CommentActions.fetchComment(commentID)),
        submitNewComment : (comment) => dispatch(CommentActions.postComment(comment)),
        updateComment: (comment) => dispatch(CommentActions.updateComment(comment)),
    };
};

/**
   @description Aplies a onClick event on it's children. 
   The event opens a Modal with a form to edit or create a new comment.
*/
class CommentEditContainer extends React.Component{
  
    componentDidMount(){
        if(this.props.commentID !== undefined && this.props.commentID !== 'new'){
            this.props.fetchComments(this.props.commentID);
        }
    }
    
    render(){
            return(<CommentEdit commentID={this.props.commentID}
                                postID={this.props.postID}
                                submitNewComment={this.props.submitNewComment}
                                updateComment={this.props.updateComment}/>);
    }
    
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditContainer);

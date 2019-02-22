import React from 'react';
import {connect} from 'react-redux';
import CommentActions from '../redux/comments/actions';
import CommentEdit from './CommentEdit';
import PropTypes from 'prop-types';

const mapStateToProps = (state, props) =>{
    const {commentID, postID} = props;
    
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
   @description Container for the CommentEditComponent
   @param postID: id of the post that the comment belongs
   @param commentID: if of an existent comment or 'new' for the creation of a new comment
Aplies a onClick event on it's children. 
   The event opens a Modal with a form to edit or create a new comment.
*/
class CommentEditContainer extends React.Component{
  
    componentDidMount(){
        if(this.props.commentID !== undefined && this.props.commentID !== 'new' && this.props.comment === undefined){
            this.props.fetchComments(this.props.commentID);
        }
    }
    
    render(){
            return(<CommentEdit commentID={this.props.commentID}
                                postID={this.props.postID}
                                comment={this.props.comment}
                                submitNewComment={this.props.submitNewComment}
                                updateComment={this.props.updateComment}
                                registerHandleSubmit={this.props.registerHandleSubmit}
                                hideSubmitBtn={this.props.hideSubmitBtn}/>);
    }
    
};

CommentEditContainer.propTypes = {
    commentID: PropTypes.string.isRequired,
    postID: PropTypes.string.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentEditContainer);

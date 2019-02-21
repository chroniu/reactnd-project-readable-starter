import React from 'react';
import {connect} from 'react-redux';
import CommentActions from '../redux/comments/actions';
import {Spin} from 'antd';
import CommentEdit from './CommentEdit';
import CategoryActions from '../redux/categories/actions';


const mapStateToProps = (state, props) =>{
    const commentID = props.commentID;
//    const postID = props.match.params.post_id;
    return {comment: state.comments[commentID],
            commentID,
//            postID,
            loading: state.loading.comments.loading,
            ...props}; 
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchComments : (postID) => dispatch(CommentActions.fetchComments(postID)),
        submitNewComment : (comment) => dispatch(CommentActions.commentComment(comment)),
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
//            this.props.fetchComments(this.props.postID);
        }
    }
    
    render(){
        console.log("commentEditorProps", this.props);
        const {visible} = this.props;
        
        if(this.props.commentID === undefined){
            return(<React.Fragment/>);
        }
        if(this.props.commentID !== 'new'){
            return(<CommentEdit commentID={this.props.comment.id}
                                comment={this.props.comment}
                                history={this.props.history}
                                updateComment={this.props.updateComment}/>);
            
        }{//new comment
            return(<CommentEdit commentID={'new'}
                                submitNewComment={this.props.submitNewComment}
                                history={this.props.history}
                                visible={visible}/>);
        }
    }
    
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditContainer);

import React from 'react';
import {connect} from 'react-redux';
import {Spin, Modal} from 'antd';
import CommentList from './CommentList';
import CommentActions from '../redux/comments/actions';
import CommentEditContainer from './CommentEditContainer';


const mapStateToProps = (state, props) =>{
    return {comments: Object.values(state.comments),
            loading: (state.loading.comments === undefined ? true: state.loading.comments),
            ...props};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchComments: (postID) => dispatch(CommentActions.fetchComments(postID)),
        voteAction : (commentID, option) => dispatch(CommentActions.voteComment(commentID, option)),
        deleteComment: (commentID) => dispatch(CommentActions.deleteComment(commentID)),
    };
};

/**
   @description Shows a list of comments, a form to submit new comments and a modal to edit existent comments.
*/
class CommentListContainer extends React.Component{
    state = {
        submiting: false,
        editing: false
    }
    
    componentDidMount(){
        this.props.fetchComments(this.props.postID);
    }

    
    handleEditing = (commentID) => {
        this.setState({
            editing: true,
            commentEditingID: commentID,
        });
    }

    onCancel = () => {
        this.setState({
            editing: false,
        });
    }

    onSubmit = () => {
        this.formSubmit();
        this.setState({
            editing: false,
        });
    }

    handleReplyTo = (commentID) => {
        this.setState({
            replyText: this.props.comments.filter(x => x.id === commentID)[0].body,
        });
    }

    registerHandleSubmit = (formSubmit) => {
        this.formSubmit = formSubmit;
    }
    
    render(){
        if (this.props.loading){
            return(<Spin />);
        }else{
            return(
                <React.Fragment>
                  <CommentList comments={this.props.comments.filter(comment => !comment.deleted)}
                               voteAction={this.props.voteAction}
                               deleteComment={this.props.deleteComment}
                               handleEditing={this.handleEditing}
                               handleReplyTo={this.handleReplyTo}
                  />

                  <CommentEditContainer postID={this.props.postID}
                                        commentID={'new'}
                                        replyText={this.state.replyText}
                                        hideSubmitBtn={false}/>
                  
                  <Modal
                    visible={this.state.editing}
                    title="Update Comment Form"
                    onCancel={this.onCancel}
                    onOk={this.onSubmit}>
                    <CommentEditContainer postID={this.props.postID}
                                          commentID={this.state.commentEditingID}
                                          replyText={this.state.replyText}
                                          registerHandleSubmit={this.registerHandleSubmit}
                                          hideSubmitBtn={true}/>
                  </Modal>
                </React.Fragment>);
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);


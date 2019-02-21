import React from 'react';
import {connect} from 'react-redux';
import PostActions from '../redux/posts/actions';
import {Spin} from 'antd';
import CommentList from './CommentList';
import CommentActions from '../redux/comments/actions';
import CommentEditContainer from './CommentEditContainer';

const mapStateToProps = (state, props) =>{
    console.log("mapStateToProps of CommentListContainer", props);
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

class CommentListContainer extends React.Component{
    state = {
        submiting: false,
        visible: false,
        editing: false
    }
    
    componentDidMount(){
        this.props.fetchComments(this.props.postID);
    }

    
    handleEditing = (commentID) => {
        console.log("handleEditting");
        this.setState({
            editing: true,
            commentEditing: (commentID !== 'new' ? this.props.comments[commentID] : 'new'),
        });
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
                               editing={this.handleEditing}
                  />
                  <CommentEditContainer visible={this.state.editing}
                                        comment={this.state.commentEditing}/>
                </React.Fragment>);
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);


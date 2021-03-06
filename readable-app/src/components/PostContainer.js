import React from 'react';
import {connect} from 'react-redux';
import PostActions from '../redux/posts/actions';
import {Spin, message} from 'antd';
import CommentsListContainer from './CommentListContainer';
import PostList from './PostList';
import NotFound from './NotFound';

const mapStateToProps = (state, props) => {
    const postID = props.match.params.post_id;
    return{
        post: state.posts[postID],
        postLoading: (state.loading.posts === undefined ? true: state.loading.posts),
        postError: (state.errors.posts),
        ...props
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchPost: (postID) => dispatch(PostActions.fetchPost(postID)),
        voteAction : (postID, option) => {dispatch(PostActions.votePost(postID, option));},
        deletePost: (postID) => dispatch(PostActions.deletePost(postID)),
    };
};


/**
   @description Renders a post with full details.
*/
class PostContainer extends React.Component{

    componentDidMount(){
        const postID = this.props.match.params.post_id;
        
        this.props.fetchPost(postID);
    }

    componentDidUpdate(){
        if (this.props.post && this.props.post.deleted && !this.props.postLoading){
            message.info('Post deleted');
            this.props.history.push('/');
        }
    }

    render(){
        if(this.props.postLoading){
            return (<Spin />);
        }else if(this.props.postError){
            return (<NotFound message='Post Not Found'/>);
        }else if(this.props.post.deleted){
            return (<Spin />);
        }else{
            const postID = this.props.post.id;

            return(
                <React.Fragment>
                  <PostList key={postID} posts={[this.props.post]}
                            voteAction={this.props.voteAction}
                            deletePost={this.props.deletePost}
                            showBody={true}/>
                  <CommentsListContainer postID={postID}/>
                </React.Fragment>
            );
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);


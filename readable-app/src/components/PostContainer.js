import React from 'react';
import {connect} from 'react-redux';
import PostActions from '../redux/posts/actions';
import Post from './Post';
import {Spin} from 'antd';
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


class PostContainer extends React.Component{

    componentDidMount(){
        const category = this.props.match.params.category;
        const postID = this.props.match.params.post_id;
        
        this.props.fetchPost(postID);
       
    }

    render(){
        console.log("render props", this.props);

        if(this.props.postLoading){
            console.log("Rendering spin");
            return (<Spin />);
        }else if(this.props.postError || this.props.post.deleted){
            return (<NotFound message='Post Not Found'/>);
        }else{
            const postID = this.props.post.id;

            return(
                <React.Fragment>
                  <PostList key={postID} posts={[this.props.post]}
                            voteAction={this.props.voteAction}
                            deletePost={this.props.deletePost}/>
                  <CommentsListContainer postID={postID}/>
                </React.Fragment>
            );
        }
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);

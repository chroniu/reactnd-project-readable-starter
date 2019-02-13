import React from 'react';
import {connect} from 'react-redux';
import PostActions from '../redux/posts/actions';
import {Spin} from 'antd';
import PostList from './PostList';


//https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6

const mapStateToProps = (state, props) =>{
    return {posts:Object.values(state.posts),
            loading: state.loading.posts.loading,
            ...props};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchPosts : (category) => dispatch(PostActions.fetchPosts(category)),
        voteAction : (postID, option) => {dispatch(PostActions.votePost(postID, option));}
    };
};

class PostListContainer extends React.Component{
    
    componentDidMount(){
        const category = this.props.match.params.category;
        this.props.fetchPosts(category);
    }

    /*
      Update only when category on url changes
     */
    componentDidUpdate(prevProps, prevState) {
        const prevCategory = prevProps.match.params.category;
        const category = this.props.match.params.category;
        
        if(prevCategory !== category){
            this.props.fetchPosts(category);
        }
    }
    
    render(){
        console.log("postList state", this.state);
        
        if (this.props.loading){
            return(<Spin />);
        }else{
            return(<PostList posts={this.props.posts} voteAction={this.props.voteAction}/>);
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);


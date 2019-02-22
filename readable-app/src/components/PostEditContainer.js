import React from 'react';
import {connect} from 'react-redux';
import PostActions from '../redux/posts/actions';
import {Spin} from 'antd';
import PostEdit from './PostEdit';
import CategoryActions from '../redux/categories/actions';
import PropTypes from 'prop-types';


const mapStateToProps = (state, props) =>{
    const postID = props.match.params.post_id;

    return {post: state.posts[postID],
            postID: postID,
            loading: state.loading.posts.loading,
            categories: (state.loading.categories.loading ? [] :
                         Object.values(state.categories)),
            ...props}; 
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchPost : (postID) => dispatch(PostActions.fetchPost(postID)),
        submitNewPost : (post) => dispatch(PostActions.postPost(post)),
        updatePost: (post) => dispatch(PostActions.updatePost(post)),
        fetchCategories: () => dispatch(CategoryActions.fetchCategories()),
    };
};

/**
   @description A container for the PostEdit Component
*/
class PostEditContainer extends React.Component{

    componentDidMount(){
        if(this.props.postID !== undefined && this.props.postID !== 'new'){
            this.props.fetchPost(this.props.postID);
        }

        if(this.props.categories === undefined){
            this.props.fetchCategories();
        }
    }
    
    render(){
        if(this.props.postID !== 'new'){
            if(this.props.post === undefined){
                return(<Spin />);
            }else{
                return(<PostEdit postID={this.props.post.id}
                                 post={this.props.post}
                                 history={this.props.history}
                                 categories={this.props.categories}
                                 updatePost={this.props.updatePost}/>);
            }
        }else{//new post
            return(<PostEdit postID={'new'}
                             submitNewPost={this.props.submitNewPost}
                             categories={this.props.categories}
                             history={this.props.history}/>);
        }
    }
    
};

PostEditContainer.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostEditContainer);

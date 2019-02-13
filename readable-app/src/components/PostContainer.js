import React from 'react';
import {connect} from 'react-redux';
import PostActions from '../redux/posts/actions';
import {Spin} from 'antd';
import Post from './Post';


const mapStateToProps = (state, props) => {
    return{

    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchPost: (postID) => dispatch(PostActions.fetchPost(postID)),
    };
};


class PostContainer extends React.Component{

    componentDidMount(){
        const postID = this.props.match.params.post_id;
        this.props.fetchPost(postID);
    }

    render(){
        return(
            <Post key={this.props.postID} {...this.props.post}/>
        );
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);

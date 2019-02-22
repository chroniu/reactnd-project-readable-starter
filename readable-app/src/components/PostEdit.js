/**
   Component for creating New Posts and Editing existent ones
*/

import React from 'react';
import {Form, Input, Button, Select, Col} from 'antd';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import richTextOptions from '../utils/quill-toolbar';
import 'react-quill/dist/quill.snow.css';


// based on https://ant.design/components/form/
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

/**
   @description Shows a form the create a new or edit an existent post.
   @param postID - the id of an existent post or 'new' to create a new post
   @param post - the post to edit. Only used when postID !== 'new'
   @param history - react-router-dom history object
   @param categories - an array with the existent categories that a post could have
   @param submitNewPost - action to submit a new post
   @param updatePost - action to update a post
          
*/
class PostEdit extends React.Component{
    state = {
        submiting: false
    }
    
    componentDidMount(){
        const postID = this.props.postID;

        if(postID !== 'new'){
            const {title, body, author, category} =  this.props.post;
            this.props.form.setFieldsValue({
                title: title,
                userName: author,
                content: body,
                category: category
            });
        }else{
            this.props.form.setFieldsValue({
                title: '',
                userName: '',
                content: '',
            });
        }
         //disable submit button at start
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({submiting: true});
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("values", values);
                const newPost = Object.assign({}, {...this.props.post,
                                                   title: values.title,
                                                   author: values.userName,
                                                   body: values.content,
                                                   category: values.category});

                if(this.props.postID !== 'new'){
                    this.props.updatePost(newPost);
                    this.props.history.push(`/${newPost.category}/${newPost.id}`);
                }else{
                    this.props.submitNewPost(newPost);
                    this.props.history.push('/');
                }

                this.setState({submiting: false});
            }
        });
    }


    render(){
        const {getFieldDecorator, getFieldsError,
               getFieldError, isFieldTouched,} = this.props.form;

        const {userNameError, titleError, contentError, categoryError} =
              ['userName', 'title', 'content'].map(field => isFieldTouched(field) && getFieldError(field));

        return( 
            <Form onSubmit={this.handleSubmit}>
              <Form.Item
                validateStatus={titleError ? 'error' : ''}
                help={titleError || ''}>
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input a Title!'}], })(
                    <Input addonBefore="Title" placeholder="title"/>
                )}
              </Form.Item>
              
              <Form.Item
                validateStatus={userNameError ? 'error' : ''}
                help={userNameError || ''}>
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }], })(
                    <Input addonBefore="Author" placeholder="userName"/>
                )}
              </Form.Item>

              <Form.Item
                validateStatus={categoryError ? 'error' : ''}
                help={categoryError || ''}>
                
                {getFieldDecorator('category', {
                    rules: [{ required: true, message: 'You must select a category for the post!' }], })(
                        <Select addonBefore="Category" placeholder="category">
                          {this.props.categories.map((category) =>
                                                     <Select.Option value={category.path} key={category.path}>
                                                       {category.name}
                                                     </Select.Option>)}
                        </Select>
                      
                )}
              </Form.Item>
              
              <Form.Item
                validateStatus={contentError ? 'error' : ''}
                help={contentError || ''}>
                {getFieldDecorator('content', {
                    rules: [{ required: true, message: 'The post must not be empty !' }], })(
                    <ReactQuill  modules={richTextOptions.modules}
                                 formats={richTextOptions.formats}
                                 theme={richTextOptions.theme}/>
                )}
              </Form.Item>
              
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                  loading={this.state.submiting}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
        );
    }
};
/**
   <Input.TextArea autosize={{ minRows: 10, maxRows: 40 }}
   placeholder="content"/>
*/
PostEdit.propTypes = {
    postID: PropTypes.string.isRequired,
    post: PropTypes.object,
    categories: PropTypes.array.isRequired,
    submitNewPost: PropTypes.func,
    updatePost:PropTypes.func,
};

export default  Form.create()(PostEdit);

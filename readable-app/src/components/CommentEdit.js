/**
   Component for creating New Comments and Editing existent ones
*/

import React from 'react';
import {Form, Input, Button, Select, Modal, TextArea} from 'antd';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6

// based on https://ant.design/components/form/
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

// based on https://ant.design/components/modal/
class CommentEdit extends React.Component{
    
    state = {
        submiting: false,
    }
    
    componentDidMount(){
        const commentID = this.props.commentID;

        if(commentID !== 'new'){
            const {title, body, author} =  this.props.comment;
            this.props.form.setFieldsValue({
                title: title,
                userName: author,
                content: body,
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
                console.log("commentEdit props", this.props);

                const newComment = Object.assign({}, {...this.props.comment,
                                                      author: values.userName,
                                                      body: values.content,
                                                      parentId:this.props.postID});
                if(this.props.commentID === 'new'){
                    this.props.submitNewComment(newComment);
                }else{
                    this.props.updateComment(newComment);
                }

                this.setState({submiting: false});
            }
        });
    }

    render(){

        const {submiting} = this.state;
        
        const {getFieldDecorator, getFieldsError,
               getFieldError, isFieldTouched,} = this.props.form;

        const {userNameError, contentError} =
              ['userName','content'].map(field => isFieldTouched(field) && getFieldError(field));

        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                  validateStatus={userNameError ? 'error' : ''}
                  help={userNameError || ''}>
                  {getFieldDecorator('userName', {
                      rules: [{ required: true, message: 'Please input your username!' }], })(
                      <Input addonBefore="Author" placeholder="userName"/>
                  )}
                </Form.Item>
                
                <Form.Item
                  validateStatus={contentError ? 'error' : ''}
                  help={contentError || ''}>
                  {getFieldDecorator('content', {
                      rules: [{ required: true, message: 'The comment must not be empty !' }], })(
                      <Input.TextArea autosize={{ minRows: 10, maxRows: 40 }}
                                      placeholder="content"/>
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
}

CommentEdit.propTypes = {
    commentID: PropTypes.string.isRequired,
    updateComment: PropTypes.func.isRequired,
    submitNewComment: PropTypes.func.isRequired
    
};
export default  Form.create()(CommentEdit);

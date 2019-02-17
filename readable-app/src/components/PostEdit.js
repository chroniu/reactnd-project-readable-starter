/**
   Component for creating New Posts and Editing existent ones
*/

import React from 'react';
import {Form, Input, Button, Select, TextArea} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6

// based on https://ant.design/components/form/
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class PostEdit extends React.Component{
    
    componentDidMount(){
        //disable submit button at start
        this.props.form.validateFields();
    }

    changeCategory = (value) => {
        
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }


    render(){
        //const {id, timestamp, title, body, author, category, voteScore} =  post;
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;

        const {userNameError, titleError, contentError} =
              ['userName', 'title', 'content'].map(field => isFieldTouched(field) && getFieldError(field));


        return(
            <Form onSubmit={this.handleSubmit}>

              <Form.Item
                validateStatus={titleError ? 'error' : ''}
                help={titleError || ''}>
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input a Title!' }], })(
                    <Input addonBefore="Title" placeholder="title" />
                )}
              </Form.Item>
              
              <Form.Item
                validateStatus={userNameError ? 'error' : ''}
                help={userNameError || ''}>
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }], })(
                    <Input addonBefore="Author" placeholder="userName" />
                )}
              </Form.Item>
        
              <Form.Item
                validateStatus={contentError ? 'error' : ''}
                help={contentError || ''}>
                {getFieldDecorator('content', {
                    rules: [{ required: true, message: 'The post must not be empty !' }], })(
                    <Input.TextArea autosize={{ minRows: 10, maxRows: 40 }} placeholder="content" />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
        );
    }
};

export default  Form.create()(PostEdit);

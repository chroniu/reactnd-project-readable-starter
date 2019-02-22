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

    initializeFormValues = () =>{
        const commentID = this.props.commentID;

        if(commentID !== 'new'){
            console.log("ppros", this.props);
            const {body, author} =  this.props.comment;
            this.props.form.setFieldsValue({
                userName: author,
                content: body,
            });
        }
        //disable submit button at start
        this.props.form.validateFields();
    }
        
    componentDidMount(){
        this.initializeFormValues();
    }
    
    /*
      Update only when category on url changes
     */
    componentDidUpdate(prevProps, prevState) {
        const prevCommentID = prevProps.commentID;
        const commentID = this.props.commentID;
        
        if(prevCommentID !== commentID)
            this.initializeFormValues();
    }
    
    handleSubmit = (e) => {
        if(e!== undefined)
            e.preventDefault();
        
        this.setState({submiting: true});
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const newComment = Object.assign({}, {...this.props.comment,
                                                      author: values.userName,
                                                      body: values.content,
                                                      parentId:this.props.postID});
                if(this.props.commentID === 'new'){
                    this.props.submitNewComment(newComment);
                }else{
                    this.props.updateComment(newComment);
                }
                this.props.form.resetFields();
                
                this.setState({submiting: false});
                if(this.props.submitCallBack !== undefined)
                    this.props.submitCallBack();
            }
        });
        
    }

    render(){
        
        if(this.props.hideSubmitBtn)
            this.props.registerHandleSubmit(this.handleSubmit);

        const {submiting} = this.state;
        
        const {getFieldDecorator, getFieldsError,
               getFieldError, isFieldTouched,} = this.props.form;

        const {userNameError, contentError} =
              ['userName','content'].map(field => isFieldTouched(field) && getFieldError(field));

        const message = (this.props.commentID === 'new' ? 'Post a new comment!' : 'Update your comment');
        
        return(
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label={message}/>

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
                {!this.props.hideSubmitBtn &&
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={hasErrors(getFieldsError())}
                    loading={this.state.submiting}>
                    Submit
                 </Button>
                }
              </Form.Item>

            </Form>
        );
    }
}

CommentEdit.propTypes = {
    commentID: PropTypes.string.isRequired,
    updateComment: PropTypes.func.isRequired,
    submitNewComment: PropTypes.func.isRequired,
    hideSubmitBtn: PropTypes.bool,

};
export default  Form.create()(CommentEdit);

/**
   Component for creating New Comments and Editing existent ones
*/

import React from 'react';
import {Form, Input, Button, Select, Modal, TextArea} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6

// based on https://ant.design/components/form/
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

// based on https://ant.design/components/modal/
const CommentEdit = Form.create({name: 'form_in_modal'})(
    // eslint-disable-next-line
    class extends React.Component{
        state = {
            submiting: false,
        }
        
        componentDidMount(){
            console.log("commentEdit props", this.props);
            const commentID = this.props.commentID;

          /*  if(commentID !== 'new'){
                const {title, body, author} =  this.props.comment;
                this.props.form.setFieldsValue({
                    title: title,
                    userName: author,
                    content: body,
                });
            }*/
            //disable submit button at start
            this.props.form.validateFields();
        }
        
        handleSubmit = (e) => {
            e.preventDefault();
            this.setState({submiting: true});
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log("values", values);
                    const newComment = Object.assign({}, {...this.props.comment,
                                                          author: values.userName,
                                                          body: values.content});

                    if(this.props.commentID !== 'new'){
                        this.props.updateComment(newComment);
                    }else{
                        this.props.submitNewComment(newComment);
                    }

                    this.setState({submiting: false,
                                   visible: false});
                }
            });
        }

        handleCancel = () => {
            this.setState({
                visible: false,
            });
        }


        render(){

            const {submiting} = this.state;
            const {visible} = this.props;
            
            const {getFieldDecorator, getFieldsError,
                   getFieldError, isFieldTouched,} = this.props.form;

            const {userNameError, contentError} =
                  ['userName','content'].map(field => isFieldTouched(field) && getFieldError(field));

            return(
                <Modal
                  visible={visible}
                  okText="Submit"
                  onOk = {this.handleSubmit}
                  confirmLoading={this.submiting}
                  onCancel={this.handleCancle}
                >
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
                    
                 
                  </Form>
                </Modal>
            );
        }
    }
);
/*

  <Form.Item>
  <Button
  type="primary"
  htmlType="submit"
  disabled={hasErrors(getFieldsError())}
  loading={this.state.submiting}
  >
  Submit
  </Button>
  </Form.Item>
*/
export default CommentEdit;

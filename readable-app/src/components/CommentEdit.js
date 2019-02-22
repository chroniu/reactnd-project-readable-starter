// based on https://ant.design/components/form/
import React from 'react';
import {Form, Input, Button,} from 'antd';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import richTextOptions from '../utils/quill-toolbar';
import 'react-quill/dist/quill.snow.css';


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

/**
   @description Component with a form for creating new comments and editing existent ones.
   @param commentID - the id of an existent comment or 'new' to create a new comment
   @param postID - the id of the post that the comment belongs
   @param updateComment - function to be called to update a comment
   @param submitNewComment - function to be called to create a new comment
   @param hideSubmitBtn - true to hide the default submit button from the form
   @param registerHandleSubmit - function that will be called when hideSubmitbtn is true. This functions is called with this.handleSubmit function as a param. The function must be called for the form to submit. Is used in the edition modal.
   @param replyText - string optional parameter. Initializes a new comment 
*/
class CommentEdit extends React.Component{
    
    state = {
        submiting: false,
    }

    initializeFormValues = () =>{
        const commentID = this.props.commentID;
        
        if(commentID !== 'new'){
            const {body, author} =  this.props.comment;
            this.props.form.setFieldsValue({
                userName: author,
                content: body,
            });
        }else{
            this.props.form.setFieldsValue({
                userName: '',
                content: (this.props.replyText !== undefined ?
                          `<blockquote>${this.props.replyText}</blockquote><br><br><br>`
                          : ''),
            });
            console.log("form props", this.props.form);
            this.inputAuthor.focus();
//            this.props.form..focus();
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
        else if(prevProps.replyText !== this.props.replyText)
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
                      <Input addonBefore="Author" placeholder="userName" ref={node => this.inputAuthor = node}/>
                  )}
                </Form.Item>
                
                <Form.Item
                  validateStatus={contentError ? 'error' : ''}
                  help={contentError || ''}>
                  {getFieldDecorator('content', {
                      rules: [{ required: true, message: 'The comment must not be empty !' }], })(
                      <ReactQuill  modules={richTextOptions.modules}
                                   formats={richTextOptions.formats}
                                   theme={richTextOptions.theme}/>
                  )}
                </Form.Item>

              <Form.Item>
                {!this.props.hideSubmitBtn &&
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={hasErrors(getFieldsError())}
                    loading={submiting}>
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
    postID: PropTypes.string.isRequired,
    updateComment: PropTypes.func.isRequired,
    submitNewComment: PropTypes.func.isRequired,
    hideSubmitBtn: PropTypes.bool,
    registerHandleSubmit: PropTypes.func,
    replyText: PropTypes.string,
};
export default  Form.create()(CommentEdit);

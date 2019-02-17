/**
   Shows a List of Comments
*/
import React from 'react';
import {List, Comment, Icon} from 'antd';
import { Switch } from 'antd';
import { Select } from 'antd';
import {orderArrayBy} from '../utils/helpers';
import {timeSince} from '../utils/helpers';

class CommentList extends React.Component{
   

    render(){
        const {comments} = this.props;
        
        return(
            <List
              className="comment-list"
              header={`${comments.length} replies`}
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={item => (
                  <Comment
                    author={item.author}
                    content={item.body}
                    avatar={(<Icon type="message" />)}
                    datetime={timeSince(item.timestamp)}
                  />
              )}
            />
        );
    };
};

export default CommentList;

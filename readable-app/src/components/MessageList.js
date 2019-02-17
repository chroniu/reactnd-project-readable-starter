/**
   Shows a List of Posts
*/
import React from 'react';
import {List} from 'antd';
import Message from './Message';
import { Switch } from 'antd';
import { Select } from 'antd';
import {orderArrayBy} from '../utils/helpers';


class MessageList extends React.Component{
   

    render(){
        
        return(
            <List
              dataSource={this.props.messages}
              renderItem={message => <Message message={message}
                                              voteAction={voteAction} key={message.id}/>}
            />
            
        );
    }
};

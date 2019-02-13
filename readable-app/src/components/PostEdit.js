/**
   Component for creating New Posts and Editing existent ones
*/

import React from 'react';
import RichTextEditor from 'react-rte';

class PostEdit extends React.Component{

    
    componentDidMount(){

    }

    render(){

        return(
            <div className="post-item">
              <RichTextEditor
                value={this.state.description}
                onChange
              />
            </div>
        );
    }
};

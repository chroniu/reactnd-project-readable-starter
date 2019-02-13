/**
   Component Post
*/

import React from 'react';
import RichTextEditor from 'react-rte';

export const Post = ({title, description}) => {
    console.log(description);
    console.log("x",RichTextEditor.createValueFromString("x"));
    return(
        <div className="post-item">
          <div className="post-item-meta">
            <h3 className="post-item-title">
              {title}
            </h3>
          </div>
          <div className="post-item-content">
         <RichTextEditor
           value={RichTextEditor.createValueFromString(description)}
           readOnly={true} />
          </div>
          <div className="post-item-actions">
          </div>
        </div>
    );

};
export default Post;
/**
   "author": "thingone", "body": "Just kidding. It takes more than 10 minutes to learn technology.",
   "category": "redux", "commentCount": 0, "deleted": false, "id": "6ni6ok3ym7mf1p33lnez",
   "timestamp": 1468479767190, "title": "Learn Redux in 10 minutes!", "voteScore": -5}
*/


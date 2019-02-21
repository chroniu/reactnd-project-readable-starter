// from https://ant.design/components/list/
import {Icon} from 'antd';
import React from 'react';

const IconText = ({ type, text, onClick }) => (
    <span>
      {onClick !== undefined ? 
       <Icon type={type} style={{ marginRight: 4, marginLeft:4}} onClick={onClick} />
       :<Icon type={type} style={{ marginRight: 4, marginLeft:4}}/>}
      {text}
    </span>
);

export default IconText;

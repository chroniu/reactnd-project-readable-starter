import {Icon} from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
/**
   @description - A component that shows an icon with a text.
   from https://ant.design/components/list/
   @param type: the type of the icon from https://ant.design/components/icon
   @param text: what text to show next to the icon
   @param onClick: callback function
*/
const IconText = ({ type, text, onClick }) => (
    <span>
      {onClick !== undefined ? 
       <Icon type={type} style={{ marginRight: 4, marginLeft:4}} onClick={onClick} />
       :<Icon type={type} style={{ marginRight: 4, marginLeft:4}}/>}
      {text}
    </span>
);


IconText.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,]),
    onClick: PropTypes.func,
};

export default IconText;

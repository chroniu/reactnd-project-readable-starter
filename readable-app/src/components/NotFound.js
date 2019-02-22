import React from 'react';
import {Icon} from 'antd';
import PropTypes from 'prop-types';

/**
   @description Shows a 404 error page with an optional message
   @param message - optional string message
*/
const NotFound = ({message} = {message:"We couldn't find this page"}) => (
    <div style={{textAlign: 'center'}}>
      <h1 style={{fontSize: '100px'}}>404</h1>
      <Icon type="info-circle"  style={{ fontSize: '100px', color: '#08c' }}/>
      <h3 style={{fontSize: '40px'}}>{message}</h3>
    </div>
);

NotFound.propTypes = {
    message: PropTypes.string,
};

export default NotFound;

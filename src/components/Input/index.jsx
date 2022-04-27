import React from 'react';
import PropTypes from 'prop-types';

function Input({ labelTitle, inputSize = '', children }) {
  return (
    <div className="input-container">
      <span className="input-title">{labelTitle}</span>
      <div className={`input-box ${inputSize}`}>{children}</div>
    </div>
  );
}

Input.propTypes = {
  labelTitle: PropTypes.string,
  inputSize: PropTypes.string,
  children: PropTypes.node,
};

export default Input;

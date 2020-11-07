import React from 'react';

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="d-flex justify-content-between">{label}
      {error && <small className="text-danger">{error}</small>}
      </label>
      <input
        {...rest}
        name={name}
        id={name}
        className="form-control" />
    </div>
  );
}

export default Input;
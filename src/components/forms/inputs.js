import React from 'react'

/**
 * simple text input component for using with bootstrap.
 */
export const SimpleInput = ({ value, onChange, className = '', ...props }) => <input
    type="text"
    className={`form-control ${className}`}
    value={value}
    onChange={onChange}
    {...props}
/>

/**
 * simple textarea component for using with bootstrap.
 */
export const SimpleTextarea = ({ value, onChange, className = '', rows = '3', ...props }) => <textarea
    rows={rows}
    className={`form-control ${className}`}
    value={value}
    onChange={onChange}
    {...props}
/>

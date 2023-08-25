import React from 'react';

function Alert(props) {
  const { type, message } = props;

  const alertClasses = {
    success: 'bg-green-400 text-green-900',
    warning: 'bg-yellow-100 text-yellow-900',
    error: 'bg-red-100 text-red-900',
  };

  return (
    <div className={`absolute top-0 left-0 right-0 z-50 px-4 py-3 rounded-md mb-4 ${alertClasses[type]}`}>
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default Alert;

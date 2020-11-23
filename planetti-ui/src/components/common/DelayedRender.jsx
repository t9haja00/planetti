import React from 'react';

export const DelayedRender = () => {
  return (
    <div className='text-center p-5'>
      <div className="spinner-border text-info" style={{ width: '5rem', height: '5rem' }} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default DelayedRender;
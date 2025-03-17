import React from 'react';
import { Puff } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-[400px]'>
      <Puff 
        height="80" 
        width="80" 
        radius={1}
        color="#00BFFF" 
        ariaLabel="puff-loading"
        visible={true}
      />
    </div>
  );
};

export default Loading;

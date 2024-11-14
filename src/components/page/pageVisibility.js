import React, { useState, useEffect } from 'react';

const PageVisibility = ({ getStatus, defaultStatus = null }) => {
  const [selectedVisible, setSelectedVisible] = useState(defaultStatus);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedVisible(value);
    getStatus(value); // Call the parent function with the new value
  };

  useEffect(() => {
    // Ensure that the component state is updated if defaultStatus changes.
    setSelectedVisible(defaultStatus);
  }, [defaultStatus]);

  return (
    <div className='bg-white rounded-md'>
      <select
        onChange={handleChange}
        className='w-full px-3 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm'
        value={selectedVisible}
      >
        <option value="1">Publish</option>
        <option value="2">Draft</option>
      </select>
    </div>
  );
};

export default PageVisibility;

// Buttons.js
import React from 'react';

const Buttons = () => {
  return (
    <div className="flex space-x-4 mb-4">
      <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
        ClearOfflineProxies
      </button>
      <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
        Refresh
      </button>
    </div>
  );
}; 

export default Buttons;

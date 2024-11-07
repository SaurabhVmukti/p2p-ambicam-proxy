// // Sidebar.js
// import React from "react";

// const Sidebar = () => {
//   return (
//     <div className="bg-gray-900 text-gray-300 w-64 p-4 space-y-4">
//       <div>
//         <h2 className="text-lg bg-gray-500">Overview</h2>
//       </div>
//       <div>
//         <h2 className="text-lg">Proxies</h2>
//         <ul className="ml-4 space-y-2">
//           <li className="text-sm">TCP</li>
//           <li className="text-sm">UDP</li>
//           <li className="text-sm">HTTP</li>
//           <li className="text-sm">HTTPS</li>
//           <li className="text-sm">STCP</li>
//           <li className="text-sm">SUDP</li>
//         </ul>
//       </div>
//       <div>
//         <h2 className="text-lg">Help</h2>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    // State to track if Proxies section is open or closed
    const [isProxiesOpen, setIsProxiesOpen] = useState(false);

    // Function to toggle the Proxies section open/closed
    const toggleProxies = () => {
        setIsProxiesOpen(!isProxiesOpen);
    };

    return (
        <div className="bg-gray-900 text-gray-300 md:w-64 flex flex-col">
            {/* Overview Section */}
            <div className="">
                <Link to="/" className=""><h2 className="text-lg px-4 py-4 hover:bg-gray-700">Overview</h2></Link>
            </div>

            {/* Proxies Section with toggle functionality */}
            <div className="p-4">
                <h2
                    className="text-lg cursor-pointer flex justify-between items-center"
                    onClick={toggleProxies}
                >
                    Proxies
                    {/* Icon or indicator to show whether it is expanded or collapsed */}
                    <span className="ml-2">
                        {isProxiesOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M14.707 10.707a1 1 0 01-1.414 0L10 7.414 6.707 10.707a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                    </span>
                </h2>

                {/* Conditionally render the proxy links based on the open/close state */}
                {isProxiesOpen && (
                    <ul className="ml-4 mt-2 space-y-2">
                        <Link to="/proxy/tcp" className=""><li className="text-sm px-4 py-4 hover:bg-gray-700">TCP</li></Link>
                        <Link to="/proxy/udp" className=""><li className="text-sm px-4 py-4 hover:bg-gray-700">UDP</li></Link>
                        <Link to="/proxy/http" className=""><li className="text-sm px-4 py-4 hover:bg-gray-700">HTTP</li></Link>
                        <Link to="/proxy/https" className=""><li className="text-sm px-4 py-4 hover:bg-gray-700">HTTPS</li></Link>
                        <Link to="/proxy/stcp" className=""><li className="text-sm px-4 py-4 hover:bg-gray-700">STCP</li></Link>
                        <Link to="/proxy/sudp" className=""><li className="text-sm px-4 py-4 hover:bg-gray-700">SUDP</li></Link>
                    </ul>
                )}
            </div>

            {/* Help Section */}
            <div className="">
                <h2 className="text-lg p-4 hover:bg-gray-700">Help</h2>
            </div>
        </div>
    );
};

export default Sidebar;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Table = ({ proxies }) => {
//     const [proxyData, setProxyData] = useState([]);
//     const [cleardOfflineProxy, setCleardOfflineProxy] = useState(false);
//     const [tableData, setTableData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

   

//     const fetchProxyData = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/proxy/type/${proxies}`, {
//                 method: "GET"
//             });

//             setProxyData(response.data.proxies);
//             setTableData(response.data.proxies);
//             setLoading(false);
//         } catch (error) {
//             console.error('There was a problem with the fetch operation:', error);
//             setError(error.message);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProxyData();
//     }, [proxies]);

//     if (localStorage.getItem('proxyOffline') === "true") {
//         const clearOfflineProxies = proxyData.filter(proxy => proxy.status === "offline");
//         setTableData(clearOfflineProxies);
//     } else {
//         setTableData(proxyData);
//     }

//     if (loading) return <p>Loading...</p>;

//     if (proxyData.length === 0) return <p>No data available.</p>;

//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div className="overflow-x-auto">
//             <table className="table-auto w-full text-left text-white">
//                 <thead className="bg-gray-700">
//                     <tr>
//                         <th className="px-4 py-2">Name</th>
//                         <th className="px-4 py-2">Port</th>
//                         <th className="px-4 py-2">Connections</th>
//                         <th className="px-4 py-2">Traffic In</th>
//                         <th className="px-4 py-2">Traffic Out</th>
//                         <th className="px-4 py-2">Client Version</th>
//                         <th className="px-4 py-2">Status</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {tableData.map((proxy, index) => (
//                         <tr key={index} className="bg-gray-800">
//                             <td className="px-4 py-2"><Link to={`/proxy/${proxies}/${proxy.name}`}> {proxy.name}</Link></td>
//                             <td className="px-4 py-2">{proxy.conf ? proxy.conf.remotePort : "-"}</td>
//                             <td className="px-4 py-2">{proxy.curConns}</td>
//                             <td className="px-4 py-2">{proxy.todayTrafficIn}</td>
//                             <td className="px-4 py-2">{proxy.todayTrafficOut}</td>
//                             <td className="px-4 py-2">{proxy.clientVersion}</td>
//                             <td className="px-4 py-2">
//                                 <span
//                                     className={`px-2 py-1 rounded ${proxy.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}
//                                 >
//                                     {proxy.status}
//                                 </span>
//                             </td>
//                         </tr>
//                     ))
//                     }
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Table;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Table = ({ proxies }) => {
    const [proxyData, setProxyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProxyData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/proxy/type/${proxies}`);
            setProxyData(response.data.proxies || []);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProxyData();
    }, [proxies]);

    const clearOfflineProxies = () => {
        const filteredData = proxyData.filter(proxy => proxy.status === "online");
        setProxyData(filteredData);
        localStorage.setItem('proxyOffline', "true"); // Update local storage state
    };

    // Handle loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (proxyData.length === 0) return <p>No data available.</p>;

    return (
        <div>
            <div className="flex space-x-4 mb-4">
                <button 
                    className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={clearOfflineProxies}
                >
                    ClearOfflineProxies
                </button>
                <button 
                    className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={fetchProxyData} // Refresh button
                >
                    Refresh
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left text-white">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Port</th>
                            <th className="px-4 py-2">Connections</th>
                            <th className="px-4 py-2">Traffic In</th>
                            <th className="px-4 py-2">Traffic Out</th>
                            <th className="px-4 py-2">Client Version</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proxyData.map((proxy, index) => (
                            <tr key={index} className="bg-gray-800">
                                <td className="px-4 py-2">
                                    <Link to={`/proxy/${proxies}/${proxy.name}`}>{proxy.name}</Link>
                                </td>
                                <td className="px-4 py-2">{proxy.conf ? proxy.conf.remotePort : "-"}</td>
                                <td className="px-4 py-2">{proxy.curConns}</td>
                                <td className="px-4 py-2">{proxy.todayTrafficIn}</td>
                                <td className="px-4 py-2">{proxy.todayTrafficOut}</td>
                                <td className="px-4 py-2">{proxy.clientVersion}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded ${proxy.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}
                                    >
                                        {proxy.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;

import React, { useEffect, useState } from "react";

const MainContent = () => {

    // Server Info
    const [serverInfo, setServerInfo] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/server-info`, {
                    method: "GET"
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setServerInfo(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Call the async function inside useEffect
    }, []);

    // Traffic - Graph Data
    const totalTrafficIn = serverInfo.totalTrafficIn || 0;
    const totalTrafficOut = serverInfo.totalTrafficOut || 0;
    const total = totalTrafficIn + totalTrafficOut;

    // Proxy - Graph Data
    const proxyHTTP = (serverInfo.proxyTypeCount && serverInfo.proxyTypeCount.http) || 0;
    const proxyTCP = (serverInfo.proxyTypeCount && serverInfo.proxyTypeCount.tcp) || 0;
    const proxyTotal = proxyHTTP + proxyTCP;

    return (
        <div className="flex-1 bg-gray-900 p-6 sm:p-8 text-white">

            {/* System Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-6">System Information</h2>
                    <ul className="space-y-4">
                        <li className="flex justify-between">
                            <span className="font-medium">Version:</span>
                            <span>{serverInfo.version}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">BindPort:</span>
                            <span>{serverInfo.bindPort}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">KCP Bind Port:</span>
                            <span>{serverInfo.kcpBindPort}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">Http Port:</span>
                            <span>{serverInfo.vhostHTTPPort}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">Https Port:</span>
                            <span>{serverInfo.vhostHTTPSPort}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">TCPMux HTTPConnect Port:</span>
                            <span>{serverInfo.tcpmuxHTTPConnectPort}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">Subdomain Host:</span>
                            <span>{serverInfo.subdomainHost}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">Max PoolCount:</span>
                            <span>{serverInfo.maxPoolCount}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">Max Ports Per Client:</span>
                            <span>{serverInfo.maxPortsPerClient}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">Allow Ports:</span>
                            <span></span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">HeartBeat Timeout:</span>
                            <span>{serverInfo.heartbeatTimeout}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">Client Counts:</span>
                            <span>{serverInfo.clientCounts}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">Current Connections:</span>
                            <span>{serverInfo.curConns}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">Proxy Counts:</span>
                            <span>{serverInfo.proxyTypeCount ? serverInfo.proxyTypeCount.http + serverInfo.proxyTypeCount.tcp : "undefined"}</span>
                        </li>
                    </ul>
                </div>


                {/* Charts */}
                <div className="flex flex-col space-y-6">

                    {/* Dynamic Chart for Traffic In and Out */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Network Traffic</h2>
                        <div className="flex items-center justify-center">
                            <div className="relative flex items-center justify-center w-32 h-32 md:w-48 md:h-48">
                                {/* Circle for Traffic In */}
                                <div
                                    className="absolute w-full h-full rounded-full"
                                    style={{
                                        background: `conic-gradient(
                                            rgba(75, 192, 192, 0.6) ${((totalTrafficIn / (total)) * 100).toFixed(2)}%, 
                                            rgba(255, 99, 132, 0.6) ${((totalTrafficIn / (total)) * 100).toFixed(2)}%,
                                            rgba(255, 99, 132, 0.6) 100%
                                        )`,
                                    }}
                                />
                                {/* Print inside the circle */}
                                <div className="absolute text-white text-md font-normal text-center">
                                    Traffic In: <span className="font-medium">{totalTrafficIn}</span><br />
                                    Traffic Out: <span className="font-medium">{totalTrafficOut}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Chart for the Proxys */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Proxies</h2>
                        <div className="flex items-center justify-center">
                            <div className="relative flex items-center justify-center w-32 h-32 md:w-48 md:h-48">
                                {/* Circle for proxyes */}
                                <div
                                    className="absolute w-full h-full rounded-full"
                                    style={{
                                        background: `conic-gradient(
                                            rgba(75, 192, 192, 0.6) ${((proxyHTTP / (proxyTotal)) * 100).toFixed(2)}%, 
                                            rgba(255, 99, 132, 0.6) ${((proxyTCP / (proxyTotal)) * 100).toFixed(2)}%,
                                            rgba(255, 99, 132, 0.6) 100%
                                        )`,
                                    }}
                                />
                                {/* Print inside the circle */}
                                <div className="absolute text-white text-md font-normal text-center">
                                    Proxy HTTP : <span className="font-medium">{proxyHTTP}</span><br />
                                    Proxy TCP: <span className="font-medium">{proxyTCP}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;
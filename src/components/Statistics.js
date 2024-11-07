import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useParams } from 'react-router-dom';

// Register ChartJS components for Bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistics = () => {
    const params = useParams();
    const [data, setData] = useState({ proxyInfo: {}, trafficData: [] });
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);

    const generateLabels = (numOfLabels) => {
        const labels = [];
        const currentDate = new Date();

        for (let i = 0; i < numOfLabels; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() - i);
            labels.push(`${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`); // MM-DD format
        }

        return labels.reverse();
    };

    const fetchData = async () => {
        try {
            const [proxyResponse, trafficResponse] = await Promise.all([
                fetch(`http://localhost:5000/api/proxy/${params.proxytype}/${params.proxyname}`),
                fetch(`http://localhost:5000/api/traffic/${params.proxyname}`)
            ]);

            if (!proxyResponse.ok) {
                throw new Error(`Error fetching proxy data: ${proxyResponse.statusText}`);
            }

            if (!trafficResponse.ok) {
                throw new Error(`Error fetching traffic data: ${trafficResponse.statusText}`);
            }

            const proxyInfo = await proxyResponse.json();
            const trafficData = await trafficResponse.json();
            setData({ proxyInfo, trafficData });

        } catch (err) {
            setError(err.message);
            console.error("Error fetching data:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data.trafficData?.trafficOut?.length) {
            const labels = generateLabels(data.trafficData.trafficOut.length);
            const chartData = {
                labels,
                datasets: [
                    {
                        label: 'Traffic Out',
                        data: data.trafficData.trafficOut,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Traffic In',
                        data: data.trafficData.trafficIn,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }
                ]
            };
            setChartData(chartData);
        }
    }, [data.trafficData]);

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Traffic Statistics' },
        },
        scales: {
            y: { beginAtZero: true },
        }
    };

    return (
        <div className="h-screen w-full flex flex-col bg-gray-900 text-white p-6 md:p-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Traffic Statistics</h2>

            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
                    <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg">
                        <p className='mb-1'><strong>Name: </strong> {data.proxyInfo.name}</p>
                        <p className='mb-2'><strong>Addr: </strong> {data.proxyInfo.conf && data.proxyInfo.conf.remotePort}</p>
                        <p className='mb-2'><strong>Compression: </strong> undefined</p>
                        <p className='mb-2'><strong>Last Close: </strong> {data.proxyInfo.lastCloseTime}</p>
                    </div>
                    <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg">
                        <p className='mb-2'><strong>Type: </strong> {params.proxytype}</p>
                        <p className='mb-2'><strong>Encryption: </strong> undefined</p>
                        <p className='mb-2'><strong>Last Start: </strong> {data.proxyInfo.lastStartTime}</p>
                    </div>
                </div>
            )}

            {chartData ? (
                <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg h-96 w-fill">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            ) : (
                !error && <p>Loading chart data...</p>
            )}
        </div>
    );
};

export default Statistics;
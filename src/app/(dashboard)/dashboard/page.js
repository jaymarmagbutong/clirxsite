'use client'
import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Registering the necessary components of Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    // Sample data
    const data = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August"],
        datasets: [
            {
                label: "Revenue",
                data: [4000, 3000, 5000, 4500, 6000, 7000, 6500, 8000],
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                pointBorderColor: "#4CAF50",
                pointBackgroundColor: "#fff",
                fill: true,
                tension: 0.4, // Makes the line smooth
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Month",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Revenue ($)",
                },
                min: 0, // Starting point for Y-axis
                ticks: {
                    stepSize: 1000, // Adjust the step size of the ticks
                },
            },
        },
    };

    const stats = [
        { title: "Sales", value: "$5023", color: "text-red-500" },
        { title: "Earn money", value: "$6326", color: "text-blue-500" },
        { title: "Order", value: "$4249", color: "text-green-500" },
    ];

    const bestSellers = [
        { name: "Liam Wan", amount: "$2100", profile: "#" },
        { name: "Rika Wisra", amount: "$1512", profile: "#" },
        { name: "Demi Swing", amount: "$1300", profile: "#" },
        { name: "Alexander Martin", amount: "$912", profile: "#" },
    ];

    const products = [
        { name: "iPhone 6 Black", price: "$999", sold: 123, stock: 21 },
        { name: "Samsung Galaxy S8", price: "$825", sold: 107, stock: 428 },
        { name: "iPad Pro", price: "$699", sold: 107, stock: 428 },
    ];

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Header */}
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Stats Cards
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="p-6 bg-white rounded-lg shadow-md flex flex-col justify-center items-center"
                    >
                        <h2 className={`text-4xl font-bold ${stat.color}`}>{stat.value}</h2>
                        <p className="text-gray-600 text-lg">{stat.title}</p>
                    </div>
                ))}
            </div> */}

            {/* Best Sellers & Top Products */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"> */}
                {/* Best Sellers */}
                {/* <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Best Seller</h2>
                    {bestSellers.map((seller, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center mb-3 border-b pb-3"
                        >
                            <div>
                                <span className="font-semibold">{seller.name}</span>
                                <p className="text-sm text-gray-500">Earn: {seller.amount}</p>
                            </div>
                            <a
                                href={seller.profile}
                                className="text-blue-500 hover:underline"
                            >
                                View Profile
                            </a>
                        </div>
                    ))}
                </div> */}

                {/* Top Products */}
                {/* <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Top Product</h2>
                    <div className="overflow-auto">
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="text-gray-500 text-sm">
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Sold</th>
                                    <th>Stock</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index} className="bg-gray-50">
                                        <td className="py-3 px-2">{product.name}</td>
                                        <td className="py-3 px-2">{product.price}</td>
                                        <td className="py-3 px-2">{product.sold}</td>
                                        <td className="py-3 px-2">{product.stock}</td>
                                        <td className="py-3 px-2">
                                            <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> */}

            {/* Revenue Chart */}
            {/* <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Revenue</h2>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                            Week
                        </button>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Month
                        </button>
                        <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                            Year
                        </button>
                    </div>
                </div>
                <div style={{ width: "100%", height: 300 }}>
                    <Line data={data} options={options} />
                </div>
            </div> */}
        </div>
    );
};

export default Dashboard;

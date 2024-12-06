"use client"
import React, { useState, useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css'; 
import Skeleton from 'react-loading-skeleton';

const CategoryOption = ({ getValue = null, defaultCatValue=null, disabled=null }) => {
    const [categoryLists, setCategoryLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(defaultCatValue);


    useEffect(() => {
        const getAllCategory = async () => {
            try {
                const response = await fetch('/api/category/get', {
                    headers: { 'Cache-Control': 'no-store' },
                    next: { revalidate: 0 }
                });
                const data = await response.json();
                setCategoryLists(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getAllCategory();
    }, []);

    // Update selected category when defaultValue changes (useful when data loads asynchronously)
    useEffect(() => {
        setSelectedCategory(defaultCatValue);
    }, [defaultCatValue]);

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);
        if (getValue) getValue(value);
    };

    return (
        <div className='bg-white rounded-md'>
            {loading ? (
                <Skeleton count={5} />
            ) : (
                <select
                    disabled = {(disabled) ? true : false}
                    value={selectedCategory} // Set the selected value
                    onChange={handleChange}
                    className='w-full px-3 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm'
                >
                    <option value="">Select Category</option>
                    {categoryLists.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default CategoryOption;

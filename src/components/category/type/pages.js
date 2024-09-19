"use client"
import React, { useEffect, useState } from 'react';
import CategoryItem from './CategoryItem';
import 'react-loading-skeleton/dist/skeleton.css'; 
import Skeleton from 'react-loading-skeleton'


const CategoryPerPage = () => {
    const [catergoryListWithPage, setCategoryListWithPage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAllCategoryWithPages = async () => {
            try {
                const response = await fetch('/api/category/pages', { next: { revalidate: 3600 } });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategoryListWithPage(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        getAllCategoryWithPages();
    }, []);

    if (loading) {
        return <div><Skeleton count={10}/></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className='grid grid-cols-3'>
                <label className='font-bold mb-6'>Name</label>
            </div>
            <ul>
                {catergoryListWithPage.map((categoryreis) => (
                    <CategoryItem key={categoryreis.id} category={categoryreis} />
                ))}
            </ul> 
        </div>
    );
}

export default CategoryPerPage;

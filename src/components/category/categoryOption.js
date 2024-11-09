"use client"
import React, {useState, useEffect} from 'react'
import 'react-loading-skeleton/dist/skeleton.css'; 
import Skeleton from 'react-loading-skeleton'


const CategoryOption = ({isCategory = null , params = null,  getValue= null}) => {

    const [categoryLists, setCategoryLists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {   

        const getAllCategory = async () => {
            try {
                const response = await fetch('/api/category/get', {
                    headers: { 'Cache-Control': 'no-store' },
                    next: { revalidate: 0 }
                });
                const data = await response.json()

                setCategoryLists(data);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        };

        getAllCategory();

    }, [ isCategory ]);


    const handleChange = (e) => {
        getValue(e.target.value);
    }


    if (loading) {
        return <div><Skeleton count={10}/></div>;
    }



    if(params == 'options'){
        return (
            <div className='bg-white  rounded-md'>
                <select onChange={handleChange} className='w-full px-3 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm'>
                <option  value="" >Select Category</option>
                {
                    
                    categoryLists.map((item, index) => (
                        <option  key={item.id} value={item.id} > {item.name}</option>
                    ))
                }
                </select>
            </div>
          )
    }

  
}

export default CategoryOption
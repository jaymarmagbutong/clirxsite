import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Importing toast from react-hot-toast
import { MdEditNote, MdDelete } from "react-icons/md";


function CategoryPageItem({ categories }) {
    const [categoryLists, setCategoryList] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState('');

    useEffect(() => {
        setCategoryList(categories);
    }, [categories]);

    const handleEdit = (index, currentText) => {
        setEditingIndex(index);
        setEditingText(currentText);
    };

    const handleSave = async (index, id) => {
        try {
            await fetch(`/api/category/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, categoryName: editingText })
            });

            // Update the local category list after saving
            const updatedList = [...categoryLists];
            updatedList[index].name = editingText;
            setCategoryList(updatedList);
            setEditingIndex(null);
            setEditingText('');

            toast.success('Category updated successfully!');
        } catch (error) {
            console.error("Error updating category:", error);
            toast.error('Failed to update category!');
        }
    };

    const handleCancel = () => {
        setEditingIndex(null);
        setEditingText('');
    };

    const handleDelete = async (id, index) => {
        // Show a confirmation before proceeding with deletion
        const confirmation = window.confirm('Are you sure you want to delete this category?');
        if (!confirmation) return;

        try {
            await fetch(`/api/category/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            // Remove the category from the local state
            const updatedList = categoryLists.filter((item, i) => i !== index);
            setCategoryList(updatedList);

            toast.success('Category deleted successfully!');
        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error('Failed to delete category!');
        }
    };

    return (
        <div>
            <ul>
                {categoryLists.map((item, index) => (
                    <li key={item.id} className="list-none border-t-[1px] py-2 text-sm flex items-center justify-between">
                        {editingIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    className="border rounded px-2 py-1 mr-2"
                                />
                                <div>
                                    <button
                                        onClick={() => handleSave(index, item.id)}
                                        className="text-green-600 mr-2"
                                    >
                                        Save
                                    </button>
                                    <button onClick={handleCancel} className="text-red-600">
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <span>{item.name}</span>

                                <div className='flex items-center'>
                                    <button
                                        onClick={() => handleEdit(index, item.name)}
                                        className="text-blue-600 ml-2"
                                    >
                                       <MdEditNote className="text-blue-500" size={25} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id, index)}
                                        className="text-red-600 ml-2"
                                    >
                                        <MdDelete className="text-red-500" size={20} />
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {/* Add Toaster component to display toasts */}
            <Toaster />
        </div>
    );
}


export default CategoryPageItem;

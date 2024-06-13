import React from 'react';
import { FaTrash } from 'react-icons/fa'
const WorkCard = ({ work, onDelete }) => {

    console.log(work)
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={work.ImageURL} alt={work.Title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{work.Title}</h3>
                <p className="text-gray-600 mb-4">{work.Description}</p>
                <div className="flex justify-start">
                    <button 
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        onClick={() => onDelete(work.WorkID)}
                    >
                        <FaTrash size={15} color="white" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WorkCard;

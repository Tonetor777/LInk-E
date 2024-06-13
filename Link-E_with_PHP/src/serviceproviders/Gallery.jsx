import React, { useState, useEffect } from 'react';
import WorkCard from './WorkCard';
import AddWorkModal from './AddWorkModal';
import Navbar from './Navbar';
const Gallery = () => {
    const [works, setWorks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(works)
    useEffect(() => {
        fetch('http://localhost:8000/gallery.php')
            .then(response => response.json())
            .then(data => setWorks(data));
    }, []);

    const handleAdd = (newWork) => {
        setWorks([...works, newWork]);
    };

    const handleDelete = (workID) => {
        fetch('http://localhost:8000/gallery.php', {
            method: 'DELETE',
            body: JSON.stringify({ WorkID: workID }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Work deleted successfully") {
                setWorks(works.filter(work => work.WorkID !== workID));
            }
        });
    };

    return (
        <>
        <Navbar />
        <div className="p-4 pt-[100px]">
            <h2 className='font-bold text-4xl font-mono mb-4'>Gallery</h2>
            <button 
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 mb-[80px]"
                onClick={() => setIsModalOpen(true)}
            >
                Add Work
            </button>
            <div className="grid grid-cols-3 gap-4 px-[100px]">
        {works.length === 0 ? (
          <p className="text-center text-gray-500">No work added yet.</p>
        ) : (
          works.map(work => (
            <WorkCard
              key={work.WorkID}
              work={work}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
            {isModalOpen && 
                <AddWorkModal 
                    onClose={() => setIsModalOpen(false)} 
                    onAdd={handleAdd} 
                />
            }
        </div>
        </>
    );
}

export default Gallery;

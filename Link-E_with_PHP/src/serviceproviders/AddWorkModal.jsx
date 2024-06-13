import React, { useState } from 'react';

const AddWorkModal = ({ onClose, onAdd }) => {
    const [providerID, setProviderID] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('ProviderID', providerID);
        formData.append('Title', title);
        formData.append('Description', description);
        formData.append('ImageFile', imageFile);

        fetch('http://localhost:8000/gallery.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "New work created successfully") {
                const newWork = {
                    ProviderID: providerID,
                    Title: title,
                    Description: description,
                    ImageURL: data.imageURL
                };
                onAdd(newWork);
                onClose();
            }
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-[500px]">
                <h2 className="text-xl font-semibold mb-4">Add New Work</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input 
                        type="text" 
                        className="w-full border border-gray-300 p-2 rounded-md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea 
                        className="w-full border border-gray-300 p-2 rounded-md"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Image</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        className="w-full border border-gray-300 p-2 rounded-md"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="flex justify-end">
                    <button 
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        onClick={handleSubmit}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddWorkModal;

import { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import Navbar from './Navbar';

const ProfilePage = () => {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const providerId = 1;
  
  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/serviceProvider.php?id=${providerId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProvider(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProviderData();
  }, [providerId]);
  console.log(provider)
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('id', providerId);

      try {
        const response = await fetch('http://localhost:8000/uploadImage.php', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          setProvider((prev) => ({ ...prev, ImageURL: result.imageUrl }));
        } else {
          console.error('Image upload failed:', result.message);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <>
    <Navbar />
    <div className="mt-[50px] min-h-screen bg-gray-100 p-4 flex justify-center w-full">
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-48 w-full"></div>
        <div className="p-6 flex flex-col gap-4 items-center">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white -mt-16 md:-mt-24">
            <img
              src={provider.ImageURL}
              alt={provider.BusinessName}
              className="w-full h-full object-cover"
            />
          </div>
          <label htmlFor="imageUpload" className="bg-gray-800 bg-opacity-75 text-white rounded-full p-2 cursor-pointer hover:bg-gray-900">
              <FaCamera size={20} />
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          <div className="w-[70%] md:ml-6 text-center md:text-left font-mono">
            <h2 className="text-4xl font-bold text-gray-800 mt-4 md:mt-0 mb-3 ">
              {provider.BusinessName}
            </h2>
            <p className='text-2xl font-bold my-2'>Category:</p>
            <p className=" text-grey-700 text-xl border-b-2 border-grey-700">  {provider.ServiceType}</p>
            <p className='text-xl font-bold my-2'>Services:</p>
            <p className=" text-grey-700 text-xl border-b-2 border-grey-700">
            {provider.SpecificService}</p>
            <div className="mt-4"> 
            <p className='text-xl font-bold my-2'>Email:</p>
              <p className=" text-grey-700 text-xl border-b-2 border-grey-700">{provider.Email}
              </p>
              <p className='text-xl font-bold my-2'>Phone:</p>
              <p className=" text-grey-700 text-xl border-b-2 border-grey-700">{provider.Phone}
              </p>
              <p className='text-xl font-bold my-2'>Address:</p>
              <p className=" text-grey-700 text-xl border-b-2 border-grey-700">{provider.Address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;

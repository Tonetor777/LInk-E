import React from 'react';

const ServiceProviderCard = ({ provider }) => {
  const { ImageURL, BusinessName, Description, SpecificService, Address } = provider;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden m-4 w-80">
      <img src={ImageURL} alt={BusinessName} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h5 className="text-lg font-semibold mb-2">{BusinessName}</h5>
        <p className="text-gray-600 mb-2">{Description}</p>
        <p className="text-gray-800 mb-2"><strong>Service:</strong> {SpecificService}</p>
        <p className="text-gray-800"><strong>Address:</strong> {Address}</p>
      </div>
    </div>
  );
};

export default ServiceProviderCard;
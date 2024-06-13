import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ServiceProviderCard from './ServiceProviderCard';
import Navbar from './Navbar';

const ServiceListing = () => {
  const [providers, setProviders] = useState([]);
  const { eventType } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/fetch_service_providers.php?eventType=${eventType}`)
      .then(response => response.json())
      .then(data => setProviders(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [eventType]);

  return (
    <>
    < Navbar />
    <div className="min-h-screen bg-gray-100">
    <div className='bg-gradient-to-r from-slate-200 to-blue-600 pt-[140px] pb-4 '>
      <h1 className="text-center text-4xl font-bold mb-6 font-mono">{eventType} Service Providers</h1>
        </div>
      <div className="bg-slate-100 grid grid-cols-3 justify-center py-[50px] w-[70%] mx-auto">
        {providers.map(provider => (
          <ServiceProviderCard key={provider.ProviderID} provider={provider} />
        ))}
      </div>
    </div>
    </>
  );
};

export default ServiceListing;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUsers } from '../services/apiController';
import LoadingSpinner from './LoadingSpinner';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const UserView = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    // Fetch users when component mounts by ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchUsers();
                const userData = response.data.find(u => u.id === parseInt(id));
                if (userData) {
                    setUser(userData);
                }
            } catch (error) {
                setError(error.message || 'Error fetching user data');
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [id]);

    // Display loading spinner while fetching data
    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto flex items-center justify-center p-2">
            <div className='w-[150vh] bg-white p-1 md:p-4 px-2 md:px-8 shadow-2xl rounded-lg '>
                <div className="flex justify-between items-center mb-2 border-b p-2">
                    <h1 className="text-lg md:text-2xl font-bold text-gray-700 mb-0 flex-grow text-center">
                        ID: {id} User Details
                    </h1>
                    {/* Edit User details Button */}
                    <Link to={`/edit-user/${user.id}`} className="inline-flex items-center text-sm md:text-base bg-blue-500 hover:bg-blue-600 text-white p-2 md:px-4 md:py-2 rounded transform transition-transform duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        <FiEdit className="mr-2" />Edit
                    </Link>
                </div>
                {error ? (
                    <div className="text-red-500">{error}</div>
                ) : user ? (
                    <div>
                        <div className='flex'>
                            <h1 className='block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2'>Name:</h1>
                            <h2 className='w-1/2 md:w-2/3 text-sm md:text-lg p-2 text-gray-600'>{user.name}</h2>
                        </div>
                        <div className='flex'>
                            <h1 className='block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2'>Username:</h1>
                            <h2 className='w-1/2 md:w-2/3 text-sm md:text-lg p-2 text-gray-600'>{user.username}</h2>
                        </div>
                        <div className='flex'>
                            <h1 className='block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2'>Email:</h1>
                            <h2 className='w-1/2 md:w-2/3 text-sm md:text-lg p-2 text-gray-600'>{user.email}</h2>
                        </div>
                        <div className='flex'>
                            <h1 className='block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2'>Phone:</h1>
                            <h2 className='w-1/2 md:w-2/3 text-sm md:text-lg p-2 text-gray-600'>{user.phone}</h2>
                        </div>
                        <div className='flex'>
                            <h1 className='block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2'>Website:</h1>
                            <h2 className='w-1/2 md:w-2/3 text-sm md:text-lg p-2 text-gray-600 hover:underline hover:text-blue-500'>
                                <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                                    {user.website}
                                </a>
                            </h2>
                        </div>
                        <div className='flex'>
                            <h1 className='block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2'>Address:</h1>
                            <h2 className='w-1/2 md:w-2/3 text-sm md:text-lg p-2 text-gray-600'>{user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</h2>
                        </div>
                        <div className='flex'>
                            <h1 className='block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2'>Company Name:</h1>
                            <h2 className='w-1/2 md:w-2/3 text-sm md:text-lg p-2 text-gray-600'>{user.company.name}</h2>
                        </div>
                        <div className='flex'>
                            <h1 className='block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2'>Catch Phrase:</h1>
                            <h2 className='w-1/2 md:w-2/3 text-sm md:text-lg p-2 text-gray-600'>{user.company.catchPhrase}</h2>
                        </div>
                        <div className='flex'>
                            <h1 className='block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2'>Business Slogan:</h1>
                            <h2 className='w-1/2 md:w-2/3 text-sm md:text-lg p-2 text-gray-600'>{user.company.bs}</h2>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">User not found</p>
                )}
            </div>
        </div>
    );
};

export default UserView;


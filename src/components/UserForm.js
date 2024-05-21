import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, updateUser, fetchUsers } from '../services/apiController';
import LoadingSpinner from './LoadingSpinner';

const UserForm = () => {
    const [user, setUser] = useState({
        name: '', username: '', email: '', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, phone: '', website: '', company: { name: '', catchPhrase: '', bs: '' }
    });
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch user data if editing existing user
    useEffect(() => {
        if (id) {
            fetchUsers().then(response => {
                const userData = response.data.find(u => u.id === parseInt(id));
                if (userData) setUser(userData);
                setLoading(false);
            }).catch(error => {
                console.error('Error fetching user:', error);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [id]);

    // Handle input change in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('address.')) {
            const addressField = name.split('.')[1];
            setUser({ ...user, address: { ...user.address, [addressField]: value } });
        } else if (name.includes('company.')) {
            const companyField = name.split('.')[1];
            setUser({ ...user, company: { ...user.company, [companyField]: value } });
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateUser(id, user);
            } else {
                await createUser(user);
            }
            console.log('Data sent to API successfully:', user);
            setSuccessMessage(`${id ? 'Update' : 'Create'} user successful`);
            setTimeout(() => {
                navigate('/');
            }, 2000); // Navigate after 2 seconds
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Display loading spinner while fetching data
    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto flex items-center justify-center p-2">
            {/* Form inputs */}
            <form onSubmit={handleSubmit} className="w-[150vh] bg-white p-1 md:p-4 px-2 md:px-8 shadow-2xl rounded-lg mb-2">
                <h1 className="text-lg md:text-2xl text-center font-bold text-gray-700 mb-2">{id ? 'Update' : 'Create'} User </h1>
                {successMessage && <div className="text-green-600 mb-2">{successMessage}</div>}
                <div className="mb-1 flex">
                    <label className="block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2">Name</label>
                    <input required type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} className="w-1/2 md:w-2/3 text-sm md:text-base p-1 md:p-2 mt-1 block border border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-1 flex">
                    <label className="block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2">Username</label>
                    <input required type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} className="w-1/2 md:w-2/3 text-sm md:text-base p-1 md:p-2 mt-1 block border border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-1 flex">
                    <label className="block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2">Email</label>
                    <input required type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} className="w-1/2 md:w-2/3 text-sm md:text-base p-1 md:p-2 mt-1 block border border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-1 flex">
                    <label className="block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2">Phone</label>
                    <input required type="text" name="phone" placeholder="Phone" value={user.phone} onChange={handleChange} className="w-1/2 md:w-2/3 text-sm md:text-base p-1 md:p-2 mt-1 block border border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-1 flex">
                    <label className="block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2">Website</label>
                    <input required type="text" name="website" placeholder="Website" value={user.website} onChange={handleChange} className="w-1/2 md:w-2/3 text-sm md:text-base p-1 md:p-2 mt-1 block border border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-1 flex">
                    <label className="block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2">Street</label>
                    <input required type="text" name="address.street" placeholder="Street" value={user.address.street} onChange={handleChange} className="w-1/2 md:w-2/3 text-sm md:text-base p-1 md:p-2 mt-1 block border border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-1 flex">
                    <label className="block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2">Suite</label>
                    <input required type="text" name="address.suite" placeholder="Suite" value={user.address.suite} onChange={handleChange} className="w-1/2 md:w-2/3 text-sm md:text-base p-1 md:p-2 mt-1 block border border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-1 flex">
                    <label className="block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2">City</label>
                    <input required type="text" name="address.city" placeholder="City" value={user.address.city} onChange={handleChange} className="w-1/2 md:w-2/3 text-sm md:text-base p-1 md:p-2 mt-1 block border border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-1 flex">
                    <label className="block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2">Zipcode</label>
                    <input required type="text" name="address.zipcode" placeholder="Zipcode" value={user.address.zipcode} onChange={handleChange} className="w-1/2 md:w-2/3 text-sm md:text-base p-1 md:p-2 mt-1 block border border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-1 flex">
                    <label className="block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2">Company Name</label>
                    <input required type="text" name="company.name" placeholder="Company Name" value={user.company.name} onChange={handleChange} className="w-1/2 md:w-2/3 text-sm md:text-base p-1 md:p-2 mt-1 block border border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-1 flex">
                    <label className="block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2">Catch Phrase</label>
                    <textarea required type="text" name="company.catchPhrase" placeholder="Catch Phrase" value={user.company.catchPhrase} onChange={handleChange} className="w-1/2 md:w-2/3 h-14 text-sm md:text-base p-1 md:p-2 mt-1 block border border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-1 flex">
                    <label className="block text-gray-700 text-md md:text-lg font-bold w-1/2 md:w-1/3 p-2">Business Slogan</label>
                    <textarea required type="text" name="company.bs" placeholder="Business Slogan" value={user.company.bs} onChange={handleChange} className="w-1/2 md:w-2/3 h-14 text-sm md:text-base p-1 md:p-2 mt-1 block border border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </div>
                {/* Submit and cancel buttons */}
                <div className="flex items-center justify-center gap-6 md:gap-10 mt-4">
                    <button type="submit" className="inline-flex items-center text-sm md:text-base bg-blue-500 hover:bg-blue-600 text-white p-2 md:px-4 md:py-2 shadow-md rounded transform transition-transform duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        {id ? 'Update' : 'Create'} User
                    </button>
                    <button type="button" onClick={() => navigate('/')} className="text-sm md:text-base bg-gray-500 hover:bg-gray-600 text-white p-2 md:px-4 md:py-2 rounded transform transition-transform duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;

import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../services/apiController';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiUserPlus, FiEye } from 'react-icons/fi';
import LoadingSpinner from './LoadingSpinner';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch users when component mounts
    useEffect(() => {
        fetchUsers().then(response => {
            setUsers(response.data);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching users:', error);
            setLoading(false);
        });
    }, []);

    // Delete user by ID with confirmation
    const handleDelete = (userId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            deleteUser(userId).then(() => {
                setUsers(users.filter(user => user.id !== userId));
            }).catch(error => {
                console.error('Error deleting user:', error);
            });
        }
    };

    // Display loading spinner while fetching data
    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto p-2">
            <div className="overflow-x-auto md:px-4">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md py-2">
                    {/* Table headers */}
                    <thead>
                        <tr className="bg-gray-300 text-gray-900 text-sm md:text-base leading-normal">
                            <th className="py-1 md:py-2 px-1 md:px-4 border text-left">ID</th>
                            <th className="py-1 md:py-2 px-1 md:px-4 border text-left">Name</th>
                            <th className="py-1 md:py-2 px-1 md:px-4 border text-left">Username</th>
                            <th className="py-1 md:py-2 px-1 md:px-4 border text-left">Email</th>
                            <th className="py-1 md:py-2 px-1 md:px-4 border text-left">Phone</th>
                            <th className="py-1 md:py-2 px-1 md:px-4 border text-left">Website</th>
                            <th className="py-1 md:py-2 px-1 md:px-4 border text-left">Company</th>
                            <th className="py-1 md:py-2 px-1 md:px-4 border text-left">Actions</th>
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-gray-600 text-xs md:text-base font-normal ">
                        {/* Map over users */}
                        {users.map(user => (
                            <tr key={user.id} className="border border-gray-200 hover:bg-gray-100">
                                <td className="py-1 md:py-2 px-1 md:px-4 text-left border">{user.id}</td>
                                <td className="py-1 md:py-2 px-1 md:px-4 text-left border">{user.name}</td>
                                <td className="py-1 md:py-2 px-1 md:px-4 text-left border">{user.username}</td>
                                <td className="py-1 md:py-2 px-1 md:px-4 text-left border">{user.email}</td>
                                <td className="py-1 md:py-2 px-1 md:px-4 text-left border">{user.phone}</td>
                                <td className="py-1 md:py-2 px-1 md:px-4 text-left border hover:text-blue-500 hover:underline">
                                    <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
                                        {user.website}
                                    </a>
                                </td>
                                <td className="py-1 md:py-2 px-1 md:px-4 text-left border">{user.company.name}</td>
                                <td className="py-1 md:py-2 px-1 md:px-4 text-left border">
                                    <div className="flex items-center space-x-2">
                                        {/* View All User details Button */}
                                        <Link
                                            to={`/user/${user.id}`}
                                            className="relative group"
                                        >
                                            <FiEye className="text-blue-500 hover:scale-125" />
                                            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 w-max bg-gray-400 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100">
                                                View
                                            </span>
                                        </Link>
                                        {/* Edit User details Button */}
                                        <Link
                                            to={`/edit-user/${user.id}`}
                                            className="relative group"
                                        >
                                            <FiEdit className="text-gray-500 hover:scale-125" />
                                            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 w-max bg-gray-400 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100">
                                                Edit
                                            </span>
                                        </Link>
                                        {/* Delete User details Button */}
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="relative group"
                                        >
                                            <FiTrash2 className="text-red-500 hover:scale-125" />
                                            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 w-max bg-gray-400 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100">
                                                Delete
                                            </span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Add New User Button */}
            <div className="flex justify-end p-1 md:p-4">
                <Link to="/add-user" className=" inline-flex items-center text-sm md:text-base bg-blue-500 hover:bg-blue-600 text-white p-2 md:px-4 md:py-2 shadow-md rounded transform transition-transform duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    <FiUserPlus className="mr-2" />
                    Add User
                </Link>
            </div>
        </div>
    );
};

export default UserTable;

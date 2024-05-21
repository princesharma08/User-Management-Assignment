import axios from 'axios';

// Base URL and endpoints object
const API_CONFIG = Object.freeze({
    BASE_URL: 'https://jsonplaceholder.typicode.com',
    USERS: '/users',
});

// Get All User Data by this Endpoint
export const fetchUsers = async () => {
    try {
        return await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.USERS}`);
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

// Delete User Data by this Endpoint
export const deleteUser = async (id) => {
    try {
        return await axios.delete(`${API_CONFIG.BASE_URL}${API_CONFIG.USERS}/${id}`);
    } catch (error) {
        throw new Error('Failed to delete user');
    }
};

// Create User Data by this Endpoint
export const createUser = async (user) => {
    try {
        return await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.USERS}`, user);
    } catch (error) {
        throw new Error('Failed to create user');
    }
};

// Update User Data by this Endpoint
export const updateUser = async (id, user) => {
    try {
        return await axios.put(`${API_CONFIG.BASE_URL}${API_CONFIG.USERS}/${id}`, user);
    } catch (error) {
        throw new Error('Failed to update user');
    }
};

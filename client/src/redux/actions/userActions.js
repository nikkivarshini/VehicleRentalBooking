import { message } from "antd";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// Constants for API URLs
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

export const userLogin = (reqobj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        const response = await axios.post(`${BASE_URL}/api/users/login`, reqobj);
        localStorage.setItem('user', JSON.stringify(response.data));
        const user = response.data;
        dispatch({ type: 'LOADING', payload: false });
        message.success('Login successful');
        
        setTimeout(() => {
            if (user.role === 0) {
                window.location.href = '/';
            } else if (user.role === 1) {
                window.location.href = '/admin';
            }
        }, 50);
    } catch (error) {
        console.error(error);
        const errorMessage = error.response?.data?.message || 'Login failed';
        message.error(errorMessage);
        dispatch({ type: 'LOADING', payload: false });
    }
}

export const userRegister = (reqobj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        const response = await axios.post('http://localhost:5000/api/users/register', reqobj);

        dispatch({ type: 'LOADING', payload: false });
        message.success('Registration successful');
        
        setTimeout(() => {
            window.location.href = '/login';
        }, 50);
    } catch (error) {
        dispatch({ type: 'LOADING', payload: false });
        console.error('API Error:', error.response?.data);

        if (error.response?.data?.code === 11000) {
            message.error('Username or email is already registered. Please choose another.');
        } else {
            const errorMessage = error.response?.data?.message || 'Registration failed';
            message.error(errorMessage);
        }
    }
}




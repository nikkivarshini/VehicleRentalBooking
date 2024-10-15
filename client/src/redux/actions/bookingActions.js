import axios from 'axios';
import { message } from 'antd';

// Book Car Action
export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.post('http://localhost:5000/api/bookings/bookcar', reqObj);
    console.log(response);

    // Assuming the backend sends a URL for redirection (e.g., a Stripe checkout URL)
    if (response.data.url) {
      window.location.href = response.data.url;
    }

    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.error('Booking error: ', error);
    dispatch({ type: 'LOADING', payload: false });
    message.error('Something went wrong while booking. Please try again.');
  }
};

// Get All Bookings Action
export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.get('http://localhost:5000/api/bookings/getallbookings');
    dispatch({ type: 'GET_ALL_BOOKINGS', payload: response.data });
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.error('Error fetching bookings: ', error);
    dispatch({ type: 'LOADING', payload: false });
    message.error('Failed to fetch bookings. Please try again.');
  }
};

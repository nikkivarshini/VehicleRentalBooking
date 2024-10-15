import React, { useEffect, useState } from 'react';
import { Table, Spin, message } from 'antd';
import axios from 'axios';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          message.error('User not logged in');
          return;
        }
        
        const response = await axios.get('/api/bookings/getBookingsByUser', {
          params: { userId: user._id },
        });
        setBookings(response.data);
      } catch (error) {
        message.error('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [bookings]);

  const columns = [
    {
      title: 'Car Name',
      dataIndex: 'car',
      key: 'car',
      render: car => car ? car.name : 'N/A',
    },
    {
      title: 'From',
      dataIndex: 'bookedTimeSlots',
      key: 'from',
      render: timeSlots => timeSlots ? timeSlots.from : 'N/A',
    },
    {
      title: 'To',
      dataIndex: 'bookedTimeSlots',
      key: 'to',
      render: timeSlots => timeSlots ? timeSlots.to : 'N/A',
    },
    {
      title: 'Total Hours',
      dataIndex: 'totalHours',
      key: 'totalHours',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={bookings}
          rowKey="_id"
        />
      )}
    </div>
  );
}

export default MyBookings;

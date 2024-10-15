import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Table } from 'antd';
import { getAllBookings } from '../redux/actions/bookingActions'; // Import the action correctly

function AllBookings() {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.bookingsReducer);

  useEffect(() => {
    dispatch(getAllBookings()); // Dispatch the action to fetch bookings
  }, [dispatch]);

  const columns = [
    {
      title: 'Booking ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Car',
      dataIndex: ['car', 'name'], // Access car name from populated field
      key: 'carName',
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
    },
    {
        title: 'From Date',
        dataIndex: ['bookedTimeSlots', 'from'], 
        key: 'fromDate',
      },
      {
        title: 'To Date',
        dataIndex: ['bookedTimeSlots', 'to'], 
        key: 'toDate',
      },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
  ];

  return (
    <div>
      <h2>All Bookings</h2>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={bookings} columns={columns} rowKey="_id" />
      )}
    </div>
  );
}

export default AllBookings;

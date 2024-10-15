import { Col, Divider, Row, DatePicker, Space, Checkbox, Button, Modal, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { getAllCars } from '../redux/actions/carsActions';
import moment from 'moment';
import { bookCar } from '../redux/actions/bookingActions';

const { RangePicker } = DatePicker;

function BookingCar() {
    const { carid } = useParams();
    const { cars } = useSelector(state => state.carsReducer);
    const { loading } = useSelector(state => state.alertsReducer);
    const [car, setCar] = useState({});
    const dispatch = useDispatch();
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [totalDays, setTotalDays] = useState(0);
    const [driver, setDriver] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (cars.length === 0) {
            dispatch(getAllCars());
        } else {
            const selectedCar = cars.find(o => o._id === carid);
            setCar(selectedCar);
            console.log("Selected Car Booked Slots:", selectedCar.bookedTimeSlots); // Debug: Check if booked slots are available
        }
    }, [cars, dispatch, carid]);
    

    useEffect(() => {
        if (car?.rentPerHour && totalDays > 0) {
          let tempAmount = totalDays * 24 * car.rentPerHour; // Convert days to hours
          if (driver) {
            tempAmount += 30 * totalDays; // Additional cost for the driver
          }
          setTotalAmount(tempAmount);
        }
      }, [driver, totalDays, car?.rentPerHour]);
      

    function selectedTimeSlots(values) {
        setFrom(moment(values[0]).format('YYYY-MM-DD'));
        setTo(moment(values[1]).format('YYYY-MM-DD'));
        const calculatedDays = values[1].diff(values[0], 'days') + 1;
        setTotalDays(calculatedDays); // +1 to include both start and end day
        console.log("Total Days Calculated:", calculatedDays); // Debug: Check total days
    }

    function bookNow() {
        if (!from || !to || totalDays === 0 || totalAmount === 0) {
            message.error('Please select a valid time range and ensure the total amount is calculated.');
            return;
        }

        const reqObj = {
            user: JSON.parse(localStorage.getItem('user'))._id,
            car: car._id,
            totalHours: totalDays * 24, // Assuming you need totalHours for some reason
            totalAmount,
            driverRequired: driver,
            bookedTimeSlots: { from, to }
        };

        dispatch(bookCar(reqObj));
    }

    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <Row justify="center" className="d-flex align-items-center" style={{ minHeight: '90vh' }}>
                <Col lg={10} sm={24} xs={24}>
                    {car?.image && (
                        <img src={car.image} alt={car?.name} style={{ height: 450, width: 750 }} />
                    )}
                </Col>
                <Col lg={10} sm={24} xs={24}>
                    <Divider type="horizontal" dashed>
                        Car Info
                    </Divider>
                    <div className="text-right">
                        <p>{car?.name}</p>
                        <p>Fuel Type: {car?.fuelType}</p>
                        <p>Max Persons: {car?.capacity}</p>
                    </div>
                    <Divider type="horizontal" dashed>
                        Time slots
                    </Divider>
                    <Space direction="vertical" size={12}>
                        <RangePicker format="YYYY-MM-DD" onChange={selectedTimeSlots} />
                    </Space>
                    <br />
                    
                    <br />
                    <Checkbox
                        className="mt-3 mb-3"
                        onChange={e => {
                            setDriver(e.target.checked);
                        }}
                    >
                        Driver required
                    </Checkbox>
                    <br />
                    {from && to && (
                    <div>
                    <p>
                    Total days: <b>{totalDays}</b>
                    </p>
                    <p>
                    Rent per day: {car.rentPerHour * 24}
                    </p>
                    <p>Total amount: {totalAmount}</p>
                    </div>
                    )}

                    <Button type="dashed" size="large" className="mt-3" onClick={bookNow}>
                        Book now
                    </Button>
                </Col>
            </Row>
        </DefaultLayout>
    );
}

export default BookingCar;

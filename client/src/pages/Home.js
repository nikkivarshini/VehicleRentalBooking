import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import {useDispatch, useSelector} from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions';
import { Col, DatePicker, Row ,Card, Button,Input} from 'antd';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import mainbanner from './images/main banner.jpg';
import Footer from './Footer';
import moment from 'moment';
const {Meta} = Card;
const { Search } = Input;

function Home(){
    const {cars} = useSelector(state=>state.carsReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const [totalCars, setTotalCars] = useState([])
    const [filteredCars, setFilteredCars] = useState([]);
    const { RangePicker } = DatePicker;
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllCars())
    },[])

    useEffect(()=>{
        setTotalCars(cars);
        setFilteredCars(cars);
    },[cars])
      
    function handleSearch(value) {
        const lowercasedValue = value.toLowerCase();
        const result = totalCars.filter(car =>
            car.name.toLowerCase().includes(lowercasedValue) ||
            car.fuelType.toLowerCase().includes(lowercasedValue)
        );
        setFilteredCars(result);
    }

    return(
        
        <DefaultLayout>
            <div>
            <img 
                    src={mainbanner} 
                    alt="logo" 
                    style={{ width: '100%', height: '500px', padding: '10px' }} 
                />
            </div>
            <Row className='mt-3' justify='center'>
                <Col lg={20} sm={24} className='d-flex justify-content-center'> 
                    <Search
                        placeholder="Search cars..."
                        onSearch={handleSearch}
                        style={{ width: 300, marginLeft: 20,color:'orangered' }}
                    />
                </Col>
            </Row>
            {loading === true && <Spinner/>}
           <Row justify='center'>
            {filteredCars.map(car=>{
            return <Col lg={5} sm={24} xs={24} style={{
                padding:5,
                margin:5
            }}>
            <Card
                    hoverable
                    style={{
                    width: 240,
                    
                    }}
                    cover={<img alt="example" src={car.image} className="card-img"/>}
                >
                <div style={{
                    padding:5,
                    marginTop:10,
                }}>
                    <Button type="primary"><Link to={`/booking/${car._id}`}>Book now</Link></Button>
                </div>
               
            </Card>
            </Col>
                })}
            </Row>
            
        </DefaultLayout>
       
    )
}

export default Home;
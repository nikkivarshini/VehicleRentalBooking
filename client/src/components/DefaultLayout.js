import React from 'react';
import { Button, Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';
import Footer from '../pages/Footer'; // Import the Footer component

const user = JSON.parse(localStorage.getItem('user'));

const items = [
  {
    key: '1',
    label: (
      <Link to="/userprofile">
        Profile
      </Link>
    ),
  },
  {
    key: user && user.role === 1 ? '2' : '3', // Conditional key based on role
    label: (
      <Link to={user && user.role === 1 ? "/all-bookings" : "/my-bookings"}>
        {user && user.role === 1 ? 'All bookings' : 'My bookings'}
      </Link>
    ),
  },
  {
    key: user && user.role === 1 ? '3' : '4', // Adjust key to ensure uniqueness
    label: (
      <div
        onClick={() => {
          localStorage.removeItem('user');
          window.location.href = '/login';
        }}
        style={{ cursor: 'pointer' }}
      >
        Logout
      </div>
    ),
  },
];

function DefaultLayout(props) {
  return (
    <div style={layoutStyle}>
      <div style={headerStyle}>
        <div style={headerContentStyle}>
          <h1 style={{ color: 'orangered' }}>BNB Rentals</h1>
          <h1 style={{ color: 'orangered' }}>RENT RIDE REPEAT</h1>
          <Space direction="vertical" style={{ marginRight: 30 }}>
            <Space wrap>
              <Dropdown menu={{ items }} placement="bottom">
                <Button style={{ color: 'orangered', fontSize: '20px' }}>
                  {user ? user.username : 'Guest'}
                </Button>
              </Dropdown>
            </Space>
          </Space>
        </div>
      </div>
      <div style={contentStyle}>{props.children}</div>
      <Footer /> {/* Add Footer component here */}
    </div>
  );
}

// Layout styles
const layoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

// Header styles
const headerStyle = {
  backgroundColor: '#fff',
  borderBottom: '1px solid #ddd',
  padding: '10px',
};

const headerContentStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const contentStyle = {
  flex: 1,
  width: '100%',
};

export default DefaultLayout;

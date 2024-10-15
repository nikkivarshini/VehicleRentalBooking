import React from 'react';

function Footer() {
  const footerStyle = {
    backgroundColor: 'black',
    padding: '20px 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    color: 'white',
    width: '100%', // Ensure full width
    position: 'relative',
    bottom: 0, // Ensure it sticks to the bottom
  };

  const footerItemStyle = {
    flex: 1,
    minWidth: '200px',
    margin: '0 15px',
    color: 'white'
  };

  const footerTitleStyle = {
    fontSize: '1.2rem',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: 'white'
  };

  const footerDescriptionStyle = {
    marginBottom: '20px',
    color: 'white'
  };

  const footerListStyle = {
    listStyle: 'none',
    padding: 0,
    color: 'white'
  };

  const footerListItemStyle = {
    marginBottom: '10px',
    color: 'white'
  };

  return (
    <div style={footerStyle}>
      <div style={footerItemStyle}>
        <h6 style={footerTitleStyle}>BNB Rentals</h6>
        <p style={footerDescriptionStyle}>
          Take Control Of Your Journey Today
        </p>
      </div>
      <div style={footerItemStyle}>
        <h6 style={footerTitleStyle}>About Company</h6>
        <ul style={footerListStyle}>
          <li style={footerListItemStyle}>About Us</li>
          <li style={footerListItemStyle}>Help</li>
          <li style={footerListItemStyle}>Contact Us</li>
          <li style={footerListItemStyle}>Fee Policy</li>
          <li style={footerListItemStyle}>Privacy Policy</li>
          <li style={footerListItemStyle}>Terms And Conditions</li>
        </ul>
      </div>
      <div style={footerItemStyle}>
        <h6 style={footerTitleStyle}>City</h6>
        <ul style={footerListStyle}>
          <li style={footerListItemStyle}>Pondicherry</li>
        </ul>
      </div>
      <div style={footerItemStyle}>
        <h6 style={footerTitleStyle}>Vehicle Types</h6>
        <ul style={footerListStyle}>
          <li style={footerListItemStyle}>Car</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;

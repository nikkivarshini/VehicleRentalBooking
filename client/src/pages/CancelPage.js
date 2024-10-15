import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const CancelPage = () => {
  useEffect(() => {
    Swal.fire({
      title: 'Cancelled!',
      text: 'Your payment was cancelled. Please try again.',
      icon: 'error',
      confirmButtonText: 'OK',
    }).then(() => {
      // Redirect to homepage or any other page if needed
      window.location.href = '/';
    });
  }, []);

  return null; // Component itself doesn't need to render anything
};

export default CancelPage;

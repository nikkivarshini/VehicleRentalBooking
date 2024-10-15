import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const SuccessPage = () => {
  useEffect(() => {
    Swal.fire({
      title: 'Success!',
      text: 'Your payment was completed successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      // Redirect to homepage or any other page if needed
      window.location.href = '/';
    });
  }, []);

  return null; // Component itself doesn't need to render anything
};

export default SuccessPage;

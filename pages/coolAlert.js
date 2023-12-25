import Swal from 'sweetalert2';

// const showCoolAlert = (message) => {
//   Swal.fire({
//     title: 'In Process!',
//     text: message,
//     icon: 'success',
//     confirmButtonText: 'Confirm!',
//   });
// };

const showCoolAlert = (message, onConfirm) => {
    Swal.fire({
      title: 'In progress!',
      text: message,
      icon: 'info',
      confirmButtonText: 'Got it!',
      allowOutsideClick: false, // Prevent users from clicking outside the alert
      onBeforeOpen: () => {
        Swal.showLoading(); // Show loading spinner before confirming
      },
      onAfterClose: onConfirm, // Callback when the alert is closed
    });
  };

export default showCoolAlert;
// users.js
$(document).ready(() => {
    $.ajax({
      type: 'GET',
      url: '/api/users',
      success: (users) => {
        const usersList = $('#usersList');
        users.forEach((user) => {
          usersList.append(`<div>Name: ${user.firstName} ${user.lastName}</div>`);
          // Display other user data as needed
        });
      },
      error: (error) => {
        console.log('Error occurred while fetching users.');
      }
    });
  });
  
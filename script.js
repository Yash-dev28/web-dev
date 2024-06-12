// script.js
$(document).ready(() => {
    $('#userForm').submit((event) => {
      event.preventDefault();
  
      const formData = {
        firstName: $('#firstName').val(),
        // Add other form data fields
      };
  
      $.ajax({
        type: 'POST',
        url: '/api/users',
        data: JSON.stringify(formData),
        contentType: 'application/json',
        success: (response) => {
          $('#message').text('User data saved successfully!');
        },
        error: (error) => {
          $('#message').text('Error occurred while saving user data.');
        }
      });
    });
  });
  
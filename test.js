const url =  "https://question-craft-backend.vercel.app/";

fetch(url+"getLinks")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Assuming the response is in JSON format
  })
  .then(data => {
    console.log('Data:', data.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
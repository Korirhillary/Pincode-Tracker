// Function to get post office details by PIN code
function getPostOfficeDetailsByPINCode(pincode) {
    const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const status = data[0] ? data[0].Status : "ERROR";
        const message = data[0] ? `No. of post office(s) found: ${data[0].PostOffice ? data[0].PostOffice.length : 0}` : "No data found";
  
        // Check for "INVALID" status
        if (status === "INVALID") {
          displayInvalid();
        } else {
          const postOfficeDetails = data[0] && data[0].PostOffice ? data[0].PostOffice : [];
          displayStatus(status);
          displayMessage(message);
          displayPostOfficeDetails(postOfficeDetails);
        }
      })
      .catch(error => {
        displayError("Error: " + error);
      });
  }
  
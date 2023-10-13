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
  
  // Function to display "Invalid"
  function displayInvalid() {
    const statusContainer = document.getElementById("status-container");
    statusContainer.textContent = "Status: Invalid";
  }
// Function to display "Status" field
function displayStatus(status) {
    const statusContainer = document.getElementById("status-container");
    statusContainer.textContent = "Status: " + status;
  }

  // Function to display "Message" field
  function displayMessage(message) {
    const messageContainer = document.getElementById("message-container");
    messageContainer.textContent = message;
  }
  // Function to display "PostOffice" field
  function displayPostOfficeDetails(postOfficeDetails) {
    const postOfficeContainer = document.getElementById("postoffice-container");
    postOfficeContainer.innerHTML = "";
  
    if (postOfficeDetails.length > 0) {
      postOfficeDetails.forEach(office => {
        const officeDetailsDiv = document.createElement("div");
        officeDetailsDiv.className = "office-details";
  
        for (const key in office) {
          if (office.hasOwnProperty(key)) {
            const detail = document.createElement("p");
            detail.textContent = `${key}: ${office[key]}`;
            officeDetailsDiv.appendChild(detail);
          }
        }
  
        postOfficeContainer.appendChild(officeDetailsDiv);
      });
    } else {
      displayError("No post office data found.");
    }
  }
   // Function to display error messages
   function displayError(message) {
    const errorContainer = document.getElementById("error-container");
    errorContainer.textContent = message;
  }
  // Function to clear the result containers
  function clearResultContainers() {
    document.getElementById("status-container").textContent = "";
    document.getElementById("message-container").textContent = "";
    document.getElementById("postoffice-container").innerHTML = "";
    document.getElementById("error-container").textContent = "";
  }
   // Event listener for the "Search by PIN Code" button
   document.getElementById("pincode-button").addEventListener("click", function () {
    const pincode = document.getElementById("pincode").value;
    if (pincode) {
      clearResultContainers(); // Clear the result containers
      getPostOfficeDetailsByPINCode(pincode);
    }
  });
  // Event listener for the "Reset" button
  document.getElementById("Reset-button").addEventListener("click", function () {
  // Clear the input field
  document.getElementById("pincode").value = "";
  // Clear the result containers
  clearResultContainers();
});

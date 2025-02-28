document.addEventListener("DOMContentLoaded", () => {
    loadRequests(); // Load existing requests on page load
});

function sendRequest() {
    const name = document.getElementById("name").value.trim();
    const location = document.getElementById("location").value.trim();
    const message = document.getElementById("message").value.trim();
    
    if (!name || !location || !message) {
        logMessage("⚠️ Error: Please fill out all fields!");
        alert("Please fill out all fields!");
        return;
    }

    const request = {
        name,
        location,
        message,
        timestamp: new Date().toLocaleString()
    };

    logMessage("✅ Request Sent: " + JSON.stringify(request));

    saveRequest(request);
    addRequestToUI(request);
    
    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("location").value = "";
    document.getElementById("message").value = "";
}

function saveRequest(request) {
    let requests = JSON.parse(localStorage.getItem("helpRequests")) || [];
    requests.push(request);
    localStorage.setItem("helpRequests", JSON.stringify(requests));
}

function loadRequests() {
    let requests = JSON.parse(localStorage.getItem("helpRequests")) || [];
    requests.forEach(addRequestToUI);
}

function addRequestToUI(request) {
    const requestList = document.getElementById("request-list");
    
    const li = document.createElement("li");
    li.innerHTML = `<strong>${request.name} (${request.location})</strong><br>
                    ${request.message}<br>
                    <small>${request.timestamp}</small>`;
    
    requestList.prepend(li); // Add new request at the top
}

function logMessage(msg) {
    document.getElementById("log-content").innerText = msg;
}

// Mock appointment data
let appointments = [
    { service: 'General Checkup', charges: '$100', paymentMode: 'Cash', status: 'Completed' },
    { service: 'Dental Cleaning', charges: '$200', paymentMode: 'Credit Card', status: 'Pending' }
];

// Load appointment data into the table
function loadAppointments() {
    const tbody = document.getElementById('appointmentsTableBody');
    tbody.innerHTML = ''; // Clear previous data
    appointments.forEach((appointment, index) => {
        const row = `
            <tr>
                <td class="p-4 border-b">${appointment.service}</td>
                <td class="p-4 border-b">${appointment.charges}</td>
                <td class="p-4 border-b">${appointment.paymentMode}</td>
                <td class="p-4 border-b">${appointment.status}</td>
                <td class="p-4 border-b">
                    <button class="bg-red-500 text-white px-3 py-1 rounded-lg" onclick="deleteAppointment(${index})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Call this function when page loads to initialize appointment data
loadAppointments();

// Handle Add Appointment form submission
document.getElementById('addAppointmentForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission reload

    // Get values from the form inputs
    const service = document.getElementById('appointmentService').value;
    const charges = document.getElementById('appointmentCharges').value;
    const paymentMode = document.getElementById('appointmentPaymentMode').value;
    const status = document.getElementById('appointmentStatus').value;

    // Add the new appointment to the array
    appointments.push({
        service: service,
        charges: `$${charges}`,  // Formatting charges to include $
        paymentMode: paymentMode,
        status: status
    });

    // Close the modal
    closeAddAppointmentPopup();

    // Clear form fields
    document.getElementById('addAppointmentForm').reset();

    // Refresh the table to include the new appointment
    loadAppointments();
});

// Function to open Add Appointment modal
function openAddAppointmentPopup() {
    document.getElementById('addAppointmentModal').classList.remove('hidden');
}

// Function to close Add Appointment modal
function closeAddAppointmentPopup() {
    document.getElementById('addAppointmentModal').classList.add('hidden');
}

// Function to delete an appointment
function deleteAppointment(index) {
    appointments.splice(index, 1); // Remove the appointment from the array
    loadAppointments(); // Reload the table
}

// Function to handle search functionality (already in place)
function searchAppointments() {
    const query = document.getElementById('searchAppointmentInput').value.toLowerCase();
    const filteredAppointments = appointments.filter(appointment => {
        return (
            appointment.service.toLowerCase().includes(query) ||
            appointment.paymentMode.toLowerCase().includes(query) ||
            appointment.status.toLowerCase().includes(query)
        );
    });
    updateAppointmentTable(filteredAppointments);
}

// Function to update the table with filtered appointments (used by search)
function updateAppointmentTable(filteredAppointments) {
    const tbody = document.getElementById('appointmentsTableBody');
    tbody.innerHTML = ''; // Clear previous data
    filteredAppointments.forEach((appointment, index) => {
        const row = `
            <tr>
                <td class="p-4 border-b">${appointment.service}</td>
                <td class="p-4 border-b">${appointment.charges}</td>
                <td class="p-4 border-b">${appointment.paymentMode}</td>
                <td class="p-4 border-b">${appointment.status}</td>
                <td class="p-4 border-b">
                    <button class="bg-red-500 text-white px-3 py-1 rounded-lg" onclick="deleteAppointment(${index})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}
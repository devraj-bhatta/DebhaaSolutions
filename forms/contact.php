<?php
// Database connection
$servername = "localhost";
$username = "root"; // Default XAMPP username
$password = ""; // Default XAMPP password (empty)
$dbname = "debhaasolutions"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// Get current date and time for the register_date
$register_date = date('Y-m-d H:i:s');  // Format: YYYY-MM-DD HH:MM:SS

// Prepare the SQL query to insert data
$sql = "INSERT INTO contactform (name, email, subject, message, register_date) 
        VALUES ('$name', '$email', '$subject', '$message', '$register_date')";

// Execute the query and check for errors
if ($conn->query($sql) === TRUE) {
    echo "Message received! Thank you for contacting us.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();
?>
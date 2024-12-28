<?php
// Database connection details
$servername = "localhost";
$username = "root";  // Default XAMPP username
$password = "";      // Default XAMPP password (empty)
$dbname = "debhaasolutions";  // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the email from the form submission
    $email = $_POST['email'];

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";  // If email format is invalid
    } else {
        // Prepare the SQL query to insert the email into the newsletter table
        $sql = "INSERT INTO newsletter (email) VALUES ('$email')";

        // Execute the query and check for success
        if ($conn->query($sql) === TRUE) {
            // If the query is successful, show the success message
            echo "Your subscription request has been sent. Thank you!";
        } else {
            // If there was an error with the query, show an error message
            echo "Error: " . $conn->error;
        }
    }
}

// Close the database connection
$conn->close();
?>

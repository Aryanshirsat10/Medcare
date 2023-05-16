<?php
	// Establish database connection
	$con = mysqli_connect("localhost", "root", "", "myhmsdb");

	if ($con->connect_error) {
		die("Connection failed: " . $con->connect_error);
	}

	// Check if form submitted
	if(isset($_POST['submit'])){
		$location = $_POST['location'];

		// Fetch doctors by location
		$sql = "SELECT * FROM doctb WHERE location='$location'";
		$result = $con->query($sql);

		if ($result->num_rows > 0) {
			// Display doctors
			while($row = $result->fetch_assoc()) {
				echo "Name: " . $row["username"]. " - Location: " . $row["location"]. " - Specialization: " . $row["spec"]. "<br>";
			}
		} else {
			echo "No doctors found for this location";
		}
	}
?>
<?php

$servername = "localhost";
$username = "root";
$password = "Tagmr@1228";
$dbname = "ip3";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully\n";
} else {
    echo "Error creating database: " . $conn->error . "\n";
}

$conn->select_db($dbname);

$sql = "
CREATE TABLE IF NOT EXISTS Customer (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    FullName VARCHAR(100),
    Email VARCHAR(100),
    Phone VARCHAR(20),
    Password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS ServiceProvider (
    ProviderID INT PRIMARY KEY AUTO_INCREMENT,
    BusinessName VARCHAR(100),
    Description VARCHAR(255),
    ServiceType VARCHAR(100),
    SpecificService VARCHAR(100),
    Email VARCHAR(100),
    Phone VARCHAR(20),
    Address VARCHAR(255),
    ImageURL VARCHAR(255),
    Password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Event (
    EventID INT PRIMARY KEY AUTO_INCREMENT,
    EventType VARCHAR(100),
    EventDate DATE,
    Location VARCHAR(255),
    Description TEXT
);

CREATE TABLE IF NOT EXISTS ServiceType (
    ServiceTypeID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Service (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ProviderID INT,
    ServiceTypeID INT,
    Description TEXT,
    Price DECIMAL(10, 2),
    FOREIGN KEY (ProviderID) REFERENCES ServiceProvider(ProviderID),
    FOREIGN KEY (ServiceTypeID) REFERENCES ServiceType(ServiceTypeID)
);

CREATE TABLE IF NOT EXISTS Review (
    ReviewID INT PRIMARY KEY AUTO_INCREMENT,
    Rating INT,
    Comment TEXT,
    CustomerID INT,
    ProviderID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (ProviderID) REFERENCES ServiceProvider(ProviderID)
);

CREATE TABLE IF NOT EXISTS PreviousWork (
    WorkID INT PRIMARY KEY AUTO_INCREMENT,
    ProviderID INT,
    Title VARCHAR(100),
    Description TEXT,
    ImageURL VARCHAR(255),
    FOREIGN KEY (ProviderID) REFERENCES ServiceProvider(ProviderID)
);

";

if ($conn->multi_query($sql) === TRUE) {
    echo "Tables created successfully\n";
} else {
    echo "Error creating tables: " . $conn->error . "\n";
}

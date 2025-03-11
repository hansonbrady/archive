<?php
// verify-google-token.php

require 'vendor/autoload.php';

$CLIENT_ID = '935903866874-b67p8avbfk8d3jl3ts10lmncfcr6vc9c.apps.googleusercontent.com';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['token'];

    $client = new Google_Client(['client_id' => $CLIENT_ID]);
    try {
        $payload = $client->verifyIdToken($token);
        if ($payload) {
            // User is authenticated!
            // You can access user data from $payload (e.g., $payload['email'], $payload['name']).
            // Add your logic to create/find the user in your database and manage sessions.
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Invalid token']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => 'Token verification failed: ' . $e->getMessage()]);
    }

} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request']);
}
?>
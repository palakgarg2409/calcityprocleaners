<?php
if(empty($_POST['name']) || empty($_POST['phone']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  http_response_code(500);
  exit();
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));

$to = "palakgargbnl@gmail.com"; // Change this email to your address //
$subject = "Message from $name via Contact Form";
$body = "You have received a new message from your website contact form.\n\n".
        "Here are the details:\n\n".
        "Name: $name\n".
        "Email: $email\n".
        "Phone: $phone\n".
        "Message: $message";
$headers = "From: $email\r\n".
           "Reply-To: $email\r\n".
           "X-Mailer: PHP/".phpversion();

if(!mail($to, $subject, $body, $headers)) {
  http_response_code(500);
}
?>

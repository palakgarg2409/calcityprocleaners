console.log("contact js loaded");

$('#name').focus(function () {
    $('#success').html('');
});

//sending email logic
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent default form submission
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    // Prepare form data to send via POST request
    const data = {
        name,
        email,
        phone,
        message
    };

    // Send POST request to the Firebase Function
    fetch('https://us-central1-calcity-9da55.cloudfunctions.net/app/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(data => {
        $('#success').html("<div class='alert alert-success'>");
        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
        $('#success > .alert-success')
                .append("<strong>Your message has been sent. </strong>");
        $('#success > .alert-success')
                .append('</div>');
        $('#contactForm').trigger("reset");
    })
    .catch((error) => {
        console.error('Error:', error);
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
        $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our mail server is not responding. Please try again later!"));
        $('#success > .alert-danger').append('</div>');
        $('#contactForm').trigger("reset");
    });
});



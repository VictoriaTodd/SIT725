const clickMe = () => {
    alert("Your alert text goes here!")
}

$(document).ready(function () {
    $('.modal').modal();
    $('#clickMeButton').click(() => {
        clickMe();
    });
    $(document).ready(function () {
        $('#submit-button').click(function () {
            // Retrieve values from inputs
            const firstName = $('#first_name').val();
            const lastName = $('#last_name').val();
            const email = $('#email').val();

            // Log or use the values
            console.log('First Name:', firstName);
            console.log('Last Name:', lastName);
            console.log('Email:', email);

            // Package the values to send to the server
            const formData = {
                first_name: firstName,
                last_name: lastName,
                email: email
            };

            // Send data to the server using a POST request
            fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Send data as JSON
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    // Optionally display a success message or reset the form
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    });
});
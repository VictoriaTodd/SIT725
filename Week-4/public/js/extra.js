const clickMe = () => {
    alert("Your alert text goes here!")
}

const data = [
    { title: "Card 1", content: "This is the first card.", image: "https://via.placeholder.com/150" },
    { title: "Card 2", content: "This is the second card.", image: "https://via.placeholder.com/150" },
    { title: "Card 3", content: "This is the third card.", image: "https://via.placeholder.com/150" },
];


$(document).ready(function () {
    $('.modal').modal();
    $('#clickMeButton').click(() => {
        clickMe();
    });
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
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
    $.getJSON("/api/get-cards", function (result) {
        console.log("retrieved")
        console.log(data)
        const $cardContainer = $("#card-container");

        result.data.forEach((item) => {
            const $card = $(`
                <div class="col s12 m6">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">${item.firstName} ${item.lastName}</span>
                            <p>${item.email}</p>
                        </div>
                    </div>
                </div>
              `);

            $cardContainer.append($card);
        });
    });
});
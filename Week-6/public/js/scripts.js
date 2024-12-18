function addCards(data) {
    data.forEach((item) => {
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

        $('#card-container').append($card);
    });
}

const formSubmitted = (postPersonFunction) => {
    let formData = {};
    formData.firstName = $('#first_name').val();
    formData.lastName = $('#last_name').val();
    formData.email = $('#email').val();

    console.log(formData);
    postPersonFunction(formData);
}

function postPerson(person) {
    $.ajax({
        url:'/api/person',
        type:'POST',
        data:person,
        success: (result) => {
            if (result.statusCode === 201) {
                alert('person posted');
                location.reload();
            }
        }
    });
}

function getAllPeople(addCardsFunction) {
    $.get('/api/person',(result)=>{
        if (result.statusCode === 200) {
            addCardsFunction(result.data);
        }
    });
}


$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#submit-button').click(()=>{
        formSubmitted(postPerson);
    });
    $('.modal').modal();
    getAllPeople(addCards);
    console.log('ready');
});
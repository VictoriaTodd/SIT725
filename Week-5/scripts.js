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

const formSumitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.path = $('#path').val();
    formData.subTitle = $('#subTitle').val();
    formData.description = $('#description').val();

    console.log(formData);
    postPerson(formData);
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

function getAllPeople() {
    $.get('/api/person',(result)=>{
        if (result.statusCode === 200) {
            addCards(result.data);
        }
    });
}

let socket = io();
socket.on('number',(msg)=>{
    console.log('Random Number: ' + msg);
});

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#submit-button').click(()=>{
        formSumitted();
    });
    $('.modal').modal();
    getAllPeople();
    console.log('ready');
});
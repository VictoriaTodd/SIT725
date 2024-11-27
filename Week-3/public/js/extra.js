const clickMe = () => {
    alert("Your alert text goes here!")
}

$(document).ready(function () {
    $('.modal').modal();
    $('#clickMeButton').click(() => {
        clickMe();
    });
});

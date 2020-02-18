var pageNumber = 1;
var pageSize = 5;
var search = ""; 
function GetListStudent() {

    $.ajax({
        url: "/UserApp/ListUser",
        type: "POST",
        dataType: "html",
        data: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            search: search
        },
        beforeSend: function () {

        },
        success: function (res) {
            $('.get-data').html('');
            $('.get-data').append(res);
            EditClick();
            Pagination();
        },
        error: function () {

        },
        complete: function () {

        }
    })
}
function AddOrEdit() {
    var data = {};
    $('.add-or-edit input ').each(function () {
        var key = $(this).attr('name');
        var value = $(this).val();
        data[key] = value;  
        
    })
    $.ajax({
        url: "/UserApp/AddOrEdit",
        type: "POST",
        contentType: 'application/json', 
        dataType: "json",
        data: JSON.stringify(data),
        beforeSend: function () {

        },
        success: function (res) {
            if (res) {
                GetListStudent();
                DefaultValueInput();
            }
        },
        error: function () {

        },
        complete: function () {

        }
    })
}
function DefaultValueInput() {
    $('.add-or-edit input ').each(function () {
        $(this).val(''); 

    })
}
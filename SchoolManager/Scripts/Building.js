var id = 0;
var pageNumber = 1;
var pageSize = 5;
var search = "";
function EditClick() {
    $('.btn-edit').click(function () {
        id = $(this).attr('data-id');
        var name = $(this).attr('data-name');
        var node = $(this).attr('data-node');
        var status = $(this).attr('data-status');
        $('.add-or-edit input[name="name"]').val(name);
        $('.add-or-edit input[name="node"]').val(node);
        $('.add-or-edit .status').val(status);
    })
}
GetListBuilding();
EditClick();

GetBuilding();
function GetBuilding() {
    $('.btn-detail').click(function () {
        
        var id = $(this).attr('data-id');
        
        $.ajax({
            url: "/Building/InfoDetail",
            type: "GET",
            dataType: "html",
            data: {
                id: id,
            },
            beforeSend: function () {

            },
            success: function (res) {
                $('.modal-body').html('');
                $('.modal-body').append(res);
                
                
            },
            error: function () { },
            complete: function () { },
        })
    })
}
function GetListBuilding() {
    $.ajax({
        url: "/Building/ListBuilding",
        type: "get",
        dataType: "html",
        data: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            search: search,
        },
        beforeSend: function () {

        },
        success: function (res) {
            $('.list-building').html('');
            $('.list-building').append(res);
            EditClick();
            DeleteBuilding();
            Pagination();
            GetBuilding();

        },
        error: function () { },
        complete: function () { },
    })
}

function AddBuilding() {
    $('.btn-createEdit').click(function () {
        var name = $('.add-or-edit input[name="name"]').val();
        var node = $('.add-or-edit input[name="node"]').val();
        var status = $('.add-or-edit .status').val(); 
  

        if (Check(node, name)) {
            $.ajax({
                url: "/Building/Create",
                type: "POST",
                dataType: "json",
                data: {
                    name: name,
                    node: node,
                    status: status
                },
                beforeSend: function () { },
                success: function (res) {

                    if (res) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Thêm thành công!',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        GetListBuilding();
                        DefaultValueInput();

                    }

                },
                error: function () { },
                complete: function () { },
            })
        }

    })

}
AddBuilding();
function DefaultValueInput() {
    $('.add-or-edit input[name="name"]').val('');
    $('.add-or-edit input[name="node"]').val('');
    $('.error').html(''); 

}
function Update() {
    $('.btn-update').click(function () {

        var name = $('.add-or-edit input[name="name"]').val();
        var node = $('.add-or-edit input[name="node"]').val();
        var status = $('.add-or-edit .status').val();
        if(Check(name, node)){
            $.ajax({
                url: "/Building/Update",
                type: "POST",
                dataType: "json",
                data: {
                    id: id,
                    name: name,
                    node: node,
                    status: status
                },
                beforeSend: function () { },
                success: function (res) {

                    if (res) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Cập nhập thành công!',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        GetListBuilding();
                        DefaultValueInput();
                    }
                },
                error: function () { },
                complete: function () { },
            })
        }
        
    })


}
Update();
function DeleteBuilding() {
    $('.btn-delete').click(function () {
        id = $(this).attr('data-id');
        Swal.fire({
            title: 'Bạn có muốn xóa không?',
            text: "Dữ liệu sẽ bị mất!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/Building/Delete",
                    type: "POST",
                    dataType: "json",

                    data: {
                        id: id
                    },

                    beforeSend: function () {

                    },
                    success: function (res) {

                        if (res) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Xóa thành công!',
                                showConfirmButton: false,
                                timer: 1000
                            })
                            GetListBuilding();
                        }

                    },
                    error: function () { },
                    complete: function () { },

                })
            }
        })
        
    })
}
DeleteBuilding();
function Pagination() {
    $('.pagination button').click(function () {
        pageNumber = $(this).attr('data-page');
        GetListBuilding(); 
    })
}

Search();
function Search() {
    $('input[name="searchname"]').keyup(function () {
        search = $(this).val();
        GetListBuilding();
    })
}
function Check(node, name) {
    if (node.trim() == '' || name.trim() == '' ) {
        $('.error').html('');
        $('.add-or-edit input').each(function () {
            if ($(this).val().trim() == '') {
                var name = $(this).siblings('label').text();
                var row = `<p> ${name} Không đc để trống!<p>`;
                $(this).siblings('.error').append(row);

            }
        })
        return false;
    }
    return true;
}
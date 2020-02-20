var pageNumber = 1;
var pagesize = 5;
var search = '';
function EditClick() {
    $('.btn-edit').click(function () {
        var ID = $(this).attr('data-id');
        var Name = $(this).attr('data-name');
        var Node = $(this).attr('data-Node');
        var Status = $(this).attr('data-Status');     
        $('.add-or-edit input[name="ID"]').val(ID);
        $('.add-or-edit input[name="Name"]').val(Name);
        $('.add-or-edit input[name="Node"]').val(Node);
        $('.add-or-edit .status').val(Status);
       
    })

}
function Update() {
    $('.btn-update').click(function () {
        var ID = $('.add-or-edit input[name="ID"]').val();
        var Name = $('.add-or-edit input[name="Name"]').val();
        var Node = $('.add-or-edit input[name="Node"]').val();
        var Status = $('.add-or-edit .status').val();
        if(check(Name, Node)){
            $.ajax({
                url: "/FacultyManager/Update",
                type: "POST",
                dataType: "json",
                data: {
                    ID: ID,
                    Name: Name,
                    Node: Node,
                    Status: Status
                },
                beforeSend: function () {

                },
                success: function (res) {
                    if (res) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Cập nhập thành công!',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        GetListFaculty();
                        DefaultValueInput();
                    }

                },
                error: function () { },
                complete: function () { }

            });
        }
        
    })
}
EditClick();
Update();
function GetListFaculty() {
    $.ajax({
        url: "/FacultyManager/ListFaculty",
        type: "POST",
        dataType: "html",
        data: {
            search: search,
            pageNumber: pageNumber,
            pagesize: pagesize
        },

        beforeSend: function () {

        },
        success: function (res) {
            $('.list-faculty').html('');
            $('.list-faculty').append(res);
            EditClick();
            Delete();
            Pagination();
            GetFaculty();
        },
        error: function () { },
        complete: function () {

        }

    })
}

function GetFaculty() {
    $('.btn-detail').click(function () {
      var  ID = $(this).attr('data-id');
    $.ajax({
        url: "/FacultyManager/ChitietKhoa",
        type: "GET",
        dataType: "html",
        data: {
            ID:ID
        },

        beforeSend: function () {

        },
        success: function (res) {
            $('.modal-body').html('');
            $('.modal-body').append(res);
            GetFaculty();
      
        },
        error: function () { },
        complete: function () {

        }

    })
    })}
GetFaculty();

GetListFaculty();
AddFaculty();
function AddFaculty() {
    $('.btn-createEdit').click(function () {
   
        var Name = $('.add-or-edit input[name="Name"]').val();
        var Node = $('.add-or-edit input[name="Node"]').val();
        var Status = $('.add-or-edit .status').val();
        if(check(Name, Node)) {
            $.ajax({
                url: "/FacultyManager/Create",
                type: "POST",
                dataType: "json",
                data: {
                 
                    Name: Name,
                    Node: Node,
                    Status: Status

                },
                beforeSend: function () {

                },
                success: function (res) {
                    if (res) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Thêm thành công!',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        GetListFaculty();
                        DefaultValueInput();


                    }

                },
                error: function () { },
                complete: function () { }

            });
        }
    })
}
      


function DefaultValueInput() {
      $('input[name="Name"]').val(' ');
      $(' input[name="Node"]').val('');
    
     $(' input[name="Status"]').val('');
    $('.error').html(''); 
}
function Delete() {
    $('.btn-delete').click(function () {
        var ID = $(this).attr("data-id");
        Swal.fire({
            title: 'Bạn có muốn xóa không?',
            text: "Lưu ý: Dữ liệu sau khi xóa sẽ không thể phục hồi!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/FacultyManager/Delete",
                    type: "POST",
                    dataType: "json",
                    data: {
                        ID: ID

                    },
                    beforeSend: function () {

                    },
                    success: function (res) {
                        if (res) {
                            Swal.fire({

                                icon: 'success',
                                title: 'Xóa thành công!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            GetListFaculty();

                        }
                    },
                    error: function () { },
                    complete: function () { }

                });
            }
        })
        
    })
}
Delete();
function Pagination() {
    $('.pagination button').click(function () {
        pageNumber = $(this).attr('data-page');
        GetListFaculty();
    })
}
function Search() {
    $('input[name="searchName"]').keyup(function () {
        search = $(this).val();
        GetListFaculty();
    })
}
Search();
function check(Name, Node) {
    if (Name.trim() == '' || Node.trim() == ''  ) {
        $('.error').html('');
        $('.add-or-edit input').each(function () {
            if ($(this).val().trim() == '') {
                var name = $(this).siblings('label').text();
                var row = `<p>${name} không được để trống</p>`;
                $(this).siblings('.error').append(row);
            }
        })

        return false;
    }
    return true;
}

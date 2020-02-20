var id = 0;
var subjectID = 0;
var search = "";
var pageNumber = 1;
var pageSize = 5;
GetListLecture();
AddLecture();
EditButton();
Update();
Delete();
Search();
FilterBySubject();
function GetListLecture() {
    
    $.ajax({
        url: "/QuanLyGiangVien/ListLecture",
        type: "post",
        dataType: "html",
        data: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            search: search,
            subjectID: subjectID
        },
        beforesend: function () { },
        success: function (res) {
            $('.list-lecture').html('');
            $('.list-lecture').append(res);
            EditButton();
            Delete();
            CountPage();
            GetLecture(); 
        },
        error: function () { },
        complete: function () { }
    })
}
function GetLecture() {
    $('.btn-details').click(function () {
        var idLec = $(this).attr('data-id'); 
        $.ajax({
            url: "/QuanLyGiangVien/GetLecture",
            type: "POST",
            dataType: "html",
            data: {
                id: idLec,
            },
            beforesend: function () { },
            success: function (res) {
                $('#myModal .modal-body').html('');
                $('#myModal .modal-body').append(res); 
            },
            error: function () { },
            complete: function () { }
        })
    })
}
function AddLecture() {
    $('.btn-add').click(function () {
        var name = $('.add-or-edit input[name="name"]').val();
        var gender = $('.add-or-edit input:checked').val(); 
        var birthday = $('.add-or-edit input[name="birthday"]').val();
        var address = $('.add-or-edit input[name="address"]').val();
        var phone = $('.add-or-edit input[name="phone"]').val();
        var email = $('.add-or-edit input[name="email"]').val();
        var facultyid = $('.add-or-edit #facultyid').val();
        var node = $('.add-or-edit input[name="node"]').val();
        if (CheckError(name, birthday, address, phone, email, facultyid)) {
            $.ajax({
                url: "/QuanLyGiangVien/Create/",
                type: "POST",
                dataType: "json",
                data: {
                    name: name,
                    gender: gender,
                    birthday: birthday,
                    address: address,
                    phone: phone,
                    email: email,
                    FaculityID: facultyid,
                    node: node,

                },
                beforesend: function () { },
                success: function (res) {
                    if (res) {
                        GetListLecture();
                        DefaultValueInput();
                        Swal.fire({
                            position: 'middle-middle',
                            icon: 'success',
                            title: 'Thêm thành công',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                },
                error: function () { },
                complete: function () { }
            })
        }
    });
    
}
function EditButton() {
    $('.btn-fix').click(function () {
        id = $(this).attr('data-id');
        var name = $(this).attr('data-name');
        var gender = $(this).attr('data-gender');
        var birthday = $(this).attr('data-birthday');
        var address = $(this).attr('data-address');
        var phone = $(this).attr('data-phone');
        var email = $(this).attr('data-email');
        var FacultyID = $(this).attr('data-facultyid');
        var node = $(this).attr('data-node');
        $('.add-or-edit input[name="name"]').val(name);
        if (gender.toLowerCase() == "true") {
            $("#male").prop("checked", true); 
        }
        else {
            $("#female").prop("checked", true);    
        }
        $('.add-or-edit input[name="birthday"]').val(birthday);
        $('.add-or-edit input[name="address"]').val(address);
        $('.add-or-edit input[name="phone"]').val(phone);
        $('.add-or-edit input[name="email"]').val(email);
        $('.add-or-edit #facultyid').val(FacultyID);
        $('.add-or-edit input[name="node"]').val(node);
    });
}
function Update() {
    $('.btn-edit').click(function () {
        
        var name = $('.add-or-edit input[name="name"]').val();
        var gender = $('.add-or-edit input[name="gender"]').val();
        var birthday = $('.add-or-edit input[name="birthday"]').val();
        var address = $('.add-or-edit input[name="address"]').val();
        var phone = $('.add-or-edit input[name="phone"]').val();
        var email = $('.add-or-edit input[name="email"]').val();
        var facultyid = $('.add-or-edit #facultyid').val();
        var node = $('.add-or-edit input[name="node"]').val();
        if (CheckError(name, birthday, address, phone, email, facultyid)) {
            $.ajax({
                url: "/QuanLyGiangVien/Edit",
                type: "POST",
                dataType: "json",
                data: {
                    id: id,
                    name: name,
                    gender: gender,
                    birthday: birthday,
                    address: address,
                    phone: phone,
                    email: email,
                    FaculityID: facultyid,
                    node: node,
                },
                beforesend: function () { },
                success: function (res) {
                    GetListLecture();
                    DefaultValueInput();
                    Swal.fire({
                        position: 'middle-middle',
                        icon: 'success',
                        title: 'Sửa thành công',
                        showConfirmButton: false,
                        timer: 1500
                    })
                },
                error: function () { },
                complete: function () { }
            })
        }
    });
}
function Delete() {
    $('.btn-delete').click(function () {
        var id = $(this).attr('data-id');
        Swal.fire({
            title: 'Bạn chắc chắn muốn xóa?',
            text: "Lưu ý: Dữ liệu sau khi xóa sẽ không thể phục hồi!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xóa',
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/QuanLyGiangVien/Delete/",
                    type: "POST",
                    dataType: "json",
                    data: {
                        id: id,
                    },
                    beforesend: function () { },
                    success: function (res) {
                        GetListLecture();
                        Swal.fire({
                            position: 'middle-middle',
                            icon: 'success',
                            title: 'Xóa thành công',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    },
                    error: function () { },
                    complete: function () { }
                });

            }
        })
            
        
    });
}
function Search() {
    $('input[name="searchName"]').keyup(function () {
        search = $(this).val();
        GetListLecture();
    });
    
}
function CountPage() {
    $('.pagination button').click(function () {
        pageNumber = $(this).attr('data-page');
        GetListLecture();
    });
}
function FilterBySubject() {
    $('.subjectID').change(function () {
        subjectID = $(this).val();
        GetListLecture();
    });
}
function CheckError(name, birthday, address, phone, email, facultyid) {
    if (name.trim() == ""  || birthday.trim() == "" || address.trim() == "" || phone.trim() == "" || email.trim() == "" || facultyid == 0) {
        $('.error').html('');
        $('.add-or-edit input').each(function () {
            if ($(this).val().trim() == "") {
                var alert = $(this).siblings('label').text();
                var row = `<p>${alert} không được để trống !</p>`
                $(this).siblings('.error').append(row);
            }
        })
        return false;  
    }
    else return true;  
}
function DefaultValueInput() {
    $('.add-or-edit input[name="name"]').val('');
    $('.add-or-edit input:checked').val('');
    $('.add-or-edit input[name="birthday"]').val('');
    $('.add-or-edit input[name="address"]').val('');
    $('.add-or-edit input[name="phone"]').val('');
    $('.add-or-edit input[name="email"]').val('');
    $('.add-or-edit #facultyid').val('1');
    $('.add-or-edit input[name="node"]').val('');
    $('.error').html('');
}
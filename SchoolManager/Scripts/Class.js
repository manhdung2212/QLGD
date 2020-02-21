var id = 0;
var pageNumber = 1;
var pageSize = 5;
var search = "";
var subjectid = 0;
var searchcode = "";
function EditClick() {
    $('.btn-edit').click(function () {
        id = $(this).attr('data-id');
        var name = $(this).attr('data-name');
        var subjectid = $(this).attr('data-subjectid');
        var lecturerid = $(this).attr('data-lecturerid');
        var code = $(this).attr('data-code');
        var node = $(this).attr('data-node');
 
        $('.add-or-edit input[name="name"]').val(name);
        $('.add-or-edit input[name="code"]').val(code);
        $('.add-or-edit #subjectid').val(subjectid);
        $('.add-or-edit #lecturerid').val(lecturerid);
        $('.add-or-edit #node').val(node);

     
    })
}
EditClick();
GetListClass();
GetClass();
function GetClass() {
    $('.btn-detail').click(function () {
        id = $(this).attr('data-id');
        $.ajax({
            url: "/Class/InfoDetail",
            type: "POST",
            dataType: "html",
            data: {
                id: id,
            },
            beforeSend: function () {},
            success: function (res) {
                $('.modal-body').html('');
                $('.modal-body').append(res);
            },
            error: function () { },
            complete: function () { },
        })
    })
}
function GetListClass() {
    $.ajax({
        url: "/Class/ListClass",
        type: "POST",
        dataType: "html",
        data: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            search: search,
            subjectID: subjectid,
            searchCode:searchcode,
        },
        beforeSend: function () {

        },
        success: function (res) {
            $('.list-class').html('');
            $('.list-class').append(res);
            EditClick();
            DeleteClass();
            Pagination();
            GetClass();
         
        },
        error: function () { },
        complete: function () { },
    })
}

function AddClass() {
    $('.btn-createEdit').click(function () {
       var name= $('.add-or-edit input[name="name"]').val();
       var code= $('.add-or-edit input[name="code"]').val();
      var subjectid=  $('.add-or-edit #subjectid').val();
     var lecturerid=$('.add-or-edit #lecturerid').val();
        var node=$('.add-or-edit #node').val();

        if (Check(code, name, node,  subjectid, lecturerid)) {
            $.ajax({
                url: "/Class/Create",
                type: "POST",
                dataType: "json",
                data: {
                    code: code,
                    name: name,
                    subjectID: subjectid,
                    lecturerID: lecturerid,
                    node: node,


                },
                beforeSend: function () { },
                success: function (res) {

                    Swal.fire({

                        icon: 'success',
                        title: 'Thêm thành công!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                        GetListClass();
                        DefaultValueInput();

                    

                },
                error: function () { },
                complete: function () { },
            })
        }
        
    })

}
AddClass();
function DefaultValueInput() {
    $('.add-or-edit input[name="name"]').val('');
    $('.add-or-edit input[name="code"]').val('');
    $('.add-or-edit #subjectID').val('');
    $('.add-or-edit #lecturerID').val('');
    $('.add-or-edit #node').val('');
    $('.error').html(''); 
}
function Update() {
    $('.btn-update').click(function () {

        var name = $('.add-or-edit input[name="name"]').val();
        var code = $('.add-or-edit input[name="code"]').val();
        var subjectid = $('.add-or-edit #subjectid').val();
        var lecturerid = $('.add-or-edit #lecturerid').val();
        var node = $('.add-or-edit #node').val();

        $.ajax({
            url: "/Class/Update",
            type: "POST",
            dataType: "json",
            data: {
                id:id,
                code: code,
                name: name,
                subjectID: subjectid,
                lecturerID: lecturerid,
                node: node,

            },
            beforeSend: function () { },
            success: function (res) {
                Swal.fire({

                    icon: 'success',
                    title: 'Cập nhật thành công!',
                    showConfirmButton: false,
                    timer: 1500
                })
                
                    GetListClass();
                    DefaultValueInput();
                
            },
            error: function () { },
            complete: function () { },
        })
    })


}
Update();
function DeleteClass() {
    $('.btn-delete').click(function () {
        id = $(this).attr('data-id');
        Swal.fire({
            title: 'Bạn chắc chắn muốn xóa?',
            text: "Lưu ý: Dữ liệu sau khi xóa sẽ không thể phục hồi!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "/Class/Delete",
                    type: "POST",
                    dataType: "json",

                    data: {
                        id: id
                    },

                    beforeSend: function () {

                    },
                    success: function (res) {

                        Swal.fire({

                            icon: 'success',
                            title: 'Xóa thành công',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        GetListClass();

                    },
                    error: function () { },
                    complete: function () { },

                })
            }
        })
    })
 }
DeleteClass();
function Pagination() {
    $('.pagination button').click(function () {
        pageNumber = $(this).attr('data-page');
        GetListClass();
    })
}

Search();
function Search() {
    $('input[name="searchname"]').keyup(function () {
        search = $(this).val();
        GetListClass();
    })
}
function SearchCode() {
    $('input[name="searchcode"]').keyup(function () {
        searchcode = $(this).val();
        GetListClass();
    })
}
SearchCode();
function Check(code, name, node, subjectid, lecturerid) {
    if (code.trim() == '' || name.trim() == '' || subjectid.trim() == '' || lecturerid.trim() == '' || node.trim() == '') {
        $('.error').html('');
        $('.add-or-edit input , .add-or-edit textarea').each(function () {
            if ($(this).val().trim() == '') {
                var name = $(this).siblings('label').text();
                var row = `<p> ${name} không được để trống<p>`;
                $(this).siblings('.error').append(row);

            }
        })
        return false;
    }
    return true;
}
FillterBySubject();
function FillterBySubject() {
    $('.subjectID').change(function () {
        subjectid = $(this).val();
        GetListClass();
    })
}
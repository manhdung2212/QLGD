function FillByStatus(url,classAppend) {
    $('.searchStatus').change(function () {
        data.Status = $(this).val();
        SchoolCommonJS.getDataFillter(data, url, classAppend);
    })
}

function Give() {
    $('input[type="checkbox"]').click(function () {
        alert("cjimg");
        var id = $(this).attr('data-id');
        var name = $(this).attr('data-name');
          
        if ($(this).is(":checked")) {
            Swal.fire({
                title: name + ' đã trả đồ dùng hay chưa?',
                text: "Bạn sẽ không thể hoàn tác lại thao tác này !",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đã Trả!',

            }).then((result) => {
                if (result.value) {

                    $.ajax({
                        url: "/ResourcesManagement/Give",
                        type: "POST",
                        dataType: "json",
                        data: {
                            id: id,
                        },
                        beforeSend: function () {


                        },

                        success: function (res) {
                            SchoolCommonJS.getDataFillter('data', 'ResoucesManagement/ListHistory', 'get-data')
                        },
                        error: function () {

                        },
                        complete: function () {

                        }
                    })
                    Swal.fire(
                        'Đồng Ý!',
                        'Bạn vừa thay đổi thành công !',
                        'Thành Công'
                    )
                }
                else {
                    SchoolCommonJS.getDataFillter('data', 'ResoucesManagement/ListHistory', 'get-data')
                }

            })
        }
    });
}

//var data = {
//    pageNumber: 1,
//    pageSize: 5,
//    search: '',
//    Status: -1,
//}
//var id = 0;
//var search = "";
//var pageSize = 5;
//var pageNumber = 1;
//var status = -1;
//GetListHistory();
//GetCreate();
//Delete();
//SearchStatus();
//Search();
//function GetListHistory() {
//    $.ajax({
//        url: "/ResourcesManagement/ListHistory",
//        type: "post",
//        dataType: "html",
//        data: {
//            search: search,
//            pageNumber: pageNumber,
//            pageSize: pageSize,
//            Status: status,
//        },
//        beforeSend: function () {
//        },

//        success: function (res) {
//            $('.history').html('');
//            $('.history').append(res);
//            Update();

//            Detail();
//            Pagination();
//            GetCreate();
//        },
//        error: function () {

//        },
//        complete: function () {

//        }
//    })
//}

//function Create() {

//    $('.create-success').click(function () {
//        var LecturerID = $('.add-or-edit #lecturerid').val();
//        var ResourcesID = $('.add-or-edit #resourcesid').val();
//        var Node = $('.add-or-edit input[name ="Node"]').val();
//        var Status = $('.add-or-edit #status').val();
//        if (CheckError(LecturerID, ResourcesID, Status) == true) {
//            $.ajax({
//                url: "/ResourcesManagement/Create",
//                type: "POST",
//                dataType: "json",
//                data: {
//                    LecturerID: LecturerID,
//                    ResourcesID: ResourcesID,
//                    Node: Node,
//                    Status: Status
//                },
//                beforeSend: function () {


//                },

//                success: function (res) {
//                    GetListHistory();
//                    DefaultValue();
//                },
//                error: function () {

//                },
//                complete: function () {

//                }
//            })
//        }

//    })
//}

//function Delete() {
//    $('.btn-remove-list').click(function () {
//        Swal.fire({
//            title: 'Are you sure?',
//            text: "You won't be able to revert this!",
//            icon: 'warning',
//            showCancelButton: true,
//            confirmButtonColor: '#3085d6',
//            cancelButtonColor: '#d33',
//            confirmButtonText: 'Yes, delete it!'
//        }).then((result) => {
//            if (result.value) {
//                $.ajax({
//                    url: "/ResourcesManagement/Delete",
//                    type: "POST",
//                    dataType: "json",
//                    data: {
//                    },
//                    beforeSend: function () {


//                    },

//                    success: function (res) {
//                        GetListHistory();
//                    },
//                    error: function () {

//                    },
//                    complete: function () {

//                    }
//                })
//                Swal.fire(
//                    'Deleted!',
//                    'Your file has been deleted.',
//                    'success'
//                )
//            }
//        })

//    })
//}

//function DefaultValue() {
//    $('.add-or-edit #lecturerid').val('');
//    $('.add-or-edit #resourcesid').val('');
//    $('.add-or-edit input[name ="Node"]').val('');
//    $('.add-or-edit #status').val('');
//}


//function Search() {
//    $('input[name="search"]').keyup(function () {
//        search = $(this).val();
//        GetListHistory();
//    })
//}

//function Pagination() {
//    $('.pagination button').click(function () {
//        pageNumber = $(this).attr('data-page');
//        GetListHistory();
//    })
//}

//function SearchStatus() {
//    $('.statusID').change(function () {

//        status = $(this).val();
//        GetListHistory();

//    })
//}

//function CheckError(LecturerID, ResourceID, Status) {
//    if (LecturerID == null || ResourceID == null || Status == null) {
//        $('.error').html('');
//        $('.add-or-edit select').each(function () {
//            if ($(this).val() == null) {
//                var name = $(this).siblings('label').text();
//                var row = `<p> ${name} không được để trống<p>`;
//                $(this).siblings('.error').append(row);
//            }
//        })
//        return false;
//    }
//    else {
//        $('.error').html('');
//        return true;
//    }

//}

//function Detail() {
//    $('.data-name').click(function () {

//        var id = $(this).attr('data-id');
//        $.ajax({
//            url: "/resourcesmanagement/Detail",
//            type: "get",
//            datatype: "html",
//            data: {
//                id: id
//            },
//            beforesend: function () {
//            },

//            success: function (res) {
//                $('.modal-body').html('');
//                $('.modal-body').append(res);

//            },
//            error: function () {

//            },
//            complete: function () {

//            }
//        })
//    })
//}



//function GetCreate() {
//    $('.btn-create').click(function () {
//        $.ajax({
//            url: "/resourcesmanagement/FormCreateEdit",
//            type: "get",
//            datatype: "html",
//            data: {
//            },
//            beforesend: function () {
//            },

//            success: function (res) {
//                $('.modal-body').html('');
//                $('.modal-body').append(res);

//                Create();
//                DefaultValue();

//            },
//            error: function () {

//            },
//            complete: function () {

//            }
//        })
//    })
//}
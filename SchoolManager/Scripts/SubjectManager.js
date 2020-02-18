$(document).ready(function () {
    var id = 0;
    var pageNumber = 1;
    var pageSize = 5;
    var search = "";
    GetListSubject();
    Create();
    EditClick();
    Update();
    Delete();
    Pagination();
    Search();
    
    function GetListSubject() {
        $.ajax({
            url: "/Subject/Listsubject",
            type: "POST",
            dataType: "html",
            data: {
                pageSize: pageSize,
                pageNumber: pageNumber,
                search: search,
                
            },
            beforSend: function () {

            },
            success: function (res) {
                $('.list-subject').html('');
                $('.list-subject').append(res);
                EditClick();
                DefaultValue();
                Pagination();
                Delete();
                GetInfo();
            },
            error: function () {

            },
            complete: function () {

            }
        })
    }

    function Create() {
        $('.btn-create').click(function () {
            var Name = $('.add-or-edit input[name="Name"]').val();
            var Node = $('.add-or-edit input[name="Node"]').val();
           
            var Status = $('.add-or-edit .status').val();

            if (CheckError(Name, Node, Status)) {
                $.ajax({
                    url: "/Subject/Create",
                    type: "Post",
                    dataType: "Json",
                    data: {
                        Name: Name,
                        Node: Node,
                     
                        Status: Status,
                    },
                    beforSend: function () {

                    },
                    success: function (res) {
                        GetListSubject();
                    },
                    error: function () {

                    },
                    complete: function () {

                    }
                })
            }
            

        })
    }

    function EditClick() {
        $('.btn-edit').click(function () {
            id = $(this).attr('data-id');
            var name = $(this).attr('data-name');
            var node = $(this).attr('data-node');
            
            
            var status = $(this).attr('data-status');


            $('.add-or-edit input[name="Name"]').val(name);
            $('.add-or-edit input[name="Node"]').val(node);
           
            
            $('.add-or-edit .status').val(status);
        })
    }

    function Update() {
        $('.btn-update').click(function () {
            var Name = $('.add-or-edit input[name="Name"]').val();
            var Node = $('.add-or-edit input[name="Node"]').val();
           
            var Status = $('.add-or-edit .status').val();

            $.ajax({
                url: "/Subject/Update",
                type: "Post",
                dataType: "Json",
                data: {
                    id : id,
                    Name: Name,
                    Node: Node,
                    
                    Status: Status,
                },
                beforSend: function () {

                },
                success: function (res) {
                    GetListSubject();
                },
                error: function () {

                },
                complete: function () {

                }
            })
        })
    }

    function Delete() {
        $('.btn-delete').click(function () {
            var id = $(this).attr('data-id');
            $.ajax({
                url: "/Subject/Delete",
                type: "Post",
                dataType: "Json",
                data: {
                    id: id,
                    
                },
                beforSend: function () {

                },
                success: function (res) {
                    GetListSubject();
                },
                error: function () {

                },
                complete: function () {

                }
            })
        })
    }
    function DefaultValue() {
        $('.add-or-edit input[name="Name"]').val('');
        $('.add-or-edit input[name="Node"]').val('');
        $('.add-or-edit input[name="Status"]').val('');
        $('.error').html(''); 

    }
    
    function Pagination() {
        $('.pagination button').click(function () {
            pageNumber = $(this).attr('data-page');
            GetListSubject();
        })
    }
    
    function Search() {
        $('input[name="searchname"]').keyup(function () {
            search = $(this).val();
            GetListSubject();
        })
    }

    GetInfo();
    function GetInfo() {
        $('.btn-detail').click(function () {
            
            var id = $(this).attr('data-id');
            $.ajax({
                url: "/Subject/DetailInfo",
                type: "get",
                dataType: "html",
                data: {
                    id: id,

                },
                beforSend: function () {

                },
                success: function (res) {
                    $('.modal-body').html('');
                    $('.modal-body').append(res);
                },
                error: function () {

                },
                complete: function () {

                }
            })
        })
    }
    
    function CheckError(name, node, status) {
        if (name.trim() == '' || node.trim() == ''  || status.trim() == '') {
            $('.error').html('');
            $('.add-or-edit input').each(function () {
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
})
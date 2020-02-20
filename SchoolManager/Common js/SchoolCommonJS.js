var SchoolCommonJS = {
    getFormData: function (idForm) {
        var unindexed_array = $('#' + idForm).serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
    },
    getByIdDataJson: function (id, url) { 
        let data;  
        $.ajax({
            async:false,
            url: url,
            type: "GET",
            dataType: 'json',
            data: {
                id: id
            },
            beforeSend: function () {

            },
            success: function (res) {
                data = res;
            },
            error: function () {

            },
            complete: function () {

            }
        });
        return data;
    }, 
    getDataFillter: function (condition,url , classAppend ) {
        $.ajax({
            url: url,
            type: "POST",
            contentType: 'application/json',
            dataType: "html",
            data: JSON.stringify(condition),
            beforeSend: function () {
            },
            success: function (res) {
                $('.' + classAppend + '').html('');
                $('.' + classAppend+'').append(res); 
            },
            error: function () {

            },
            complete: function () {

            }
        })
    },
    AddOrEdit: function (idForm, url_add, condition, url_getList, classAppend) {
        let data = SchoolCommonJS.getFormData(idForm);  
        $.ajax({
            url: url_add,
            type: 'POST',
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify(data),
            beforeSend: function () {

            },
            success: function (res) {
                if (res) {
                    SchoolCommonJS.getDataFillter(condition, url_getList, classAppend);  
                    
                }
            },
            error: function () {

            },
            complete: function () {

            }
        })
    },
    Delete: function (id, url_delete, condition, url_getList, classAppend) {
        Swal.fire({
            title: 'Bạn có muốn xóa không',
            text: "Lưu ý: Dữ liệu sẽ bị mất khi xóa!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: url_delete,
                    type: 'POST',
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
                                title: 'Xóa thành công',
                                showConfirmButton: false,
                                timer: 1000
                            })
                            SchoolCommonJS.getDataFillter(condition, url_getList, classAppend);

                        }
                    },
                    error: function () {

                    },
                    complete: function () {

                    }
                })
            }
        })
       
    }, 
    setDataOnForm: function (id, url , classAppend) {
        $.ajax({
            url: url,
            type: "POST",
            dataType: "html",
            data: {
                id: id
            },
            beforeSend: function () {
            },
            success: function (res) {
                $('.' + classAppend + '').html('');
                $('.' + classAppend + '').append(res);
            },
            error: function () {

            },
            complete: function () {

            }
        })
    },
    convertObjToArray: function (obj) {
        return Object.keys(obj).map(function (key) {
            return [key.toLowerCase(), obj[key]]
        })
    }
    
}
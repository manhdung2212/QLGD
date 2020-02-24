function FillByStatus(url, classAppend) {
    $('.searchStatus').change(function () {
        data.Status = $(this).val();
        SchoolCommonJS.getDataFillter(data, url, classAppend); 
    })
}
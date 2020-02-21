

function FillterBySubject(url,classAppend) {
    $('.subjectID').change(function () {
        data.subjectID = $(this).val();
        
        SchoolCommonJS.getDataFillter(data, url, classAppend);
    })
}
function Searchcode(url, classAppend) {
    $('input[name="searchcode"]').keyup(function () {
        data.searchcode = $(this).val();
        
        SchoolCommonJS.getDataFillter(data, url, classAppend);
    })
}


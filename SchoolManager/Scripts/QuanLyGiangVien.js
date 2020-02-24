

function FilterBySubject( url  ,classAppend) {
   
    $('.subjectID').change(function () {
        data.subjectID = $(this).val();
        SchoolCommonJS.getDataFillter(data, url, classAppend);
    });
}
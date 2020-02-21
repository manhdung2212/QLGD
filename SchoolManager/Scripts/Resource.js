


function Searchstatus(url, classAppend) {
    $('.status').change(function () {
        data.searchstatus = $(this).val();
        SchoolCommonJS.getDataFillter(data, url, classAppend);
    })

}
function FillerBuild(url, classAppend) {
    $('.IDbuildorroom').change(function () {
        data.idbuildorroom = $(this).val();
        SchoolCommonJS.getDataFillter(data, url, classAppend);
    })
}


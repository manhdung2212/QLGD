


var data = {
    pageNumber: 1,  
    pageSize: 5, 
    search: ''
}
function GetListStudent(url, classAppend) {
    SchoolCommonJS.getDataFillter(data, url, classAppend);
}
function Pagination(pageNumber, url, classAppend) {
    data.pageNumber = pageNumber;  
    SchoolCommonJS.getDataFillter(data, url, classAppend); 

}
function Delete(id, url_delete, url_getList, classAppend) {
    SchoolCommonJS.Delete(id, url_delete, data, url_getList, classAppend);
}
function Search(url, classAppend) {
    $('input[name="searchname"]').keyup(function () {
        data.search = $(this).val();
        SchoolCommonJS.getDataFillter(data, url, classAppend);
    })
     
}
function EditClick(id, url, classAppend) {
    SchoolCommonJS.setDataOnForm(id, url, classAppend); 
}
function AddClick(id, url, classAppend) {
    SchoolCommonJS.setDataOnForm(id, url, classAppend);
}
function AddOrEdit(idForm, url_add, url_getList, classAppend) {
    SchoolCommonJS.AddOrEdit(idForm, url_add, data, url_getList, classAppend);  
}
function DefaultValueInput() {
    $('.add-or-edit input ').each(function () {
        $(this).val(''); 

    })
    $('input[name="id"]').val(0); 
}
function GetByID(id, url, classAppend) {
    SchoolCommonJS.getById(id, url, classAppend); 
}
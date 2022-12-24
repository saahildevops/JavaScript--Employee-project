
const userData = [
    {id:1, name:"john", age:18, profession:"developer"},
    {id:2, name:"jack", age:20, profession:"developer"},
    {id:3, name:"karen", age:19, profession:"admin"}
];

var userobj = userData;
function filteruserData(profession){
    let data = userobj;
    if(profession!=''){
        data = userobj.filter(user => user.profession.toLowerCase() === profession.toLowerCase());
    }
    return data;
}


function getFilterProfessionJson(action){
    let inputStr = document.getElementById("profession").value;
    if( (inputStr=="" && action=="filter" ) ){
        alert("Please select a profession before clicking the button.");
        document.getElementById("profession").focus();
        return false;
    }

    let filterObjs = filteruserData(inputStr); 
    console.log(filterObjs);
    let text="<table>"; 
    for(var i=0; i<filterObjs.length; i++){
        let sno = i+1;
        text+='<tr class="data_row">';
        text+='<td class="data_column">'+sno+'.</td>';
        text+='<td id="column_name" class="data_column">Name:'+capitalize(filterObjs[i].name)+'</td>';
        text+='<td id="column_profession" class="data_column">Profession:'+capitalize(filterObjs[i].profession)+'</td>';
        text+='<td class="data_column">Age:'+filterObjs[i].age+'</td>';
        text+='</tr>';
    } 
   text=="</table>"; 
if(filterObjs.length===0) {
    document.getElementById("filter_data_div").innerHTML='<div id="filter_data"><div><h3>No user data found.</h3></div></div>';
}else
    document.getElementById("filter_data_div").innerHTML=text;

}

function capitalize(string)
{
    return string[0].toUpperCase() + string.slice(1);
}

window.onload=function(){   
    getProfessions();
    getFilterProfessionJson('');
}

function getProfessions(){
    $('#profession option:gt(0)').remove();
    let uniqueUserobj = [];
    for(let i=0; i<userobj.length; i++){
        let unique = true;
        for (let j = 0, k = uniqueUserobj.length; j < k; j++) {
            if ((userobj[i].profession === uniqueUserobj[j].profession)) {
                unique = false;
            }
        }
        if (unique) {
            uniqueUserobj.push(userobj[i]);
            var option = document.createElement("option");
             option.text = capitalize(userobj[i].profession);
             option.value = userobj[i].profession.toLowerCase();
             var daySelect = document.getElementById('profession');
             daySelect.appendChild(option);
        }
    }
}

function addNewUserData() {
    let form = $('form').serializeArray();
    const newUserData = convertFormToJSON(form);
    userobj.push(newUserData);
    console.log(userobj);
    getProfessions();
    getFilterProfessionJson('');
    $("#new_user_add_status").removeClass("displayNone");
    return false;
}

function convertFormToJSON(form) {
    const json = {};
    $.each(form, function () {
      json[this.name] = this.value || "";
    });
    return json;
  }
let path = 'file:///home/tigeen/dinoTask/subs_project/Front-End/subs-frontend/'
let serverReqPath = 'http://127.0.0.1:3007'
let object = [];
let table = document.querySelector("#table")
let tbody = document.querySelector("#tbody")
let clientLicenseObject = [];
let clientSubscriptionObject = [];
let clSubsObject = [];
var licenseTable = document.querySelector("#licenseTable")
var ltbody = document.querySelector("#ltbody")
var clSubsDetail = document.querySelector("#count-clsubs-p")
var div=document.getElementById("listclient")
var clientDiv=document.getElementById("createClient")
var body=document.getElementById("indexBody")
var listLicense=document.getElementById("list-license")
var clSubsDiv=document.getElementById("clsubs-div")
var span = document.getElementsByClassName("close")[0];
var modal = document.getElementsByClassName("modal")
var makeSubsDiv=document.getElementById("make-subscription");
var editSubsDiv=document.getElementById("edit-subscription");
var licensedetail=document.getElementById("license-details");
var licenseTableDiv=document.getElementById("list-license");
var licenseDropdown=document.getElementById("license-list");
var elicenseDropdown=document.getElementById("elicense-list");
let index = 0
let tdIndex

let licenseCount = 0
var noOfSubs = document.createElement("p")

let warning=document.getElementById("warning-div");

let isLicenseLoaded = false


var clientId
var clientName
var subscriptionId
let API
var licenseId
let lname
let type
let expireMonth
let renewalEndDay

let startDate
let endDate
let noofUsers
let serverStatus

var clSbsCount = 0
let sessionLogStatus = 0
var sno = 0
let licenseloadSts = 0
function pageLoad(){
    sessionLogStatus =  sessionStorage.getItem('loginstatus')
    if(sessionLogStatus == 1){
        $.ajax({
            url: `${serverReqPath}/`
        })
        .done(function( data ) {
            console.log(data)
            object =  data.result
            listTable()
            showClientlist();
        })
        .catch(function(res){
            if(res.status == 501){
                document.getElementById("server-msg").style.display = "block";
                document.getElementById("server-status").innerHTML = `*SERVER IS DOWN....message: ${res.responseJSON.message}`
            }
        })
        if(licenseloadSts == 0 ){
            licenseLoad(0,0);
        }
        licenseloadSts = 1
    }
    else{
        window.location.replace(`${path}/signin.html`)
    }
}

//list client script
function listTable(){
    tbody.innerHTML=''
    for (let data of object ) {
        sno = sno+1
        add_Datatable(data.__kp__clientid__lsan,data.company_name,data.contact_person,data.file_names,data.email)
    }
}
function add_Datatable(tcol1, tcol2,tcol3,tcol4,tcol5) { 
    let col1 = document.createTextNode(sno)
    let col2 = document.createTextNode(tcol2)
    let col3 = document.createTextNode(tcol3)
    let col4 = document.createTextNode(tcol4)
    let col5 = document.createTextNode(tcol5)
    let addN = document.createTextNode("  Add new")
    
    let td = document.createElement("td")
    td.setAttribute("data-index", index)
    let td1 = document.createElement("td")
    let td2 = document.createElement("td")
    let td3 = document.createElement("td")
    let td4 = document.createElement("td")
    let td5 = document.createElement("td")
    let td6 = document.createElement("td")
    let td7 = document.createElement("td")
    let btn = document.createElement("button")
    td1.setAttribute("style","text-align: center;")
    let addNewBtn = document.createElement("i")
    addNewBtn.setAttribute("class"," fa-solid fa-square-plus")
    // btn.setAttribute("value", "add new")
    // btn.setAttribute("type", "button")
    btn.setAttribute("class", "button")
    btn.setAttribute("style","position: relative;height:3vh;")
    btn.addEventListener("click", () => {
        clientId=tcol1
        tdIndex = td.dataset.index
        makeSubscriptionDiv(td)
    })
    index++;

    var collapseval=1
    let collapseBtn = document.createElement("i")
    collapseBtn.addEventListener("click", () => {
        clientName = tcol3
        var content = tr1;
        // if (content.style.display == "table-row"){
        //     content.style.display = "none"
        // }
        if (content.style.display == "none"){
            collapseBtn.setAttribute("class","fa-solid fa-chevron-down")
            content.style.display = "table-row"
        }
        else{
            collapseBtn.setAttribute("class","fa-solid fa-chevron-right")
            content.style.display = "none"
        }
    })
    collapseBtn.setAttribute("class","fa-solid fa-chevron-right")
    collapseBtn.setAttribute("style","margin-right:2vh;")

    let tr = document.createElement("tr")
    let tr1 = document.createElement("tr")
    tr1.setAttribute("style", "display: none")
    
    td2.appendChild(collapseBtn)
    td1.appendChild(col1)
    td2.appendChild(col2)
    td3.appendChild(col3)
    td4.appendChild(col4)
    td5.appendChild(col5)
    
    btn.appendChild(addNewBtn)
    btn.appendChild(addN)
    td6.appendChild(btn)
    // td7.appendChild(viewBtn)
    // tr.appendChild(td7)
    // tr.appendChild(td7)
    // tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)
    // td.appendChild(noOfSubs)
    clientId=tcol1
    subsNo = 0

    tbody.appendChild(tr)
    table.appendChild(tbody)
    td.setAttribute("id", "subscription")
    clSubscriptionLoad(td)
    td.setAttribute("colspan","5")
    tr1.appendChild(td)
    tbody.appendChild(tr1)
    table.appendChild(tbody)
}
function showClientlist()
{
    var clist=document.getElementById("clist-button");
    var ccreate=document.getElementById("clcreate-button");
    if(div.style.display === "none")
    {
        div.style.display = "block";
        clientDiv.style.display = "none";
        listLicense.style.display = "none";
    }
}

//create client script


function createClientDiv(){
    if(clientDiv.style.display === "none")
    {   nameRequire=document.getElementById('nameRequire')
        clientDiv.style.display = "block";
        nameRequire.style.display = "none";
        document.getElementById('cnameRequire').style.display = "none";
        document.getElementById('fileRequire').style.display = "none";
        document.getElementById('mailRequire').style.display = "none";
        document.getElementById('emailRequire').style.display = "none";
        listLicense.style.display = "none";
    }
    else{
        clientDiv.style.display = "none";
        body.style.background = "white";
    }
}
function cancelCreateClient(){
    clientDiv.style.display = "none";
    body.style.background = "white";
    let companyName=document.getElementById('companyName')
    let Email=document.getElementById('Email')
    let Name=document.getElementById('Name')
    let fileName = document.getElementById('fileName')

    companyName.value='';
    Email.value='';
    Name.value='';
    fileName.value='';

    document.getElementById('nameRequire').style.display = "none";
    document.getElementById('cnameRequire').style.display = "none";
    document.getElementById('fileRequire').style.display = "none";
    document.getElementById('mailRequire').style.display = "none";
    document.getElementById('emailRequire').style.display = "none";
}
function nullEntryCreateClient(){

    let companyName=document.getElementById('companyName')
    let Email=document.getElementById('Email')
    let Name=document.getElementById('Name')
    let fileName = document.getElementById('fileName')
    let API = document.getElementById('API')

    API.value='';

}
function makeApi(){
    API = ''
    let characters = 'QWERTYUIOPASDFGHJKLZXCVBNM0123456789'
    let charlength = characters.length
    let length
    for(var i=0;i<3;i++){
        length = i==0 ? 12 : 3
        for(var j=0; j<length;j++){
            API += characters.charAt(Math.floor(Math.random()*charlength)) 
        }
        API += i<2 ? '-' : ''
    }
}
function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex)) {

    //   alert("Valid email address!");

    //   document.form1.text1.focus();
        document.getElementById('emailRequire').style.display = "none";
        return 1;

    } else {

    //   alert("Invalid email address!");

    //   document.form1.text1.focus();
        document.getElementById('emailRequire').style.display = "block";
        return 0;

    }

}
function createClient(){
        body.style.background = "white";
        let companyName=document.getElementById('companyName').value
        let Email=document.getElementById('Email').value
        let Name=document.getElementById('Name').value
        let fileName=document.getElementById('fileName').value
        let emailValidate;

        if(companyName==''){
        document.getElementById('cnameRequire').style.display = "block";
        }
        else{
            document.getElementById('cnameRequire').style.display = "none";
        }
        if(Email==''){
            document.getElementById('mailRequire').style.display = "block";
        }
        else{
            document.getElementById('mailRequire').style.display = "none";
        }
        if(Name==''){
            document.getElementById('nameRequire').style.display = "block";
        }
        else{
            document.getElementById('nameRequire').style.display = "none";
        }
        if(fileName==''){
            document.getElementById('fileRequire').style.display = "block";
        }
        else{
            document.getElementById('fileRequire').style.display = "none";
        }
        emailValidate = ValidateEmail(Email)
        let data = {
            companyName,
            Email,
            Name, 
            fileName
        }
        if(emailValidate == 1 && companyName!="" && Email!="" && Name!="" && fileName!="" && API!=""){
            axios.post(`${serverReqPath}/insert-user`, data)
                .then(function(response){
                    let insertstatus = response.data.status
                    if(insertstatus){
                        companyName.value='';
                        Email.value='';
                        Name.value='';
                        fileName.value='';                        
                        pageLoad()
                        cancelCreateClient()
                        
                    }
                    else if(!insertstatus){
                        nullEntryCreateClient()
                    }
                }
            ).catch(function(res){
                if(res.response.status == 501){
                    document.getElementById("server-msg").style.display = "block";
                    document.getElementById("server-status").innerHTML = `*SERVER IS DOWN....message: `
                    document.getElementById("server-status").innerHTML = `*SERVER IS DOWN....message: ${res.responseJSON.message}`
                }
            });
        }
}
span.onclick = function(){
    clientDiv.style.display = "none";
    body.style.background = "white";
    let companyName=document.getElementById('companyName')
    let Email=document.getElementById('Email')
    let Name=document.getElementById('Name')
    let fileName=document.getElementById('fileName')
    let API=document.getElementById('API')

    companyName.value='';
    Email.value='';
    Name.value='';
    fileName='';
    API='';
    document.getElementById('nameRequire').style.display = "none";
    document.getElementById('cnameRequire').style.display = "none";
    document.getElementById('fileRequire').style.display = "none";
    document.getElementById('mailRequire').style.display = "none";
    document.getElementById('emailRequire').style.display = "none";
} 

//login script
function signLoad(){
    sessionLogStatus = sessionStorage.getItem('loginstatus')
    if(sessionLogStatus==1){
        window.location.replace(`${path}/index.html`)
    }
    document.getElementById('logstatus').style.display = "none";
}
function signIn(){
    
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    if(username ==''){
        warning.style.display="block";
        document.getElementById('logstatus').style.display = "block";
        document.getElementById('logstatus').innerHTML="  *please fill out username field";
    }
    if(password ==''){
        warning.style.display="block";
        document.getElementById('logstatus').style.display = "block";
        document.getElementById('logstatus').innerHTML="  *please fill out password field";
    }
    if(username =='' && password ==''){
        warning.style.display="block";
        document.getElementById('logstatus').style.display = "block";
        document.getElementById('logstatus').innerHTML="*please fill out username and password field";
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    if(username !='' && password !=''){
        let data ={
            username, 
            password
        }
        axios.post(`${serverReqPath}/admin-user`, data)
        .then(function(response){
            let loginstatus = response.data.message
            if(loginstatus == "login successfully"){
                warning.style.display="none";
                sessionStorage.setItem('loginstatus','1')
                window.location.replace(`${path}/index.html`)
            }
            warning.style.display="block";
            if(loginstatus == "user doesn't exist"){
                document.getElementById('logstatus').style.display = "block";
                document.getElementById('logstatus').innerHTML="*User doesn't exist";
            }else if(loginstatus=="possword is incorrect"){
                document.getElementById('logstatus').style.display = "block";
                document.getElementById('logstatus').innerHTML="*Password is wrong";
            }
        })
        .catch(function(res){
            if(res.response.status == 501){
                document.getElementById("server-msg").style.display = "block";
                console.log(res)
                document.getElementById("server-status").innerHTML = `*SERVER IS DOWN....message: ${res.response.data.message}`
            }
        })
    }
    
}
function logOut(){
    sessionStorage.setItem('loginstatus','0')
    window.location.replace(`${path}/signin.html`)
}         

//make subscription script
function makeSubscriptionDiv(td){
    tdIndex=td
    if(makeSubsDiv.style.display === "none")
    {
        makeSubsDiv.style.display = "block";
        licenseTableDiv.style.display = "none";
    }
    else{
        
        makeSubsDiv.style.display = "none";
    }
}
function closeSubsDiv(){
    makeSubsDiv.style.display = "none";
    document.querySelector('#startDateRequire').style.display = "none";
    document.querySelector('#endDateRequire').style.display = "none";
    document.querySelector('#noOfUsersRequire').style.display = "none";
    clientId='';
    licenseId = '';
    lname = '';
    type = '';
    expireMonth = '';
    renewalEndDay = '';
    nullEntryMakeSubs()
}
function cancelmakesubs(){
    closeSubsDiv()
}
function listDownArrow(){
    if(licenseTableDiv.style.display === "none")
    {
        licenseTableDiv.style.display = "block";
    }
    else{
        licenseTableDiv.style.display = "none";
    }
}
function licenseLoad(forEdit,lid){
    $.ajax({
        url: `${serverReqPath}/all-license`
    })
    .done(function( data ) {
        clientLicenseObject =  data.result
        licensTable(forEdit,lid)
    }).catch(function(res){
        if(res.status == 501){
            document.getElementById("server-msg").style.display = "block";
            document.getElementById("server-status").innerHTML = `*SERVER IS DOWN....message: ${res.responseJSON.message}`
        }
    });
}
function licensTable(forEdit,lid){
    for (let data of clientLicenseObject ) {
        showLicenseTable(forEdit,lid,data.__kp__licenseid__lsan,data.name,data.type,data.expire_month,data.renewal_n_day,data.version)
    }
    
}
function showLicenseTable(forEdit,lid,tcol1,tcol2,tcol3,tcol4,tcol5,tcol6){
    let tcol11="  "
    let col1 = document.createTextNode(tcol11)
    let col2 = document.createTextNode(tcol2)
    let col3 = document.createTextNode(tcol3)
    let col4 = document.createTextNode(tcol4)
    let col5 = document.createTextNode(tcol5)
    let col6 = document.createTextNode(tcol6)
    let opt = document.createElement("option")
    opt.setAttribute("value", tcol1)
    if(tcol1 === lid){
        opt.setAttribute("selected", true)
    }
    opt.appendChild(col2);
    opt.appendChild(col1);
    opt.appendChild(col6);
    if(forEdit){
        elicenseDropdown.appendChild(opt)
    }
    else{
        licenseDropdown.appendChild(opt)
    }
}
function licenseData(d1,d2,d3,d4,d5){
    licenseId = d1
    lname = d2
    type = d3
    expireMonth = d4
    renewalEndDay = d5
}
function cancelClientLicense(){
    licenseTable.removeChild(ltbody)
}
function nullEntryMakeSubs(){
    startDate=document.getElementById('start-date');
    endDate=document.getElementById("end-date");
    noofUsers=document.getElementById('no-users');
    serverStatus=document.getElementById("is-server");

    clientId.value='';
    licenseId.value = '';
    startDate.value = '';
    endDate.value = '';
    noofUsers.value = '';
    serverStatus.checked  = false;
}
function createSubscription(){
    startDate=document.getElementById('start-date').value;
    endDate=document.getElementById("end-date").value;
    noofUsers=document.getElementById('no-users').value;
    serverStatus=document.getElementById("is-server");
    let server 
    if(serverStatus.checked == true){
        server=1
    }
    else{
        server=0
    }
    licenseId=document.getElementById("license-list").value;
    if(startDate==''){
        document.querySelector('#startDateRequire').style.display = "block";
    }
    else{
        document.querySelector('#startDateRequire').style.display = "none";
    }
    if(endDate==''){
        document.querySelector('#endDateRequire').style.display = "block";
    }
    else{
        document.querySelector('#endDateRequire').style.display = "none";
    }
    if(noofUsers==''){
        document.querySelector('#noOfUsersRequire').style.display = "block";
    }
    else{
        document.querySelector('#noOfUsersRequire').style.display = "none";
    }
    let data = {
        clientId,
        licenseId,
        startDate,
        endDate,
        noofUsers, 
        server 
    }
    if( startDate!="" && endDate!="" && noofUsers!=""){
        axios.post(`${serverReqPath}/make-subs`, data)
                .then(function(response){
                let insertstatus = response.data.status
                if(insertstatus){
                    let tdArray = document.querySelectorAll("#subscription")
                    // clSubscriptionLoad(tdArray[tdIndex])
                    clSubscriptionLoad(tdIndex)
                    nullEntryMakeSubs()
                    closeSubsDiv()
                }
            }
        ).catch(function(res){
            if(res.response.status == 501){
                document.getElementById("server-msg").style.display = "block";
                document.getElementById("server-status").innerHTML = `*SERVER IS DOWN....message: ${res.responseJSON.message}`
            }
        });
    }
}

// view client subscription
var countt =0
function closeClSubsDiv(){
    clientName = '';
    licenseId = '';
    clSbsCount = 0
    clientId = 2
    if(countt){
        clSubscriptionLoad()
    }
    else{
        clSubsTable.removeChild(clSubsTbody)
    }
    countt = countt+1
}

function clSubscriptionLoad(td){
    var clSubsTable = document.createElement("table")
    var clSubsTHead = document.createElement("thead")
    var clSubsTbody = document.createElement("tbody")
    
    clSubsTable.setAttribute("style","width:100%;")
    let headTr = document.createElement("tr")
    let headTh1 = document.createElement("th")
    let headTh2 = document.createElement("th")
    let headTh3 = document.createElement("th")
    let headTh4 = document.createElement("th")
    let headTh5 = document.createElement("th")

    headTh1.appendChild(document.createTextNode("Version"))
    headTh2.appendChild(document.createTextNode("Type"))
    headTh3.appendChild(document.createTextNode("Start Date"))
    headTh4.appendChild(document.createTextNode("End Date"))
    headTh5.appendChild(document.createTextNode(""))
    
    headTr.appendChild(headTh1)
    headTr.appendChild(headTh2)
    headTr.appendChild(headTh3)
    headTr.appendChild(headTh4)
    headTr.appendChild(headTh5)
    
    clSubsTHead.appendChild(headTr)
    let data = {
        "clientId" : clientId
    }
    
    axios.post(`${serverReqPath}/view-subs`, data)
        .then(function(res) {
            clientSubscriptionObject = res.data.result
            let sernoSize = clientSubscriptionObject.length
            let objIndexNo=0
            if(sernoSize > 0){
                clSubsTable.appendChild(clSubsTHead)
                for (let data of clientSubscriptionObject ) {
                    if(data==clientSubscriptionObject[0]){
                        objIndexNo = 1
                    }
                    showClSubsTable(data.__kp__subsid__lsan,data._kf__clientid__lsxn,data._kf__licenseid__lsxn,data.start_date,data.end_date,data.no_of_user,data.is_server,data.license.name, data.license.version,data.license.type, clSubsTbody, clSubsTable, td,sernoSize,objIndexNo)
                    objIndexNo = 0
                    clSbsCount += 1
                }
            }else{
                let h1 = document.createElement("h1")
                h1.textContent = "No Subscriptions"
                clSubsTbody.appendChild(h1)
                clSubsTable.appendChild(clSubsTbody)
                td.appendChild(clSubsTable)
            }
        }).catch(function(res){
            if(res.response.status == 501){
                document.getElementById("server-msg").style.display = "block";
                document.getElementById("server-status").innerHTML = `*SERVER IS DOWN....message: ${res.responseJSON.message}`
            }
        })
}
function showClSubsTable(sid,cid,lid,startDate,endDate,noOfUsers,server,tcol1,tcol2,tcol3, clSubsTbody, clSubsTable, td,sernoSize,objIndexNo){
    subsNo++
    td.innerHTML = ''
    let col1 = document.createTextNode(dateFormat(date(startDate),'dd-MM-yyyy'))
    let col2 = document.createTextNode(dateFormat(date(endDate),'dd-MM-yyyy'))
    let col3 = document.createTextNode(tcol2)
    let col4 = document.createTextNode(tcol3)
    if (sernoSize <= subsNo) {
    subsNo=0  
    }
    let td1 = document.createElement("td")
    let td2 = document.createElement("td")
    let td3 = document.createElement("td")
    let td4 = document.createElement("td")
    let td5 = document.createElement("td")
    let tr = document.createElement("tr")

    td5.setAttribute("style","text-align: center;")
    let editBtn = document.createElement("button")
    let editIcon = document.createElement("i")
    let edit = document.createTextNode("  Edit")
    editIcon.setAttribute("class","fa-solid fa-pen-to-square")
    editBtn.setAttribute("class","button")
    editBtn.addEventListener("click", () => {
        editSubsModal()
        editSubs(sid,cid,lid,startDate,endDate,noOfUsers,server,td)
    })
    editBtn.appendChild(editIcon)
    editBtn.appendChild(edit)

    td1.appendChild(col3)
    td2.appendChild(col4)
    td3.appendChild(col1)
    td4.appendChild(col2)
    td5.appendChild(editBtn)
    
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    if(objIndexNo==1){
        tr.appendChild(td5)
    }
    clSubsTbody.appendChild(tr)
    clSubsTable.appendChild(clSubsTbody)
    td.appendChild(clSubsTable)
}

//edit suubscription

function editSubsModal(){
    if(editSubsDiv.style.display === "none")
    {
        editSubsDiv.style.display = "block";
    }
    else{
        
        editSubsDiv.style.display = "none";
    }
}
function closeEditSubsModal(){
    editSubsDiv.style.display = "none";
    document.querySelector('#eStartDateRequire').style.display = "none";
    document.querySelector('#eEndDateRequire').style.display = "none";
    document.querySelector('#eno-usersRequire').style.display = "none";
}
function editSubs(sid,cid,lid,startDate,endDate,noOfUsers,server,td){
    tdIndex=td
    let eLicenseList=document.getElementById('elicense-list')
    let eStartDate=document.querySelector('#estart-date')
    let eEndDate=document.getElementById('eend-date')
    let eNoUsers=document.getElementById('eno-users')
    let eIsServer=document.getElementById('eis-server')
    elicenseDropdown.innerHTML=''
    eNoUsers.value = noOfUsers
    if(server){      
        eIsServer.checked = true
    }
    else{
        eIsServer.checked = false
    } 
    licenseLoad(1,lid)
    eStartDate.value = startDate.slice(0, 10)
    eEndDate.value = endDate.slice(0, 10)
    clientId = cid
    subscriptionId = sid
}
function editSubscription(){
    let eLicenseList=document.getElementById('elicense-list').value
    let eStartDate=document.querySelector('#estart-date').value
    let eEndDate=document.getElementById('eend-date').value
    let eNoUsers=document.getElementById('eno-users').value
    let eIsServer=document.getElementById('eis-server')
    let server 

    if(eIsServer.checked == true){
        server=1
    }
    else{
        server=0
    }
    licenseId=document.getElementById("elicense-list").value;
    if(eStartDate==''){
        document.querySelector('#eStartDateRequire').style.display = "block";
    }
    else{
        document.querySelector('#eStartDateRequire').style.display = "none";
    }
    if(eEndDate==''){
        document.querySelector('#eEndDateRequire').style.display = "block";
    }
    else{
        document.querySelector('#eEndDateRequire').style.display = "none";
    }
    if(eNoUsers==''){
        document.querySelector('#eno-usersRequire').style.display = "block";
    }
    else{
        document.querySelector('#eno-usersRequire').style.display = "none";
    }
    let data = {
        subscriptionId,
        clientId,
        licenseId,
        eStartDate,
        eEndDate,
        eNoUsers, 
        server 
    }
    if( eStartDate!="" && eEndDate!="" && eNoUsers!=""){
        axios.post(`${serverReqPath}/update-subs`, data)
        .then(function(response){
            let insertstatus = response.data.status
            if(insertstatus){
                clSubscriptionLoad(tdIndex)
                closeEditSubsModal()
            }
            else if(!insertstatus){
                closeEditSubsModal()
            }
        }).catch(function(res){
            if(res.response.status == 501){
                document.getElementById("server-msg").style.display = "block";
                document.getElementById("server-status").innerHTML = `*SERVER IS DOWN....message: ${res.responseJSON.message}`
            }
        })
    }
}   

//date modification
function date(date){
    return date.slice(0, 10)
}
function dateFormat(inputDate, format) {
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of     the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();    

    //replace the month
    format = format.replace("MM", month.toString().padStart(2,"0"));        

    //replace the year
    if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2,2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2,"0"));

    return format;
}

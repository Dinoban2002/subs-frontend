let path = 'file:///home/tigeen/dinoTask/subs_project/Front-End/subs-frontend/'
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


// localStorage.setItem('logstatus','true')
// sessionStorage.setItem('loginstatus','1')
// sessionStorage.setItem('loginstatus','0')
// console.log(sessionStorage.getItem('loginstatus'))
// sessionStorage.setItem('loginstatus','false')
// console.log(sessionStorage.getItem('loginstatus'))
// document.cookie = 'name=dino; expires=' +new Date(2023,0,1).toUTCString()


window.addEventListener("click",windowOnClick)
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
    console.log("loaded")
    sessionLogStatus =  sessionStorage.getItem('loginstatus')
    if(sessionLogStatus == 1){
        console.log("enter pageload")
        $.ajax({
            url: "http://localhost:3000/"
        })
        .done(function( data ) {
            object =  data
            console.log(object[0].__kp__clientid__lsan)
            listTable()
        });
        showClientlist();
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

    console.log("insede istTbl")
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
        console.log(tdIndex)
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
    console.log("in addtable")
    clSubscriptionLoad(td)
    console.log("after Load")
    td.setAttribute("colspan","5")
    tr1.appendChild(td)
    tbody.appendChild(tr1)
    table.appendChild(tbody)
}
function showClientlist()
{
    console.log("clicked")
    var clist=document.getElementById("clist-button");
    var ccreate=document.getElementById("clcreate-button");
    if(div.style.display === "none")
    {
        console.log("block changed")
        div.style.display = "block";
        clientDiv.style.display = "none";
        listLicense.style.display = "none";
    }
    // else{
    //     div.style.display = "none";
    // }
    // listtable(table)
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
        // body.style.background = "grey";
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
    // let API = document.getElementById('API')

    companyName.value='';
    Email.value='';
    Name.value='';
    fileName.value='';
    // API.value='';

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

    // companyName.value='';
    // Email.value='';
    // Name.value='';
    // fileName.value='';
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
        console.log(data)
        if(emailValidate == 1 && companyName!="" && Email!="" && Name!="" && fileName!="" && API!=""){
            console.log("inside valid if")
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/insert-user",
                data: {...data},
                success: function(res) {
                    let insertstatus = res.status
                    console.log(res)
                    console.log(insertstatus)
                    if(insertstatus==1){
                        companyName.value='';
                        Email.value='';
                        Name.value='';
                        fileName.value='';
                        API.value='';
                        
                        // document.location.reload(true)
                        pageLoad()
                        cancelCreateClient()
                        
                    }
                    else if(insertstatus==0){
                        alert("enter not null values!!")
                        nullEntryCreateClient()
                    }
                }
            });
        }
        // let req = Request("http://localhost:3000/insert-user", {
        //     method: "POST",
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     },
        //     body: data,
        //     mode: "no-cors"
        // })

        // fetch(req)
        // .then(response => response.json())
        // .then(json => console.log(json));

        // let url = `http://localhost:3000/insert-user?companyName=${companyName}&Email=${Email}&Name=${Name}&fileName=${fileName}&API=${API}` 

        // console.log(data)

        // const request = new XMLHttpRequest();
        // request.open("GET",url);
        // request.setRequestHeader('Content-Type','application/json')
        // request.send();
        // request.onload = () => {
        //     console.log(request.response)
        // }
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
function windowOnClick(event){
    if(event.target === modal){
        console.log("modaal clicked")
        clientDiv.style.display = "none";
    }
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
    console.log("enter signin")
    
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
        console.log(data.username)
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/admin-user",
            data: {...data},
            success: function(res) {
                let loginstatus = res.loginstatus
                if(loginstatus==1){
                    warning.style.display="none";
                    sessionStorage.setItem('loginstatus','1')
                    window.location.replace(`${path}/index.html`)
                }
                else{
                    warning.style.display="block";
                }
                if(loginstatus==2){
                    document.getElementById('logstatus').style.display = "block";
                    document.getElementById('logstatus').innerHTML="*User Name is wrong";
                }
                if(loginstatus==3){
                    document.getElementById('logstatus').style.display = "block";
                    document.getElementById('logstatus').innerHTML="*Password is wrong";
                }
                if(loginstatus==0
                    ){
                    // errStatus = 0;
                    console.log(loginstatus)
                    document.getElementById('logstatus').style.display = "block";
                    document.getElementById('logstatus').innerHTML="*Check your ID and PASSWORD"
                    // alert("Try again!! Something is wrong....Check your ID & PASSWORD")
                    // window.location.replace("file:///D:/Tigeen/Project/signin.html")
                }
            }
        });
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
        // licenseLoad();
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
    // document.location.reload(true);
}
function cancelmakesubs(){
    closeSubsDiv()
}
function listDownArrow(){
    // let licenseTableDiv=document.getElementById("list-license");
    if(licenseTableDiv.style.display === "none")
    {
        licenseTableDiv.style.display = "block";
        // div.style.display = "none";

    }
    else{
        licenseTableDiv.style.display = "none";
    }
}
function licenseLoad(forEdit,lid){
    $.ajax({
        url: "http://localhost:3000/add-license"
    })
    .done(function( data ) {
        clientLicenseObject =  data
        console.log(clientLicenseObject)
        // licenseTable.removeChild(ltbody)
        licensTable(forEdit,lid)
    });
}
function licensTable(forEdit,lid){
    // for (let data of clientLicenseObject ) {
    //     licenseTable.deleterow(data)
    // }
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
    // opt.value = col2;
    opt.setAttribute("value", tcol1)
    if(tcol1 === lid){
        opt.setAttribute("selected", true)
    }

    opt.appendChild(col2);
    opt.appendChild(col1);
    // opt.appendChild(col1);
    // opt.appendChild(col1);
    opt.appendChild(col6);
    // opt.addEventListener("click", () => {
    //     console.log("selectvalue",tcol1)
    //     // licenseTableDiv.style.display = "none";
    //     licenseData(tcol1,tcol2,tcol3,tcol4,tcol5)
    // })
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
    serverStatus.value  = '';
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
    // console.log(clientId)
    console.log(licenseId)
    // console.log(startDate)
    // console.log(endDate)
    // console.log(noofUsers)
    // console.log(serverStatus)
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
    console.log(data)
    if( startDate!="" && endDate!="" && noofUsers!=""){
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/make-subs",
            data: {...data},
            success: function(res) {
                let insertstatus = res.status
                console.log(res)
                if(insertstatus==1){
                    let tdArray = document.querySelectorAll("#subscription")
                    console.log("before ")
                    // clSubscriptionLoad(tdArray[tdIndex])
                    clSubscriptionLoad(tdIndex)
                    nullEntryMakeSubs()
                    closeSubsDiv()
                }
                else if(insertstatus==0){
                    alert("enter not null values!!")
                }
            }
        });
    }
}

// view client subscription
function viewClSbscription(tbody, table){
    // let display = clSubsDiv.style.display === "none" ? "block" : "none"
    // clSubsDiv.style.display = display;
}
var countt =0
function closeClSubsDiv(){
    // clSubsDiv.style.display = "none";
    // clientId='';
    clientName = '';
    licenseId = '';
    clSbsCount = 0
    clientId = 2
    if(countt){
        // document.location.reload(true)
        
        clSubscriptionLoad()
    }
    else{
        clSubsTable.removeChild(clSubsTbody)
    }
    countt = countt+1
}

function clSubscriptionLoad(td){

    console.log("clSubsriptionload loaded")
    var clSubsTable = document.createElement("table")
    var clSubsTHead = document.createElement("thead")
    var clSubsTbody = document.createElement("tbody")
    // console.log("before", subsNo)
    // collapseval = 1
    

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
    console.log("after")
    let data = {
        clientId
    }
    
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/view-subs",
        data: {...data},
        success: function(res) {
            clientSubscriptionObject = res
            console.log("Client have no sbscription",clientSubscriptionObject)
            console.log("after uppend",clientSubscriptionObject.length)
            let sernoSize = clientSubscriptionObject.length
            if(sernoSize > 0){
                clSubsTable.appendChild(clSubsTHead)
                for (let data of clientSubscriptionObject ) {
                    clLicenseLoad(data.__kp__subsid__lsan,data._kf__clientid__lsxn,data._kf__licenseid__lsxn,data.start_date,data.end_date,data.no_of_user,data.is_server, clSubsTbody, clSubsTable, td,sernoSize)
                    clSbsCount += 1
                }
            }else{
                let h1 = document.createElement("h1")
                h1.textContent = "No Subscriptions"
                clSubsTbody.appendChild(h1)
                clSubsTable.appendChild(clSubsTbody)
                td.appendChild(clSubsTable)
            }
            // if(clientSubscriptionObject==0){
            //     // noOfSubs.innerHTML="Client have no sbscription"
            //     // noOfSubs.style.display = "none";
            // }
            // clSubsDetail.innerHTML = clientName + "  have  " + clSbsCount + " Subscriptions" 
            // if(clSbsCount ==0){
            //     clSubsTable.style.display = "none"
            // }
        }
    });
}
function clLicenseLoad(sid,cid,lid,startDate,endDate,noOfUsers,server,clSubsTbody, clSubsTable, td,sernoSize){
    
    // subsNo=0

    licenseId = lid
    let data = {
        licenseId
    }
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/client-license",
        data: {...data},
        success: function(res) {
            clSubsObject = res
            clSubscriptionTable(sid,cid,lid,startDate,endDate,noOfUsers,server,clSubsTbody, clSubsTable, td,sernoSize)
        }
    })
}
var subsNo=0
function clSubscriptionTable(sid,cid,lid,startDate,endDate,noOfUsers,server,clSubsTbody, clSubsTable, td,sernoSize){
    // subsNo=0
    if(sernoSize > 0){
        for (let data of clSubsObject ) {
            // console.log("before uppend",clSubsObject)
            // console.log("inside loop")
            showClSubsTable(sid,cid,lid,startDate,endDate,noOfUsers,server,data.name, data.version,data.type, clSubsTbody, clSubsTable, td,sernoSize)
        } 
    }
}
function showClSubsTable(sid,cid,lid,startDate,endDate,noOfUsers,server,tcol1,tcol2,tcol3, clSubsTbody, clSubsTable, td,sernoSize){
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
    tr.appendChild(td5)
    clSubsTbody.appendChild(tr)
    clSubsTable.appendChild(clSubsTbody)
    td.appendChild(clSubsTable)
}

//edit suubscription

function editSubsModal(){
    if(editSubsDiv.style.display === "none")
    {
        editSubsDiv.style.display = "block";
        
        // licenseLoad();
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
    console.log(noOfUsers,startDate,"elemny",sid,cid,lid,eEndDate)
    // eStartDate.value = startDate
    // eNoUsers.innerHTML= startDate
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
    // eLicenseList.setAttribute("defaultvalue",lid)
    // eLicenseList.value = lid
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
    console.log(data)
    // clientId='';
    // licenseId = '';
    // startDate = '';
    // endDate = '';
    // noofUsers = '';
    // serverStatus  = '';
    if( eStartDate!="" && eEndDate!="" && eNoUsers!=""){
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/update-subs",
            data: {...data},
            success: function(res) {
                let insertstatus = res.status
                console.log(res)
                if(insertstatus==1){
                    clSubscriptionLoad(tdIndex)
                    closeEditSubsModal()
                }
                else if(insertstatus==0){
                    closeEditSubsModal()
                }
            }
        });
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

function date(inputDate,format){
    const date =   new Date(inputDate);
    const day = date.get
}














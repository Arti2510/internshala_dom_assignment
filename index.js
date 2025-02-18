// globally defined variables
var rowNumber = 0;
var pattern_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var patt_contact = /^\d{10}$/;
var idsArray = [];
var updatedId ="";
var valName = /^[a-zA-Z\s]*$/;
var val_ID = /^[0-9]+$/;
var rowIdToUpdate = null;

// to add new student in the record section with validity check
function addData() {
    rowNumber++;
    let name = document.getElementById("std_name").value;
    let stdId = document.getElementById("std_ID").value;
    let email = document.getElementById("std_email").value;
    let contact = document.getElementById("std_contact").value;
    if(name == "" || stdId == "" || email == "" || contact == ""){
        alert("Please insert all Fields.");
        clearInputs();
        return;
    } 
    if(!name.match(valName)){
        alert("Please enter valid Name.");
        document.getElementById("std_name").value = "";
        return;      
    }
    if(idsArray != null && idsArray.length >0 && idsArray.includes(stdId))
    {
        alert("Please enter unique Student Id.");
        document.getElementById("std_ID").value = "";
        return; 
    }
    if(!stdId.match(val_ID)){
        alert("Please enter only Numeric values in Student ID.");
        document.getElementById("std_ID").value = "";
        return;      
    }
    if(!pattern_email.test(email)){
        alert("Please enter valid Email Address.");
        document.getElementById("std_email").value = "";
        return;        
    }
    if(!patt_contact.test(contact)){
        alert("Please enter valid Contact Number.");
        document.getElementById("std_contact").value = "";
        return; 
    }
    let idEdit = "editButton_"+ rowNumber;
    let idDelete = "deleteButton_"+ rowNumber;
    let table = document.getElementById("tbody");
    document.getElementById("tbody").innerHTML = table.innerHTML+"<tr><td>"+name+"</td><td>"+stdId+"</td><td>"+email+"</td><td>"+contact+"</td><td><button id ='"+idEdit+"' onclick='editData(this,\""+stdId+"\")' class='editButton'>Edit</button><button id='"+idDelete+"' onclick='deleteData(this,\""+stdId+"\")' class='deleteButton'>Delete</button></td></tr>"
    document.getElementById(idEdit).className = 'editButton';
    document.getElementById(idDelete).className = 'deleteButton';
    idsArray.push(stdId);
    setLocalStorage();
    clearInputs();
}

// function for edit student details
function editData(button, stdId) {
    let row = button.parentNode.parentNode;
    let nameCell = row.cells[0].innerHTML;
    let idCell = row.cells[1].innerHTML;
    let emailCell = row.cells[2].innerHTML;
    let contactCell = row.cells[3].innerHTML;
    rowIdToUpdate = button.id;
    document.getElementById("std_name").value = nameCell;
    document.getElementById("std_ID").value = idCell;
    document.getElementById("std_email").value = emailCell;
    document.getElementById("std_contact").value = contactCell;
    document.getElementById("addButton").style.display = "none";
    document.getElementById("updateButton").style.display = "inline";
    document.getElementById("cancelButton").style.display = "";
    updatedId = stdId;
}

// function for add updated details in record section with validity check
function UpdateStudent() {
    button = document.getElementById(rowIdToUpdate);
    let rowToUpdate = button.parentNode.parentNode;
    let name = document.getElementById("std_name").value;
    let stdId = document.getElementById("std_ID").value;
    let email = document.getElementById("std_email").value;
    let contact = document.getElementById("std_contact").value;
    if(name == "" || stdId == "" || email == "" || contact == ""){
        alert("Please insert all Fields.");
        clearInputs();
        return;
    } 
    if(!name.match(valName)){
        alert("Please enter valid Name.");
        document.getElementById("std_name").value = "";
        return;      
    }
    if(idsArray.includes(stdId) && updatedId != stdId)
    {
        alert("Please enter unique Student Id.");
        document.getElementById("std_ID").value = "";
        return; 
    }
    if(!stdId.match(val_ID)){
        alert("Please enter only Numeric values in Student ID.");
        document.getElementById("std_ID").value = "";
        return;      
    }
    if(!pattern_email.test(email)){
        alert("Please enter valid Email Address.");
        document.getElementById("std_email").value = "";
        return;        
    }
    if(!patt_contact.test(contact)){
        alert("Please enter valid Contact Number.");
        document.getElementById("std_contact").value = "";
        return; 
    }
    rowToUpdate.cells[0].innerHTML = document.getElementById("std_name").value;
    rowToUpdate.cells[1].innerHTML = document.getElementById("std_ID").value;
    rowToUpdate.cells[2].innerHTML = document.getElementById("std_email").value;
    rowToUpdate.cells[3].innerHTML = document.getElementById("std_contact").value;
    rowToUpdate = null;
    let indexToRemove = idsArray.indexOf(updatedId);
    idsArray.splice(indexToRemove, 1);
    idsArray.push(stdId);
    setLocalStorage();
    Cancel();
}

// function for cancelation of edit details
function Cancel() {
    document.getElementById("std_name").value = "";
    document.getElementById("std_ID").value = "";
    document.getElementById("std_email").value = "";
    document.getElementById("std_contact").value = "";
    document.getElementById("addButton").style.display = "block";
    document.getElementById("updateButton").style.display = "none";
    document.getElementById("cancelButton").style.display = "none";
    rowToUpdate = null;
}

// function for delete records from the record section
function deleteData(button, stdId) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    let indexToRemove = idsArray.indexOf(stdId);
    idsArray.splice(indexToRemove, 1);
    setLocalStorage();
}

// function for clear Inputs 
function clearInputs() {
    document.getElementById("std_name").value = "";
    document.getElementById("std_ID").value = "";
    document.getElementById("std_email").value = "";
    document.getElementById("std_contact").value = "";
}

// function for local storage 
function setLocalStorage() {
    localStorage.setItem("tabledata", document.getElementById("tbody").innerHTML);
    console.log(localStorage.getItem("tabledata"));
    document.getElementById("tbody").innerHTML = "";
    document.getElementById("tbody").innerHTML = localStorage.getItem("tabledata");
    localStorage.setItem("ids", idsArray);
}

// function to check the uniqueness of the id and find the existing id in localstorage and add with array
function myFunction() {
    if(localStorage != null && localStorage.length > 0 && localStorage.getItem("tabledata") != null) {
            document.getElementById("tbody").innerHTML = localStorage.getItem("tabledata");
        }
        if(localStorage != null && localStorage.length > 0 && localStorage.getItem("ids") != null) {
            idsArray = localStorage.getItem("ids").split(',');
        }
}
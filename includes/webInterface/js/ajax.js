var customerID = "";
function login() {
    error();

  var data_file = "http://" + window.location.hostname + ":3000/users";
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
        var jsonResponse = JSON.parse(this.responseText)
        if(jsonResponse.success){
            document.cookie = "token="+jsonResponse.token;
            window.location.href = window.location.href;
        }
        else error("wrong login");
    }
  };
  xhttp.open("GET", data_file, true);
  xhttp.setRequestHeader("username", document.getElementById("username").value);
  xhttp.setRequestHeader("password", document.getElementById("password").value);
  xhttp.send();
}

function loadCustomers() {
  var table = document.getElementById("tabelaStrank");
  table.tBodies[0].innerHTML = ""
  console.log(table.tBodies[0].innerHTML);
  var data_file = "http://" + window.location.hostname + ":3000/clients";
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
        var jsonArray = JSON.parse(this.responseText)
        console.log(jsonArray);
        for(var i = 0; i < jsonArray.length; i++) {
          var client = jsonArray[i];
          var row = table.tBodies[0].insertRow();
          row.id= client._id;
          row.insertCell(0).innerHTML = client.name;
          row.insertCell(1).innerHTML = client.surname;
          row.insertCell(2).innerHTML = client.birthYear;
          row.insertCell(3).innerHTML = client.gender;
          row.insertCell(4).innerHTML = client.weight + " kg";
          row.insertCell(5).innerHTML = client.height + " cm";
          row.insertCell(6).innerHTML = "<img onclick=\"edit(" + client._id + ")\" src=\"/img/editIcon.png\"/>";
          row.cells[6].onclick = function(){
            window.location.pathname= "client/"+row.id;
          }
        }
    }
  };
  xhttp.open("GET", data_file, true);
  xhttp.withCredentials = true;
  xhttp.send();
}

function loadSpecificCustomers(id) {
    customerID = id;
  var podatki = document.getElementById("podatkiStranka");
  var obrazec = document.getElementById("podatkiStrankaForm");
  var terapije = document.getElementById("terapijeStranka");
  terapije.tBodies[0].innerHTML = "";
  var data_file = "http://" + window.location.hostname + ":3000/clients/"+id;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      console.log(this.responseText);
     if (this.readyState == 4 && this.status == 200) {
        var client = JSON.parse(this.responseText)
          obrazec.name.value = client.name;
          obrazec.surname.value = client.surname;
          obrazec.birthYear.value = client.birthYear;
          obrazec.gender.value = client.gender;
          obrazec.weight.value = client.weight;
          obrazec.height.value = client.height;
          obrazec.bloodPressure.value = client.bloodPressure;
          obrazec.profession.value = client.profession;
          obrazec.sportActivity.value = client.sportActivity;
          obrazec.nutrition.value = client.nutrition;
          obrazec.city.value = client.city;
          obrazec.telNumber.value = client.telNumber;
          obrazec.email.value = client.email;
          obrazec.healthStatus.value = client.healthStatus;
          obrazec.healthStatus.colSpan = 4;
          obrazec.other.innerHTML = client.other;
          obrazec.other.colSpan = 3;


          for(var i = 0; i < client.therapies.length; i++) {
            var row = terapije.tBodies[0].insertRow();
            var date = new Date(client.therapies[i].date);
            row.id= client.therapies[i]._id;
            row.insertCell(0).innerHTML = i+1;
            row.insertCell(1).innerHTML = date.getDate() + "." + date.getMonth()+1 + "." + date.getFullYear();
            row.insertCell(2).innerHTML = client.therapies[i].reason;
            row.insertCell(3).innerHTML = client.therapies[i].expectations;
            row.insertCell(4).innerHTML = client.therapies[i].changes;
            row.insertCell(5).innerHTML = client.therapies[i].therapyType;
            row.insertCell(6).innerHTML = client.therapies[i].feedback;
            row.insertCell(7).innerHTML = client.therapies[i].advice;
            row.insertCell(8).innerHTML = client.therapies[i].notes;
          }
        }

  };
  xhttp.open("GET", data_file, true);
  xhttp.withCredentials = true;
  xhttp.send();
}

function error(text){
    errorElement = document.getElementById("errorMessage");
    if(text == null) errorElement.style.display="none";
    else errorElement.style.display="block";
    errorElement.innerHTML = text;
}

function validateInput(){
    var name = document.getElementById("name");
    if( name.value == "" ){
      name.focus();
      error("izpolni vsa polja");
      return false;
    }

    var surname = document.getElementById("surname");
    if( surname.value == ""){
      surname.focus();
      error("izpolni vsa polja");
      return false;
    }

    var gender = document.getElementById("genderDropDown");
    if( gender.value != 'M' && gender.value != 'Ž'){
      gender.focus();
      error("Spol neveljaven");
      return false;
    }

    var weight = document.getElementById("weight");
    if( weight.value <= 0){
      weight.focus();
      error("teža neveljavna");
      return false;
    }

    var height = document.getElementById("height");
    if( height.value <= 0){
      height.focus();
      error("višina neveljavna");
      return false;
    }

    var healthStatus = document.getElementById("healthStatus");
    if( healthStatus.value == ""){
      healthStatus.focus();
      error("izpolni vsa polja");
      return false;
    }

    var profession = document.getElementById("profession");
    if( profession.value == ""){
      profession.focus();
      error("izpolni vsa polja");
      return false;
    }

    var city = document.getElementById("city");
    if( city.value == ""){
      city.focus();
      error("izpolni vsa polja");
      return false;
    }

    error();
    var customer = new Object();
    customer.name = name.value;
    customer.surname = surname.value;
    customer.birthYear = birthYear.value;
    customer.gender = gender.value;
    customer.weight = weight.value;
    customer.height = height.value;
    customer.bloodPressure = bloodPressure.value;
    customer.healthStatus = healthStatus.value;
    customer.profession = profession.value;
    customer.sportActivity = sportActivity.value;
    customer.nutrition = nutrition.value;
    customer.city = city.value;
    customer.telNumber = telNumber.value;
    customer.email = email.value;
    customer.other = other.value;
    return customer;
}

function createNewCustomerRequest () {
    var customer = validateInput();

    var data_file = "http://" + window.location.hostname + ":3000/clients";
    var xhttp = new XMLHttpRequest();
    if(id != null){
        xhttp.open("PUT", data_file, true);
    }
    else{
        xhttp.open("POST", data_file, true);
    }

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(JSON.stringify(customer));
    setTimeout(loadCustomers, 500);
}

function modifyCustomer (id) {
    var customer = validateInput();
    customer.id = id;
    var data_file = "http://" + window.location.hostname + ":3000/clients";
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", data_file, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(JSON.stringify(customer));
}

function createNewTherapyRequest (id) {
    var date = document.getElementById("date");
    if( date.value == ""){
      date.focus();
      error("izpolni vsa polja");
      return false;
    }
    console.log(date);
    var reason = document.getElementById("reason");
    var expectations = document.getElementById("expectations");
    var changes = document.getElementById("changes");
    var therapyType = document.getElementById("therapyType");
    var feedback = document.getElementById("feedback");
    var advice = document.getElementById("advice");
    var notes = document.getElementById("notes");
    if( feedback.value == ""){
      feedback.focus();
      error("izpolni vsa polja");
      return false;
    }
    error(); // remove error
    var Therapy = new Object();
    Therapy.date = new Date(date.value);
    Therapy.reason = reason.value;
    Therapy.expectations = expectations.value;
    Therapy.changes = changes.value;
    Therapy.therapyType = therapyType.value;
    Therapy.feedback = feedback.value;
    Therapy.advice = advice.value;
    Therapy.notes = notes.value;
    var data_file = "http://" + window.location.hostname + ":3000/clients/" + id + "/therapies";
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", data_file, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(JSON.stringify(Therapy));
    setTimeout(loadSpecificCustomers, 500, id);
}

var categoryValue = "Work";
var categoryColor = "red";
var toRemove = "";

function initialize() {
    var d = new Date();

    var hours = "" + d.getHours() + ":";
    var minutes = "" + d.getMinutes() + ":";
    var seconds = "" + d.getSeconds();
    if (hours.length == 2) hours = "0" + hours;
    if (minutes.length == 2) minutes = "0" + minutes;
    if (seconds.length == 1) seconds = "0" + seconds;

    document.getElementById("date").valueAsDate = d;
    document.getElementById("time").value =  hours + minutes + seconds;
}

function addItem() {

    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;
    var description = document.getElementById('description').value;

    // Check for valid values
    if (isNaN(date) && isNaN(time) && description != "") {
        // If valid values
        var table = document.getElementById("todolist");
        var row = table.insertRow(-1);
        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        var remove = document.createElement("input");
        remove.type = "button";
        remove.value = "Remove Item";
        remove.setAttribute("onclick", "toRemove=this.parentNode.parentNode.rowIndex;remove();");
        row.insertCell(0).appendChild(checkBox);
        row.insertCell(1).innerHTML = categoryValue;
        row.insertCell(2).innerHTML = date + " " + time;
        row.insertCell(3).innerHTML = description;
		row.insertCell(4).innerHTML = new Date().toLocaleString();
        row.insertCell(5).appendChild(remove);
        row.style.backgroundColor = categoryColor;

    }
    else {
        window.alert("Please enter valid values for all the categories");
    }
}

function addColor() {
    var newCategory = document.getElementById("newCategory").value;
    var newColor = document.getElementById("newColor").value;
    var li = document.createElement("li");
    var input = document.createElement("input");
    input.type = "radio";
    input.setAttribute("name", "category");
    input.setAttribute("onclick", "categoryValue='" + newCategory + "';categoryColor='" + newColor + "';");
    li.appendChild(input);
    li.style.backgroundColor = newColor;
    li.innerHTML += newCategory;
    document.getElementById("categories").appendChild(li);
}

function remove() {
    if (confirm("Are you sure you want to delete row #" + toRemove + "?")==true) {
        document.getElementById("todolist").deleteRow(toRemove);
    }
}

function sortDeadline() {

	var table = document.getElementById("todolist");

	for (var i = 1; i < (table.rows.length); i++) {
		for (var j = 1; j < (table.rows.length-i); j++) {

			var date1 = Date.parse(table.rows[j].cells[2].innerHTML);
			var date2 = Date.parse(table.rows[j+1].cells[2].innerHTML);

			if (date1 > date2) {
				table.rows[j].parentNode.insertBefore(table.rows[j+1], table.rows[j]);
			}
		}
	}
}

function sortAdded() {

	var table = document.getElementById("todolist");

	for (var i = 1; i < (table.rows.length); i++) {
		for (var j = 1; j < (table.rows.length-i); j++) {

			var date1 = Date.parse(table.rows[j].cells[4].innerHTML);
			var date2 = Date.parse(table.rows[j+1].cells[4].innerHTML);

			if (date1 > date2) {
				table.rows[j].parentNode.insertBefore(table.rows[j+1], table.rows[j]);
			}
		}
	}
}

function sortCategory() {

	var table = document.getElementById("todolist");

	for (var i = 1; i < (table.rows.length); i++) {
		for (var j = 1; j < (table.rows.length-i); j++) {

			var category1 = table.rows[j].cells[1].innerHTML;
			var category2 = table.rows[j+1].cells[1].innerHTML;

			if (category1 > category2) {
				table.rows[j].parentNode.insertBefore(table.rows[j+1], table.rows[j]);
			}
		}
	}
}

function sortComplete() {

	var table = document.getElementById("todolist");

	for (var i = 1; i < (table.rows.length); i++) {
		for (var j = 1; j < (table.rows.length-i); j++) {

			var complete1 = table.rows[j].cells[0].getElementsByTagName('input')[0].checked==true;
			var complete2 = table.rows[j+1].cells[0].getElementsByTagName('input')[0].checked==true;

			if (complete1 > complete2) {

				table.rows[j].parentNode.insertBefore(table.rows[j+1], table.rows[j]);
			}
		}
	}
}

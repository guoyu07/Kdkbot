function addNewCommand() {
	$tbl = document.getElementById("cmdTable");
	$ntr = document.createElement("tr");
	
	$ntr.innerHTML = "<td><input name=\"trigger[]\" type=\"text\" value=\"\"></td><td><input name=\"message[]\" type=\"text\" value=\"\"></td><td><input name=\"rank[]\" type=\"number\" value=\"0\"></td><td><select name=\"active[]\"><option value=\"true\" selected>Yes</option><option value=\"false\">No</option></select></td>"
	
	$tbl.appendChild($ntr);
}

function addNewUser() {
	$tbl = document.getElementById("permTable");
	$ntr = document.createElement("tr");
	
	$ntr.innerHTML = "<tr><td><input type=\"text\" name=\"user[]\" value=\"\"></td><td><input type=\"number\" name=\"rank[]\" value=\"\" /></td></tr>";
	
	$tbl.appendChild($ntr);
}

function addNewQuote() {
	$tbl = document.getElementById("quoteTable");
	$ntr = document.createElement("tr");
	
	$ntr.innerHTML = "<tr><td><input style=\"width: 80px;\" type=\"number\" name=\"id[]\" value=\"\"></td><td><textarea name=\"quote[]\"></textarea></td></tr>\r\n";
	
	$tbl.appendChild($ntr);
}

function addNewAMA() {
	$tbl = document.getElementById("amaTable");
	$ntr = document.createElement("tr");
	
	$ntr.innerHTML = "<tr><td><textarea name=\"question[]\"></textarea></td></tr>\r\n";
	
	$tbl.appendChild($ntr);
}

function addNewFilter() {
	$tbl = document.getElementById("filtersTable");
	$ntr = document.createElement("tr");
	
	$ntr.innerHTML = "<tr><td><input type=\"text\" name=\"title[]\" value=\"\"></td><td><select name=\"type[]\"><option value=\"0\" selected>None</option><option value=\"1\">Purge</option><option value=\"2\">Timeout</option><option value=\"3\">Ban</option><option value=\"4\">Message</option></select></td><td><input type=\"text\" name=\"filter[]\" value=\"\"></td><td><input type=\"text\" name=\"message[]\" value=\"\"></td><td><select name=\"bypassable[]\"><option value=\"true\" selected>Yes</option><option value=\"false\">No</option></td></tr>\r\n";
	
	$tbl.appendChild($ntr);
}

function addExistingFilter(info) {
	console.log(info);
	
	$temp = info;
	$data = $temp.options[$temp.selectedIndex];
	$temp.selectedIndex = 0;
	if($data.value == "null") { return; }
	
	console.log($data);
	
	$tbl = document.getElementById("filtersTable");
	$ntr = document.createElement("tr");
	
	$ntr.innerHTML = "<tr><td><input type=\"text\" name=\"title[]\" value=\"" + $data.getAttribute("data-name") + "\"></td>";
	// <option value=\"0\" selected>None</option><option value=\"1\">Purge</option><option value=\"2\">Timeout</option><option value=\"3\">Ban</option><option value=\"4\">Message</option>
	switch($data.getAttribute("data-type")) {
		default:
		case "none":
			$ntr.innerHTML += "<td><select name=\"type[]\"><option value=\"0\" selected>None</option><option value=\"1\">Purge</option><option value=\"2\">Timeout</option><option value=\"3\">Ban</option><option value=\"4\">Message</option>";
			break;
		case "purge":
			$ntr.innerHTML += "<td><select name=\"type[]\"><option value=\"0\">None</option><option value=\"1\" selected>Purge</option><option value=\"2\">Timeout</option><option value=\"3\">Ban</option><option value=\"4\">Message</option>";
			break;
		case "timeout":
			$ntr.innerHTML += "<td><select name=\"type[]\"><option value=\"0\">None</option><option value=\"1\">Purge</option><option value=\"2\" selected>Timeout</option><option value=\"3\">Ban</option><option value=\"4\">Message</option>";
			break;
		case "ban":
			$ntr.innerHTML += "<td><select name=\"type[]\"><option value=\"0\">None</option><option value=\"1\">Purge</option><option value=\"2\">Timeout</option><option value=\"3\" selected>Ban</option><option value=\"4\">Message</option>";
			break;
		case "message":
			$ntr.innerHTML += "<td><select name=\"type[]\"><option value=\"0\">None</option><option value=\"1\">Purge</option><option value=\"2\">Timeout</option><option value=\"3\">Ban</option><option value=\"4\" selected>Message</option>";
			break;
	}
	
	$ntr.innerHTML += "</select></td><td><input type=\"text\" name=\"filter[]\" value=\"" + $data.getAttribute("data-filter") + "\"></td><td><input type=\"text\" name=\"message[]\" value=\"" + $data.getAttribute("data-message") + "\"></td>";
	// <option value=\"true\" selected>Yes</option><option value=\"false\">No</option></td></tr>\r\n";
	switch($data.getAttribute("data-bypassable")) {
		case "true":
			$ntr.innerHTML += "<td><select name=\"bypassable[]\"><option value=\"true\" selected>Yes</option><option value=\"false\">No</option></select></td>";
			break;
		default:
			$ntr.innerHTML += "<td><select name=\"bypassable[]\"><option value=\"true\">Yes</option><option value=\"false\" selected>No</option></select></td>";
			break;
	}
	
	$ntr.innerHTML += "</tr>\r\n";
	
	$tbl.appendChild($ntr);
}

function addNewCounter() {
	$tbl = document.getElementById("countersTable");
	$ntr = document.createElement("tr");
	
	$ntr.innerHTML = "<tr><td><input type=\"text\" name=\"name[]\" value=\"\" /></td><td><input type=\"number\" name=\"value[]\" value=\"\" /></td></tr>\r\n";
	
	$tbl.appendChild($ntr);
}

function addNewTimer() {
	$tbl = document.getElementById("timerTable");
	$ntr = document.createElement("tr");
	
	$ntr.innerHTML = "<tr><td><input type=\"text\" name=\"name[]\"/></td><td><input type=\"number\" name=\"time[]\" max=\"10000\" min=\"1\"/></td><td><input type=\"text\" name=\"msg[]\" /></td><td><select name=\"flag_live[]\"><option value=\"true\" selected>Yes</option><option value=\"false\">No</option></td><td><input type=\"number\" name=\"flag_msg[]\" value=\"0\" min=\"0\" max=\"10000\"></td><td><input type=\"text\" name=\"flag_game[]\"></td></tr>\r\n";
	
	$tbl.appendChild($ntr);
}

function addNewEconCmd() {
	$tbl = document.getElementById("econCmdTable");
	$ntr = document.createElement("tr");
	
	$ntr.innerHTML = "<tr><td><input type=\"text\" name=\"commands[]\"/></td><td><input type=\"number\" name=\"values[]\" value=\"0\" /></td></tr>";
	
	$tbl.appendChild($ntr);
}

function encodeText(obj) {
	obj.value = obj.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
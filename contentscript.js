var fields = document.getElementsByTagName('input');
var mouse_x;
var mouse_y;
var area;
var input_elem;


window.document.addEventListener("click", function() {
	if(document.body.lastChild == area) {
		document.body.removeChild(area);	
	}
});

function handleDoubleClick(items){

	if(document.body.lastChild == area)
		document.body.removeChild(area);

	area = document.createElement("div");
	area.innerHTML = "";
	table = document.createElement("table");
	area.style.position = "absolute";
	area.style.left = mouse_x + "px";
	area.style.top = mouse_y + "px";
	
	for(key in items) {
		tr = document.createElement("tr");
		td = document.createElement("td");
		td.innerHTML = key;
		td.style.backgroundColor = "#89C4F4";
		td.style.padding = "6px 10px 6px 10px";
		td.style.fontWeight = "bold";
		td.style.borderRadius = "5px solid black";
		td.style.borderBottom = "1px solid black";

		value = items[key];
		td2 = document.createElement("td");
		td2.innerHTML = value;
		td2.style.border = "none";
		td2.style.backgroundColor = "#E4F1FE";
		td2.style.visibility = "hidden";
		td2.style.padding = "6px 10px 6px 10px";
		td2.style.fontWeight = "bold";

		td.addEventListener("mouseover", function(e) {
			e.target.style.cursor = "pointer";
			e.target.parentNode.lastChild.style.visibility = "visible";
		});

		td.addEventListener("click", function(e) {
			input_elem.value = e.target.parentNode.lastChild.innerHTML;
		});

		td.addEventListener("mouseout", function(e) {
			e.target.parentNode.lastChild.style.visibility = "hidden";
		});

		tr.style.border = "none";
		tr.appendChild(td);
		tr.appendChild(td2);
		table.appendChild(tr);
	}
	
	area.appendChild(table);
	area.style.zIndex = "1000000";
	document.body.appendChild(area);
}


for(i = 0; i < fields.length; ++i) {

	
	fields[i].oncontextmenu = function(event) {
		
		event.preventDefault();
		mouse_x = event.clientX;
		mouse_y = event.clientY;
		input_elem = event.target;
		chrome.storage.local.get(null, handleDoubleClick);
	}
}
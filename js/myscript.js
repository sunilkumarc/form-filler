(function() {
    loadDataInTable();
})();

function addRecordToTable(record) {
    $('#key-values').append(record);
}

function getRecordString(key, val) {
    var record = "<tr align=\"center\" class=\"item-row\">";
    record += "<td>" + key + "</td>";
    record += "<td>" + val + "</td>";
    record += "</tr>";
    return record
}

function loadDataInTable() {
    chrome.storage.local.get(null, function(items) {
        console.log($("#key-values"));
        if (Object.keys(items).length > 0) {
            $('#key-values >thead tr').append('<th>Key</th>');
            $('#key-values >thead tr').append('<th>Value</th>');

            for (key in items) {
                var record = getRecordString(key, items[key]);
                addRecordToTable(record);
            }
        }
    });
}

function transitionPage() {
    $("#add-new-key").val("");
    $("#add-new-val").val("");

    $("#main-page").slideUp();
    $("#add-new-page").slideDown();
    // $("#main-page").toggle("slide", {direction: "left"}, 500);
    // $("#add-new-page").toggle("slide", {direction: "right"}, 500);
}

function transitionBack() {
    $("#add-new-page").slideUp();
    $("#main-page").slideDown();
    
}

function addNewKeyValue() {
    var key = $("#add-new-key").val();
    var val = $("#add-new-val").val();
    if (key == "" || val == "") {
        alert("cannot be emptry");
    } else {
        obj = {};
        obj[key] = val;
        chrome.storage.local.set(obj, function(){});
        addRecordToTable(getRecordString(key, val));
        transitionPage();
    }
}

$(document).ready(function() {
    $("#add-new-button").click(transitionPage);
    $("#back-button").click(transitionBack);
    $("#add-button").click(addNewKeyValue);
});
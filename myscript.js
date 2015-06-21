window.addEventListener('DOMContentLoaded', function() {
	addButton = document.getElementById('add');
	addButton.addEventListener('click', function() {

		key_obj = document.getElementById('key');
		val_obj = document.getElementById('val');

		key = key_obj.value;
		val = val_obj.value;

		if (key == '' || val == '')
			alert('Fill both the fields to continue');
		else {
			obj = {};
			obj[key] = val;
			chrome.storage.local.set(obj, function(){});
			alert('Added Successfully!');
		}
	});
});

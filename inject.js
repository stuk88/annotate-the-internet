var ANNOT = {};

alert("I'm annotating!"); // check that app loaded correctly

function getSelectedText() {
	var text = "";
	if (typeof window.getSelection != "undefined") {
		text = window.getSelection().toString();
	} else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
		text = document.selection.createRange().text;
	}
	return text;
}

function saveAnnotations() {
	var data = getSelectedText();
	if (data) {
		chrome.storage.local.set({'A0001': data});
		chrome.storage.local.get('A0001', function(data) {
			console.log(data); // debug
		});
	}
}

document.onmouseup = saveAnnotations;

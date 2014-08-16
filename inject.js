var ANNOT = {};

alert("I'm annotating!");

function getSelectedText() {
	var text = "";
	if (typeof window.getSelection != "undefined") {
		text = window.getSelection().toString();
	} else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
		text = document.selection.createRange().text;
	}
	return text;
}

function doSomethingWithSelectedText() {
	var selectedText = getSelectedText();
	if (selectedText) {
		alert("Got selected text " + selectedText);
	}
}

function saveAnnotations(textSelection) {
	var data = textSelection;
	chrome.storage.local.set({'value': data}, function());
	alert(chrome.storage.local.get('value', function());
}

document.onmouseup = doSomethingWithSelectedText;

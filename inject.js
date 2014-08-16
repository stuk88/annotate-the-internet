var ANNOT = {
	overlayHidden : true,
	annotations : [],
	curSelection : null,
};

console.log("Annosurf is active!"); // check that app loaded correctly

var getSelectedText = function() {
	var text = "";
	if (typeof window.getSelection != "undefined") {
		text = window.getSelection().toString();
	} else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
		text = document.selection.createRange().text;
	}
	return text;
};

var doSomethingWithSelectedText = function() {
	if (!ANNOT.overlayHidden) return; // don't change selection if annotating
	var selectedText = getSelectedText();
	if (selectedText) {
		if (ANNOT.overlayHidden) toggleOverlay();
		ANNOT.curSelection = window.getSelection();
	} else {
		ANNOT.curSelection = null;
	}
};

var toggleOverlay = function() {
	var overlay = $('#overlay');
	var annotBox = $('#annotBox');
	overlay.css('opacity', .8);

	if (overlay.css('display') === 'block') {
		overlay.css('display', 'none');
		annotBox.css('display', 'none');
		saveAnnotation();
	} else {
		overlay.css('display', 'block');
		annotBox.css('display', 'block');
	}

	ANNOT.overlayHidden = !ANNOT.overlayHidden;
};

var setup = function() {
	// overlay
	$('body').append($('<div id="overlay"></div>'));

	// annotation box
	$('body')
		.append($('<div id="annotBox"></div>')
			.append($('<textarea id="annotEditor"></textarea>')
				.text("Hi, I\'m an annotater box!"))
			.append($('<button>Hide box</button>')
				.click(toggleOverlay)));
};

function saveAnnotation() {
	chrome.storage.local.set({"storedText" : [ANNOT.annotations]});
	chrome.storage.local.get("storedText", function(data) {
		console.log(data);
	});

	//if (index == -1) {
	//	var annot = [ANNOT.curSelection, ""];
	//	annot[1] = $('#annotBox').text();
	//	ANNOT.annotations.push(annotation);
	//}
}

document.onmouseup = doSomethingWithSelectedText;
setup();

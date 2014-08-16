var ANNOT = {
	overlayHidden : true,
};

var getSelectedText = function() {
	var text = "";
	if (typeof window.getSelection != "undefined") {
		text = window.getSelection().toString();
	} else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
		text = document.selection.createRange().text;
	}
	return text;
}

var doSomethingWithSelectedText = function() {
	var selectedText = getSelectedText();
	if (selectedText && ANNOT.overlayHidden) {
		toggleOverlay();
	}
}

var toggleOverlay = function() {
	var overlay = $('#overlay');
	var annotBox = $('#annotBox');
	overlay.css('opacity', .8);

	if (overlay.css('display') === 'block') {
		overlay.css('display', 'none');
		annotBox.css('display', 'none');
	} else {
		overlay.css('display', 'block');
		annotBox.css('display', 'block');
	}
}

var setup = function() {
	var overlay = $('<div id="overlay"></div>');
	$('body').append(overlay);

	var annotBox = $('<div id="annotBox"></div>');
	var editor = $('<textarea id="annotEditor">Hi, I\'m an annotater box!</textarea>');
	annotBox.append(editor);
	var button = $('<button>Hide box</button>');
	button.click(toggleOverlay);
	annotBox.append(button);
	$('body').append(annotBox);
}

document.onmouseup = doSomethingWithSelectedText;
setup();

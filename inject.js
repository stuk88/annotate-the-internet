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
	// overlay
	$('body').append($('<div id="overlay"></div>'));

	// annotation box
	$('body')
		.append($('<div id="annotBox"></div>')
			.append($('<textarea id="annotEditor"></textarea>')
				.text("Hi, I\'m an annotater box!"))
			.append($('<button>Hide box</button>')
				.click(toggleOverlay)));
}

document.onmouseup = doSomethingWithSelectedText;
setup();

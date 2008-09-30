var findLongestText = function(emHolder) {
	// get all inner spans
	var allSpans = $("span", emHolder);
	// write the first span in to use for the first length comparison
	var longestElement = allSpans[0];
	// loop through all other spans and overwrite longestElement if target is longer
	for(var i=1; i < allSpans.length; i++) {
		if($(allSpans[i]).text().length > $(longestElement).text().length) { 
			longestElement = allSpans[i]; 
		};
	}
	return longestElement;
}

var animateVerbs = function(emHolder) {
	// select a random (not currently shown) span
	var randomSpan = $("span:hidden", emHolder).not(".always-hide")[Math.floor(Math.random() * ($("span:hidden", emHolder).not(".always-hide").length - 1))];
	
	if(!jQuery.browser.msie) {
		// hide currently visible item
		emHolder.startTop = (!emHolder.startTop) ? new Number($("span:last", emHolder).css("top").replace("px", "")) : emHolder.startTop;
		$("span:visible", emHolder).animate({
			height: 0,
			top: emHolder.startTop + 70
		}, 1100, function() { $(this).css("display", "none").css("top", $(this).parent()[0].startTop); });
		// show randomly selected span
		$(randomSpan).css("display", "inline").animate({
			height: 70,
			top: emHolder.startTop
		}, 1100);
	} else {
		// hide currently visible item
		$("span:visible", emHolder).fadeOut(1100)
		// show randomly selected span
		$(randomSpan).fadeIn(1100)
	}
}

$(function() {
	// for each em
	$("em").each(function(i) {
		var newHTML = "";
		// split by commas
		var splitText = $(this).html().split(", ");
		for(var j=0; j < splitText.length; j++) {
			// wrap in spans (to give more clarified selector access)
			newHTML += "<span>" + splitText[j] + "</span>";
		}
		// rewrite new code in place
		$(this).html(newHTML);
		// find the longest item (based off text length), then clone it to create a background container which remains a constant width (while still inline)
		$(findLongestText(this)).clone().addClass("always-hide").prependTo(this).html($("span.always-hide", this).html() + "&nbsp;").siblings().hide();
		// position all the new span contained elements absolutely (to maintain inline styles)
		$("span:not(.always-hide)", this).css("top", $("span.always-hide", this).position().top - 4).css("left", $("span.always-hide", this).position().left);
		// show the first random item
		animateVerbs(this);
		// set an interval to change verbs
		var _this = this;
		setInterval(function() {
			animateVerbs(_this);
		}, (Math.random() * 8000) + 5000);
	});
	
	$("h3 a").hover(function() {
		$(this).parent().parent().css("background-color", "#E6FFFF");
	}, function() {
		$(this).parent().parent().css("background-color", "#FF0047");
	})
});
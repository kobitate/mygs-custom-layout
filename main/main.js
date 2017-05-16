function prepPage() {
	$.get(chrome.extension.getURL('main/editBar.html'), function(data) {
		$("body").append(data);
	});
	$.get(chrome.extension.getURL('main/editButton.html'), function(data) {
		$("#edit-start-controls").prepend(data);
	});
	$(".col-sm-6.col-md-3").addClass("portal-column");
	$(".panel.panel-primary").each(function() {
		$(this).addClass("channel");
		var channel = $(this).find("[id^=Channel]");

		if (channel.length > 0) {
			var split = channel.attr("id").split("_");
			$(this).attr("id", "portal-channel-" + split[1]);
		}
		else {
			var title = $(this).find("h2").text();
			if (title == "My Messages & Alerts") {
				$(this).attr("id", "portal-channel-msg");
			}
		}
	});
	// get rid of their dumb google analytics code that just creates more problems than it solves
	$("a").unbind("click");
}

prepPage();

$(".portal-column").sortable({
	items: ".channel",
	connectWith: ".portal-column",
	handle: ".panel-heading",
	revert: 200
});

$('#folioTerm').on('change', function(event) {
	alert("Hey there! This is a message from the MyGS Custom Layout Chrome Extension. Unfortunately, the extension currently breaks the Folio semester dropdown. But no worries, just refresh the page once you've picked your semester and it will display.");
});

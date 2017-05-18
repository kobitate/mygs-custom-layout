var customLayout;

function init() {
	chrome.storage.sync.get("portal-layout", function(data) {
		if (data["portal-layout"] == undefined) {
			console.log("Initializing MyGS Custom Layout");
			console.log(data);
			saveLayout();
		}
		else {
			console.log(data);
			$.each(data["portal-layout"], function(columnIndex, column) {
				$.each(column, function(channelIndex, channel) {
					var channelPanel = $('.channel-id-'+ channel);
					channelPanel.appendTo($(".portal-column").get(columnIndex));
				});
			});
		}
	});
}

function prepPage() {
	$(".col-sm-6.col-md-3").addClass("portal-column");
	$(".panel.panel-primary").each(function() {
		$(this).addClass("channel");
		var channel = $(this).find("[id^=Channel]");

		if (channel.length > 0) {
			var split = channel.attr("id").split("_");
			$(this).addClass("channel-id-" + split[1]);
			$(this).data("channel-id", split[1]);
		}
		else {
			var title = $(this).find("h2").text();
			if (title == "My Messages & Alerts") {
				$(this).addClass("channel-id-msg");
			$(this).data("channel-id", "msg");
			}
		}
	});

	init();
}

function getLayout() {
	// first column
	var col = 0;

	// object to build new layout
	var newLayout = {};

	// loop through columns
	$(".portal-column").each(function(){
		var colIndex = String(col);
		// prepare array of channel id's
		newLayout[colIndex] = [];
		// loop through channels in column
		$(this).find(".channel").each(function(){
			// channel number from channel-outer div
			var channelID = $(this).data("channel-id");

			// add channel number to array
			newLayout[colIndex].push(channelID);
		});
		// prepare for next column
		col++;
	});

	// return the object we built
	return newLayout;
}

function saveLayout() {
	var layout = getLayout();
	chrome.storage.sync.set({"portal-layout": layout}, function() {});
}


prepPage();

$(".portal-column").sortable({
	items: ".channel",
	connectWith: ".portal-column",
	handle: ".panel-heading",
	stop: function() {
		saveLayout();
	},
	revert: 200
});

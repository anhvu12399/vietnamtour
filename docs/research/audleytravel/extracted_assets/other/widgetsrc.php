var __riqLogs = { info: [], debug: [], timings: [] };
                var ts = [];ts.push({"timeStamp": "1782919526", "line": 6});ts.push({"timeStamp": "1782919526", "line": 24});function storageAvailable(type) {
					var storage;
					try {
						storage = window[type];
						var x = "__storage_test__";
						storage.setItem(x, x);
						storage.removeItem(x);
						return true;
					} catch (e) {
						return (
							e instanceof DOMException &&
							// everything except Firefox
							(e.code === 22 ||
								// Firefox
								e.code === 1014 ||
								// test name field too, because code might not be present
								// everything except Firefox
								e.name === "QuotaExceededError" ||
								// Firefox
								e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
							storage &&
							storage.length !== 0
						);
					}
				}ts.push({"timeStamp": "1782919526", "line": 417});ts.push({"timeStamp": "1782919526", "line": 419});function failsafeJsonParse(value, failsafeReturnValue) {
		var tmp = failsafeReturnValue ? failsafeReturnValue : {};

		try {
			tmp = JSON.parse(value);
		} catch (err) {}

		return tmp;
	}

	function fetchRiqData() {
		return typeof localStorage !== "undefined" &&
			localStorage &&
			localStorage.getItem
			? failsafeJsonParse(localStorage.getItem("__riq"), "{}")
			: null;
	}function createInstallationCode(visitorSession) {
			var args = Object.keys(visitorSession).map(function(key) {
				return encodeURIComponent(key) + "=" + encodeURIComponent(visitorSession[key]);
			});
		
			var queryString = args.join("&");
			if (queryString === "") {
				return "https://app.responseiq.com/widgetsrc.php?noCookieFlow=true&widget=K417JQ1I431Z&widgetrnd=0.21142215243620033";
			} else {
				return "https://app.responseiq.com/widgetsrc.php?noCookieFlow=true&widget=K417JQ1I431Z&widgetrnd=0.21142215243620033&" + queryString;
			}
		}
		
		function injectWidgetScript(visitorSession) {
			var url = createInstallationCode(visitorSession);
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = url;
		
			var head = document.getElementsByTagName("head");
		
			if (head) {
				head[0].appendChild(script);
			} else {
			// TODO: add <head> in this case
				throw new Error("RIQ> No <head> element present, aborting...");
			}
		}
		var riqData = fetchRiqData();
		injectWidgetScript(riqData && riqData.visitorSession ? riqData.visitorSession : {});
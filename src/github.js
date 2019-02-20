var urls = [], langs = [], counts = {}, colors = {}, total = 0, result = "", div = null;

window.onload = function() {
	if (document.getElementsByClassName("p-nickname vcard-username d-block").length === 0 && 
		document.getElementsByClassName("pagehead-tabs-item selected").length === 0) return;

	var user = inUserPage() ? document.getElementsByClassName("p-nickname vcard-username d-block")[0].innerText : document.getElementsByClassName("pagehead-tabs-item selected")[0].href.split("/")[3],
		cv = document.createElement("canvas"),
		ctx = cv.getContext("2d");

	div = document.createElement("div");
	div.className = "border-top py-3 clearfix";

	Promise.resolve().then(
		repos(inUserPage() ? "users" : "orgs", user)
	).then(function() {
		switch(inUserPage()) {
			case true: {
				var profile = document.getElementsByClassName("h-card col-3 float-left pr-3")[0];
				profile.appendChild(div);
				break;
			}
			case false: {
				var box = document.getElementsByClassName("Box-body")[0];
				div.className = "py-3 clearfix";
				div.style = "padding-bottom: 0 !important;";
				box.appendChild(div);
				break;
			}
		}
		// div.appendChild(cv);
	}).catch(function(error) {
		console.log("error: " + error)
	});
}

function inUserPage() {
	return document.getElementsByClassName("p-nickname vcard-username d-block").length !== 0;
}

function repos(mode, name) {
	fetch("https://api.github.com/" + mode + "/" + name + "/repos")
		.then(res => res.json())
		.then(json => {
			for (var i = 0; i < json.length; i++) urls.push(json[i].languages_url);
		})
		.then(function() {
			putLangs();
		})
		.then(function() {
			setTimeout(function() {
				count();
			}, 1000)
		});
}

function putLangs() {
	for (var i = 0; i < urls.length; i++) {
		fetch(urls[i])
			.then(res => res.json())
			.then(json => {
				var keys = Object.keys(json);
				for (var i = 0; i < keys.length; i++) {
					langs.push(keys[i]);
					// console.log(urls[i] + ", " + keys[i] + ", " + json[keys[i]]);
				}
			});
	}
	// console.log(langs);
}

function count() {
	for (var i = 0; i < langs.length; i++) {
		var key = langs[i];
		counts[key] = (counts[key]) ? counts[key] + 1 : 1 ;
	}
	for (var key in counts) {
		// console.log(key + " : " + counts[key]);
		total += counts[key];
	}

	var title = document.createElement("h2"), ul = document.createElement("ul");

	// getColors();
	ul.className = "vcard-details mb-3";
	for (var key in counts) {
		var li = document.createElement("li"), spn = document.createElement("span"), name = key;
		li.className = "vcard-detail pt-1 css-truncate css-truncate-target";

		li.style = "padding: 0 3px;";

		spn.innerText = name + ": " + parseFloat(counts[name]/total*100).toFixed(2) + "%";

		// spn.addEventListener("mouseover", function(){ this.style.boxShadow = "0 11px 0 " + colors[name]; console.log(name + ", " + colors[name]); });
		// spn.addEventListener("mouseout", function(){ this.style.boxShadow = ""; });

		li.appendChild(spn);
		ul.appendChild(li);
		// result += key + ": " + Math.round(counts[key]/total*100) + "%\n";
	}
	// console.log(result);

	title.className = inUserPage() ? "mb-1 h4" : "f4 mb-2 text-normal";
	title.innerText = inUserPage() ? "Language Ratio" : "Ratio";

	div.appendChild(title);
	div.appendChild(ul);
}

function getColors() {
	fetch("https://raw.githubusercontent.com/doda/github-language-colors/master/colors.json")
		.then(res => res.json())
		.then(json => {
			colors = json;
			// console.log(colors);
		});
}

function draw(ctx) {
	/*var xmlhttp = createXMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				var data = JSON.parse(xmlhttp.responseText);

				// ctx.fillStyle="#3f3f3f";
				// ctx.fillRect(2, 2, 225, 30)
			} else {
			}
		}
	}
	xmlhttp.open("GET", "https://raw.githubusercontent.com/doda/github-language-colors/master/colors.json");
	xmlhttp.send();*/
}
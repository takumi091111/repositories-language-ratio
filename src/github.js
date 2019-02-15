var urls = [], langs = [], counts = {}, total = 0, result = "", div = null;

window.onload = function() {
	if (document.getElementsByClassName("p-nickname vcard-username d-block").length === 0) return;

	var user = document.getElementsByClassName("p-nickname vcard-username d-block")[0].innerText;
		profile = document.getElementsByClassName("h-card col-3 float-left pr-3")[0],
		cv = document.createElement("canvas"),
		ctx = cv.getContext("2d");

	div = document.createElement("div");
	div.className = "border-top py-3 clearfix";

	Promise.resolve().then(
		repos(user)
	).catch(function(error) {
		console.log("error = " + error)
	});

	// div.appendChild(cv);
	profile.appendChild(div);
}

function repos(name) {
	fetch("https://api.github.com/users/" + name + "/repos")
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
			}, 500)
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
					// console.log(keys[i] + ", " + json[keys[i]]);
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

	var title = document.createElement("h2"),
		txt = document.createElement("span");

	for (var key in counts) result += key + ": " + Math.round(counts[key]/total*100) + "%\n";
	// console.log(result);

	title.className = "mb-1 h4";
	title.innerText = "Language Ratio";

	txt.className = "p-label";
	txt.innerText = result;

	div.appendChild(title);
	div.appendChild(txt);
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
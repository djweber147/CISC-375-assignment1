var req = new XMLHttpRequest();
req.onreadystatechange = function() {
	if (req.readyState == 4 && req.status == 200) {
		var obj = JSON.parse(req.response);
		console.log(obj.name);
		console.log(obj.birth_year);
		
		var req2 = new XMLHttpRequest();
		req2.onreadystatechange = function() {
			if (req2.readyState == 4 && req2.status == 200) {
				var obj2 = JSON.parse(req2.response);
				console.log(obj2.name);
			}
		};
		req2.open("GET", obj.homeworld, true);
		req2.send();
		
		for (var i=0; i<obj.films.length; i++) {
			var req3 = new XMLHttpRequest();
			req3.onreadystatechange = function() {
				if (req3.readyState == 4 && req3.status == 200) {
					var obj3 = JSON.parse(req3.response);
					console.log(obj3.title);
				}
			};
			req3.open("GET", obj.films[i], true);
			req3.send();
		}
		
	}
};
req.open("GET", "https://swapi.co/api/people/1/", true);
req.send();



function myfunc() {
	var p_new = document.createElement("li");
	p_new.textContent = "🙃";
	document.getElementById("emojis").appendChild(p_new);
}

function chaos() {
	var mycolor = '#'+Math.floor(Math.random()*16777215).toString(16);
	document.getElementById("mainbody").style.backgroundColor = mycolor;
}

function sillyP() {
	var mycolor = '#'+Math.floor(Math.random()*16777215).toString(16);
	var ps = document.getElementsByTagName("p");
	for (var i = 0; i < ps.length; i++) {
		ps[i].addEventListener("click", (event) => { event.target.style.color = '#'+Math.floor(Math.random()*16777215).toString(16); });
	}
}
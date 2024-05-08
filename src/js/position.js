const positions = {
	// [lat, long]
	EUROPE: [54.891168, 25.300284], //Purnuškės, Lithuania
	AFRICA: [1.61804, 18.05981], //Impfondo, Congo
	ASIA: [43.825592, 87.616852], //Urumqi, Xinjiang, China
	AMERICAS: [19.432608, -99.133209], //Mexico City, Mexico
	OCEANIA: [-9.47723, 147.15089], //Port Moresby, Papua New Guinea
};

function distanceBetweenPoints([lat1, long1], [lat2, long2]) {
	let R = 6371; //Earth diameter in km

	lat1 = degrees_to_radians(lat1);
	lat2 = degrees_to_radians(lat2);
	long1 = degrees_to_radians(long1);
	long2 = degrees_to_radians(long2);

	let dlat = lat2 - lat1;
	let dlong = long2 - long1;

	//using haversine formula
	let a =
		Math.pow(Math.sin(dlat / 2), 2) +
		Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlong / 2), 2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	console.log(a)
	return R * c; // km
}

function degrees_to_radians(degrees) {
	return degrees * (Math.PI / 180);
}

console.log(distanceBetweenPoints(positions["ASIA"], positions["EUROPE"]));

var continentName =
	document.getElementsByClassName("current-nav")[0].textContent;

var pagePos = document.getElementsByClassName("distance-from-continent")[0];

// console.log(continentName);
// console.log(pagePos);

navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position) {
	let lat1 = position.coords.latitude;
	let long1 = position.coords.longitude;

	let pos2 =
		positions[
			continentName
				.toUpperCase()
		];

	// console.log(lat1)
	// console.log(long1)

	let distance = distanceBetweenPoints([lat1, long1], pos2);
	pagePos.innerHTML =
		"You are approximately " +
		Math.round(distance) +
		" km away from the center of " +
		continentName +
		".";
}

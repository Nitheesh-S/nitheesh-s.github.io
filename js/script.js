let geoStatusEl = document.getElementById('status');
let getCoordinatesEl = document.getElementById('get-coordinates');

const success = (position) => {
	console.log('position :', position);
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	geoStatusEl.innerHTML = `latitude: ${latitude} & longitude: ${longitude}`;
};

const error = () => {
	console.log('error :', error);
	geoStatusEl.innerHTML = 'Unable to retrieve your location';
};

getCoordinatesEl.onclick = function () {
	navigator.geolocation.getCurrentPosition(success);
};

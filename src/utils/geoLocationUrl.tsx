export function latlonToURL(lat: number, lon: number) {
  const directions = ["N", "S", "E", "W"];

  const absLat = Math.abs(lat);
  const latDegrees = Math.floor(absLat);
  const latMinutes = Math.floor((absLat - latDegrees) * 60);
  const latSeconds =
    Math.round((absLat - latDegrees - latMinutes / 60) * 3600 * 10) / 10;
  const latDirection = directions[lat < 0 ? 1 : 0];

  const absLon = Math.abs(lon);
  const lonDegrees = Math.floor(absLon);
  const lonMinutes = Math.floor((absLon - lonDegrees) * 60);
  const lonSeconds =
    Math.round((absLon - lonDegrees - lonMinutes / 60) * 3600 * 10) / 10;
  const lonDirection = directions[lon < 0 ? 3 : 2];

  // return {
  //   latitude: `${latDegrees}%C2%B0${latMinutes}'${latSeconds}%22${latDirection}`,
  //   longitude: `${lonDegrees}%C2%B0${lonMinutes}'${lonSeconds}%22${lonDirection}`,
  // };

  return `https://www.google.com/maps/place/${latDegrees}%C2%B0${latMinutes}'${latSeconds}%22${latDirection}+${lonDegrees}%C2%B0${lonMinutes}'${lonSeconds}%22${lonDirection}/@${lat},${lon},21z/data=!4m4!3m3!8m2!3d${lat}!4d${lon}?entry=ttu`;
}

// Example usage
// const latitude = 23.317819161822136;
// const longitude = 78.08501840028043;

// const coordinates = decimalToDMS(latitude, longitude);

// console.log("Latitude:", coordinates.latitude);
// console.log("Longitude:", coordinates.longitude);

// `https://www.google.com/maps/place/${latDegrees}%C2%B0${latMinutes}'${latSeconds}%22${latDirection}+${lonDegrees}%C2%B0${lonMinutes}'${lonSeconds}%22${lonDirection}/@${latitude},${longitude},21z/data=!4m4!3m3!8m2!3d${latitude}!4d${longitude}?entry=ttu`;

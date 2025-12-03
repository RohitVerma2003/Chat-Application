export function extractTime(dateString) {
	const date = new Date(dateString);

	let hours = date.getHours();
	const minutes = padZero(date.getMinutes());

	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12 || 12;

	return `${hours}:${minutes} ${ampm}`;
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}
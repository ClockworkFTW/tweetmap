import axios from "axios";

const KEY = "AIzaSyA2HVmCDtmeYhg9jgLRUtYEb40rfXiyu4w";

const getCoords = async address => {
	const result = await axios.get(
		"https://maps.googleapis.com/maps/api/geocode/json",
		{ params: { address, key: KEY } }
	);
	return result.data;
};

export default { getCoords };

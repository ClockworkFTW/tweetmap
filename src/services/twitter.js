import axios from "axios";

const KEY = "T7vMQVw2hYNzIcnh2d7JhCLVA";
const SECRET = "6nfklNJ42bs9sF8aWqjuIP752Npj4sVl7JqQK4jQMFCsNgHJ5Z";
const ENCODEDKEY = btoa(`${KEY}:${SECRET}`);
const basic = `Basic ${ENCODEDKEY}`;

let token = null;

const getToken = async () => {
	const cachedToken = window.localStorage.getItem("twitterToken");
	if (cachedToken) {
		// Set token if present in local storage
		token = cachedToken;
	} else {
		// Otherwise fetch token from twitter
		const result = await axios.post(
			"https://cors-anywhere.herokuapp.com/https://api.twitter.com/oauth2/token",
			"grant_type=client_credentials",
			{
				headers: {
					"Content-Type":
						"application/x-www-form-urlencoded;charset=UTF-8",
					Authorization: basic
				}
			}
		);
		const fetchedToken = result.data.access_token;
		window.localStorage.setItem("twitterToken", fetchedToken);
		token = fetchedToken;
	}
};

const getTweets = async (term, max_id) => {
	const result = await axios.get(
		"https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json",
		{
			headers: { Authorization: `Bearer ${token}` },
			params: {
				q: `${term} AND -filter:retweets AND -filter:replies`,
				count: 100,
				max_id
			}
		}
	);
	return result.data.statuses;
};

export default { getToken, getTweets };

import Bottleneck from "bottleneck";
import twitterServices from "../services/twitter";
import geocodeServices from "../services/geocode";

const colors = [
	"#2196F3",
	"#4CAF50",
	"#FFC107",
	"#E91E63",
	"#03A9F4",
	"#8BC34A",
	"#FF9800",
	"#9C27B0",
	"#00BCD4",
	"#FF5722",
	"#673AB7",
	"#009688",
	"#FFEB3B",
	"#f44336",
	"#3F51B5",
	"#CDDC39"
];

const FETCH_TWEETS_PENDING = "FETCH_TWEETS_PENDING";
const FETCH_TWEETS_SUCCESS = "FETCH_TWEETS_SUCCESS";
const FETCH_TWEETS_ERROR = "FETCH_TWEETS_ERROR";

const fetchTweetsPending = (status, message, progress) => ({
	type: FETCH_TWEETS_PENDING,
	pending: { status, message, progress }
});

const fetchTweetsSuccess = tweets => ({
	type: FETCH_TWEETS_SUCCESS,
	tweets
});

const fetchTweetsError = error => ({
	type: FETCH_TWEETS_ERROR,
	error
});

export const fetchTweets = (term, requests) => async dispatch => {
	// Dispatch pending status
	dispatch(fetchTweetsPending(true, "Initializing request", 0));
	try {
		// Fetch and trim tweets
		let tweets = [];
		let max_id = null;
		for (let i = 0; i < requests; i++) {
			const data = await twitterServices.getTweets(term, max_id);
			tweets = [...tweets, ...data];
			max_id = data[data.length - 1].id;
			dispatch(fetchTweetsPending(true, "Fetching tweets", i / requests));
		}
		tweets = tweets.filter(
			tweet =>
				tweet.user.location.length !== 0 &&
				tweet.lang !== "und" &&
				tweet.lang !== "in"
		);

		// Set limiter for Google Geocode API
		const limiter = new Bottleneck({
			minTime: 100
		});

		// Fetch locations
		const promises = tweets.map(
			async (tweet, index) =>
				await limiter.schedule(() => {
					dispatch(
						fetchTweetsPending(
							true,
							"Fetching locations",
							index / tweets.length
						)
					);
					return geocodeServices.getCoords(tweet.user.location);
				})
		);
		const locations = await Promise.all(promises);

		// Merge tweets with locations
		tweets = tweets
			.map((tweet, index) => ({
				...tweet,
				location: locations[index]
			}))
			.filter(tweet => tweet.location.status === "OK");

		// Assign color to tweet language
		let languages = [];
		tweets.forEach(tweet => {
			if (!languages.includes(tweet.lang)) {
				languages.push(tweet.lang);
			}
		});
		languages = languages.map((language, index) => ({
			name: language,
			color: colors[index]
		}));
		tweets = tweets.map(tweet => ({
			...tweet,
			lang: languages.find(language => language.name === tweet.lang)
		}));

		// Dispatch data if successful
		dispatch(fetchTweetsSuccess(tweets));
	} catch (error) {
		// Dispatch error if error
		dispatch(fetchTweetsError(error));
	}
};

const INITIAL_STATE = {
	pending: {
		status: false,
		progress: 0,
		message: ""
	},
	data: [],
	error: null
};

const tweetsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_TWEETS_PENDING:
			return { ...state, pending: { ...action.pending } };
		case FETCH_TWEETS_SUCCESS:
			return {
				...state,
				data: action.tweets,
				pending: INITIAL_STATE.pending
			};
		case FETCH_TWEETS_ERROR:
			return {
				...state,
				error: action.error,
				pending: INITIAL_STATE.pending
			};
		default:
			return state;
	}
};

export default tweetsReducer;

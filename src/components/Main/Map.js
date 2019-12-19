import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ReactMapGL, { Marker } from "react-map-gl";

import { setViewport } from "../../reducers/viewportReducer";

const TOKEN =
	"pk.eyJ1IjoiY2xvY2t3b3JrZnR3IiwiYSI6ImNrM3o4NzlqbTA3ZTgzcG9rZ2V1bHo0c2kifQ.4lhOcE8zJZYYGLGuZYOX4Q";
const STYLE = "mapbox://styles/mapbox/light-v10";

const MarkerIcon = styled.div`
	width: 8px;
	height: 8px;
	transform: ${props => (props.focus ? "scale(2)" : "scale(1)")};
	border-radius: 100px;
	border: ${props => (props.focus ? "1px solid #2d3539" : "none")};
	background: ${props => props.color};
	transition: all 0.4s ease-in-out;
`;

const Map = ({ viewport, setViewport, tweets, focus }) => {
	// Update map viewport on change
	const onViewportChange = viewport => {
		const { width, height, ...etc } = viewport;
		setViewport(etc);
	};

	return (
		<ReactMapGL
			width="100%"
			height="100%"
			{...viewport}
			onViewportChange={viewport => onViewportChange(viewport)}
			mapboxApiAccessToken={TOKEN}
			mapStyle={STYLE}
		>
			{tweets.map(tweet => {
				const {
					lat,
					lng
				} = tweet.location.results[0].geometry.location;
				return (
					<Marker latitude={lat} longitude={lng}>
						<MarkerIcon
							focus={focus === tweet.id}
							color={tweet.lang.color}
						/>
					</Marker>
				);
			})}
		</ReactMapGL>
	);
};

const filterTweets = ({ tweets, filter }) =>
	filter === "all"
		? tweets.data
		: tweets.data.filter(tweet => tweet.lang.name === filter);

const mapStateToProps = state => ({
	viewport: state.viewport,
	tweets: filterTweets(state),
	focus: state.focus
});

export default connect(mapStateToProps, { setViewport })(Map);

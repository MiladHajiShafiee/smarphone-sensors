import React, { Component } from "react";
import {
	Text,
	View,
	Image,
	StyleSheet,
	NativeModules,
	DeviceEventEmitter
} from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from "react-native-responsive-screen";

import BackButton from "./BackButton";

const deviceImage = require("../assets/images/android.png");
const handImage = require("../assets/images/hand2.png");

const sensors = NativeModules.SensorManager;

export default class Proximity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			distance: 0,
			isNear: false,
			maxRange: 1
		};
	}
	componentWillMount() {
		sensors.startProximity(100);
		DeviceEventEmitter.addListener("Proximity", data => {
			this.setState({
				distance: data.value,
				maxRange: data.maxRange,
				isNear: data.isNear
			});
		});
	}
	componentWillUnmount() {
		sensors.stopProximity();
	}
	render() {
		const { distance, maxRange } = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<BackButton history={this.props.history} />
					<Image source={deviceImage} style={styles.image} />
					<Image
						source={handImage}
						style={[
							styles.handImage,
							{
								left: wp(`${3 * (11 - distance)}%`),
								top: hp(`${3 * distance}%`)
							}
						]}
					/>
				</View>
				<View style={styles.dataCard}>
					<Text style={styles.dataCardText}>Object Distance : </Text>
					<Text style={styles.num}>
						{Math.round(distance * 1000000) / 1000000}
					</Text>
					<Text style={{ color: "white", fontSize: hp("2.5%") }}>cm</Text>
				</View>
				<View style={styles.dataCard}>
					<Text style={styles.dataCardText}>Device Max Range : </Text>
					<Text style={styles.num}>{maxRange}</Text>
					<Text style={{ color: "white", fontSize: hp("2.5%") }}>cm</Text>
				</View>
				<View style={styles.dataCard}>
					<Text style={styles.dataCardText}>Is Object Near : </Text>
					<Text
						style={[
							styles.isNearText,
							{ backgroundColor: this.state.isNear ? "#79e627" : "gray" }
						]}
					>
						It is {this.state.isNear ? null : "Not"} Near
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-evenly"
	},
	imageContainer: {
		elevation: 5,
		width: wp("90%"),
		height: hp("45%"),
		alignItems: "center",
		borderRadius: hp("5%"),
		justifyContent: "center",
		backgroundColor: "white"
	},
	image: {
		width: "90%",
		height: "90%",
		resizeMode: "contain"
	},
	dataCard: {
		elevation: 3,
		width: wp("90%"),
		height: hp("10%"),
		flexDirection: "row",
		alignItems: "center",
		borderRadius: hp("1%"),
		backgroundColor: "#eba844",
		justifyContent: "space-evenly"
	},
	dataCardText: {
		color: "white",
		fontSize: hp("2.5%"),
		fontWeight: "bold"
	},
	num: {
		width: "30%",
		color: "white",
		fontSize: hp("2%")
	},
	luxHeader: {
		color: "black",
		fontWeight: "bold",
		fontSize: hp("3%")
	},
	lux: {
		color: "gray",
		width: wp("90%"),
		fontSize: hp("2%"),
		textAlign: "justify"
	},
	handImage: {
		width: wp("20%"),
		height: hp("10%"),
		position: "absolute",
		resizeMode: "contain"
	},
	isNearText: {
		color: "white",
		width: wp("30%"),
		padding: wp("2%"),
		fontWeight: "bold",
		fontSize: hp("2%"),
		textAlign: "center",
		borderRadius: wp("5%")
	}
});

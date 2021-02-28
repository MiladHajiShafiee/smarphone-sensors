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

const thermometerImage = require("../assets/images/thermometer2.png");

const sensors = NativeModules.SensorManager;

export default class Thermometer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sensorData: 0
		};
	}
	componentWillMount() {
		sensors.startThermometer(100);
		DeviceEventEmitter.addListener("Thermometer", data => {
			this.setState({ sensorData: data.temp });
		});
	}
	componentWillUnmount() {
		sensors.stopThermometer();
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<BackButton history={this.props.history} />
					<Image source={thermometerImage} style={styles.image} />
				</View>
				<View style={styles.dataCard}>
					<Text style={styles.dataCardText}>Temperature : </Text>
					<Text style={styles.num}>
						{Math.round(this.state.sensorData * 1000000) / 1000000}
					</Text>
					<View style={{ flexDirection: "row" }}>
						<Text style={{ color: "white", fontSize: hp("1.5%") }}> o </Text>
						<Text style={{ fontSize: hp("2.5%"), color: "white" }}>C</Text>
					</View>
				</View>
				<View>
					<Text style={styles.luxHeader}>
						Can smartphones measure temperature?
					</Text>
					<Text style={styles.lux}>
						With the right app, your Android smartphone or tablet can function
						as a thermometer using your device's built-in temperature sensor.
						However, even if your mobile device is not equipped with a
						temperature sensor, there is still a way to get a decent temperature
						reading for the surrounding air
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
		fontSize: hp("2.5%")
	},
	lux: {
		color: "gray",
		width: wp("90%"),
		fontSize: hp("2%"),
		textAlign: "justify"
	}
});

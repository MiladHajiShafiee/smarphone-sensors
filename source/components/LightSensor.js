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

const lightImage = require("../assets/images/lightSensor3.png");

const sensors = NativeModules.SensorManager;

export default class LightSensor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sensorData: 0
		};
	}
	componentWillMount() {
		sensors.startLightSensor(100);
		DeviceEventEmitter.addListener("LightSensor", data => {
			this.setState({ sensorData: data.light });
		});
	}
	componentWillUnmount() {
		sensors.stopLightSensor();
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<BackButton history={this.props.history} />
					{this.state.sensorData !== 0 ? (
						<Image
							source={lightImage}
							style={[styles.image, { opacity: this.state.sensorData / 200 }]}
						/>
					) : (
						<Text style={{ fontSize: hp("5%"), fontWeight: "bold" }}>
							Completely Dark
						</Text>
					)}
				</View>
				<View style={styles.dataCard}>
					<Text style={styles.dataCardText}>Light Intensity : </Text>
					<Text style={styles.num}>
						{Math.round(this.state.sensorData * 1000000) / 1000000}
					</Text>
					<Text style={{ color: "white", fontSize: hp("2.5%") }}>Lux</Text>
				</View>
				<View>
					<Text style={styles.luxHeader}>What is Lux?</Text>
					<Text style={styles.lux}>
						The lux (symbol: lx) is the SI derived unit of illuminance and
						luminous emittance, measuring luminous flux per unit area. It is
						equal to one lumen per square metre. In photometry, this is used as
						a measure of the intensity, as perceived by the human eye, of light
						that hits or passes through a surface.
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
	}
});

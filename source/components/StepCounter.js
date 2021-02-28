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

const stepCounterImage = require("../assets/images/step_counter3.png");

const sensors = NativeModules.SensorManager;

export default class StepCounter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sensorData: 0
		};
	}
	componentWillMount() {
		sensors.startStepCounter(100);
		DeviceEventEmitter.addListener("StepCounter", data => {
			this.setState({ sensorData: data.steps });
		});
	}
	componentWillUnmount() {
		sensors.stopStepCounter();
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<BackButton history={this.props.history} />
					<Image source={stepCounterImage} style={styles.image} />
				</View>
				<View style={styles.dataCard}>
					<Text style={styles.dataCardText}>Steps : </Text>
					<Text style={styles.num}>{this.state.sensorData}</Text>
				</View>
				<View>
					<Text style={styles.luxHeader}>How does a step counter work?</Text>
					<Text style={styles.lux}>
						This is pretty much how a pedometer works. Pedometers can measure
						your steps because your body swings from side to side as you walk.
						Each swing counts as one step. Multiplying the number of "swings" by
						the average length of your steps tells you how far you've gone
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
		width: "75%",
		height: "75%",
		borderRadius: hp("50%"),
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
		width: "20%",
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

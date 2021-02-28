import React, { Component } from "react";
import {
	Text,
	View,
	Image,
	StyleSheet,
	NativeModules,
	TouchableOpacity,
	DeviceEventEmitter
} from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from "react-native-responsive-screen";

import BackButton from "./BackButton";

const sensors = NativeModules.SensorManager;

const orientationImage = require("../assets/images/orientation3.png");

export default class Orientation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pitch: 0,
			roll: 0,
			azimuth: 0
		};
	}
	componentWillMount() {
		sensors.startOrientation(100);
		DeviceEventEmitter.addListener("Orientation", data => {
			this.setState({
				pitch: Math.round(data.pitch * 1000000000) / 1000000000,
				roll: Math.round(data.roll * 1000000000) / 1000000000,
				azimuth: Math.round(data.azimuth * 1000000000) / 1000000000
			});
		});
	}
	componentWillUnmount() {
		sensors.stopOrientation();
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<BackButton history={this.props.history} />
					<Image source={orientationImage} style={styles.image} />
				</View>
				<View style={styles.dataCard}>
					<View
						style={[
							styles.flash,
							{
								backgroundColor: this.state.pitch === 0 ? "black" : "#79e627"
							}
						]}
					/>
					<Text style={styles.dataCardText}>Pitch : </Text>
					<Text style={styles.num}> {this.state.pitch}</Text>
					<Text style={{ color: "white", fontSize: hp("1.5%") }}>degrees</Text>
				</View>
				<View style={styles.dataCard}>
					<View
						style={[
							styles.flash,
							{
								backgroundColor: this.state.pitch === 0 ? "black" : "#79e627"
							}
						]}
					/>
					<Text style={styles.dataCardText}>Roll : </Text>
					<Text style={styles.num}> {this.state.roll}</Text>
					<Text style={{ color: "white", fontSize: hp("1.5%") }}>degrees</Text>
				</View>
				<View style={styles.dataCard}>
					<View
						style={[
							styles.flash,
							{
								backgroundColor: this.state.pitch === 0 ? "black" : "#79e627"
							}
						]}
					/>
					<Text style={styles.dataCardText}>Azimuth: </Text>
					<Text style={styles.num}> {this.state.azimuth}</Text>
					<Text style={{ color: "white", fontSize: hp("1.5%") }}>degrees</Text>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.freezeButton}
						onPressOut={() => sensors.stopOrientation()}
					>
						<Text style={styles.freezeText}>Freeze</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.freezeButton}
						onPressOut={() => sensors.startOrientation(100)}
					>
						<Text style={styles.freezeText}>Reset</Text>
					</TouchableOpacity>
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
	buttonContainer: {
		width: wp("90%"),
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around"
	},
	freezeButton: {
		elevation: 5,
		width: wp("25%"),
		height: hp("7%"),
		alignItems: "center",
		borderRadius: wp("2%"),
		justifyContent: "center",
		backgroundColor: "white"
	},
	freezeText: {
		color: "#e74c3c",
		fontWeight: "bold",
		fontSize: hp("2.5%")
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
		width: "70%",
		height: "80%",
		resizeMode: "contain"
	},
	dataCard: {
		elevation: 3,
		width: wp("90%"),
		flexDirection: "row",
		height: hp("10%"),
		alignItems: "center",
		borderRadius: hp("1%"),
		justifyContent: "space-evenly",
		backgroundColor: "#eba844"
	},
	flash: {
		width: wp("10%"),
		height: wp("10%"),
		borderRadius: hp("50%")
	},
	dataCardText: {
		color: "white",
		fontSize: hp("3%"),
		fontWeight: "bold"
	},
	num: {
		width: "35%",
		color: "white",
		fontSize: hp("2%")
	}
});

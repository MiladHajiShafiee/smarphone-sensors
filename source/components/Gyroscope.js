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

const gyroImage = require("../assets/images/gyroImage3.png");

export default class Gyroscope extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sensorDataX: 0,
			sensorDataY: 0,
			sensorDataZ: 0
		};
	}
	componentWillMount() {
		sensors.startGyroscope(100);
		DeviceEventEmitter.addListener("Gyroscope", data => {
			this.setState({
				sensorDataX: Math.round(data.x * 1000000000) / 1000000000,
				sensorDataY: Math.round(data.y * 1000000000) / 1000000000,
				sensorDataZ: Math.round(data.z * 1000000000) / 1000000000
			});
		});
	}
	componentWillUnmount() {
		sensors.stopGyroscope();
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<BackButton history={this.props.history} />
					<Image
						source={gyroImage}
						style={[
							styles.image,
							{
								transform: [
									{ rotateX: `${this.state.sensorDataX * 10}deg` },
									{ rotateY: `${this.state.sensorDataY * 10}deg` },
									{ rotateZ: `${this.state.sensorDataZ * 10}deg` }
								]
							}
						]}
					/>
				</View>
				<View style={styles.dataCard}>
					<View
						style={[
							styles.flash,
							{
								backgroundColor:
									this.state.sensorDataX === 0 ? "black" : "#79e627"
							}
						]}
					/>
					<Text style={styles.dataCardText}>X-axis: </Text>
					<Text style={styles.num}> {this.state.sensorDataX}</Text>
					<Text style={{ color: "white", fontSize: hp("2.5%") }}>rad/s</Text>
				</View>
				<View style={styles.dataCard}>
					<View
						style={[
							styles.flash,
							{
								backgroundColor:
									this.state.sensorDataX === 0 ? "black" : "#79e627"
							}
						]}
					/>
					<Text style={styles.dataCardText}>Y-axis: </Text>
					<Text style={styles.num}> {this.state.sensorDataY}</Text>
					<Text style={{ color: "white", fontSize: hp("2.5%") }}>rad/s</Text>
				</View>
				<View style={styles.dataCard}>
					<View
						style={[
							styles.flash,
							{
								backgroundColor:
									this.state.sensorDataX === 0 ? "black" : "#79e627"
							}
						]}
					/>
					<Text style={styles.dataCardText}>Z-axis: </Text>
					<Text style={styles.num}> {this.state.sensorDataZ}</Text>
					<Text style={{ color: "white", fontSize: hp("2.5%") }}>rad/s</Text>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.freezeButton}
						onPressOut={() => sensors.stopGyroscope()}
					>
						<Text style={styles.freezeText}>Freeze</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.freezeButton}
						onPressOut={() => sensors.startGyroscope(100)}
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
		height: "70%"
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

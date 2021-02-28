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

const compassImage = require("../assets/images/compass2.png");

const sensors = NativeModules.SensorManager;

export default class Magnetometer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sensorDataX: 1,
			sensorDataY: 0,
			sensorDataZ: 1,
			azimuth: 45
		};
	}
	componentWillMount() {
		sensors.startMagnetometer(100);
		DeviceEventEmitter.addListener("Magnetometer", data => {
			this.setState({
				sensorDataX: data.x,
				sensorDataY: data.y,
				sensorDataZ: data.z
			});
		});
		sensors.startOrientation(100);
		DeviceEventEmitter.addListener("Orientation", data => {
			this.setState({ azimuth: data.azimuth });
		});
	}
	componentWillUnmount() {
		sensors.stopMagnetometer();
		sensors.stopOrientation();
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.card}>
					<View style={styles.innerCards}>
						<Text style={styles.cardsText}>X :</Text>
						<Text
							style={{
								color: "white",
								width: wp("12%")
							}}
						>
							{Math.round(this.state.sensorDataX * 100) / 100}
						</Text>
						<Text style={styles.cardsText}>uT</Text>
					</View>
					<View style={styles.innerCards}>
						<Text style={styles.cardsText}>Y :</Text>
						<Text
							style={{
								color: "white",
								width: wp("12%")
							}}
						>
							{Math.round(this.state.sensorDataY * 100) / 100}
						</Text>
						<Text style={styles.cardsText}>uT</Text>
					</View>
				</View>
				<View style={styles.imageContainer}>
					<Text style={[styles.verticalDirection, { top: hp("1%") }]}>
						North
					</Text>
					<Text
						style={[
							styles.horizontalDirection,
							{ transform: [{ rotateZ: "-90deg" }], left: 0 }
						]}
					>
						West
					</Text>
					<Image
						source={compassImage}
						style={[
							styles.image,
							{
								transform: [
									{
										rotateZ: `${405 - Math.round(this.state.azimuth)}deg`
									}
								]
							}
						]}
					/>
					<Text
						style={[
							styles.horizontalDirection,
							{ transform: [{ rotateZ: "90deg" }], right: 0 }
						]}
					>
						East
					</Text>
					<Text style={[styles.verticalDirection, { top: hp("43.5%") }]}>
						South
					</Text>
				</View>
				<View style={styles.card}>
					<View style={styles.innerCards}>
						<Text style={styles.cardsText}>Z :</Text>
						<Text
							style={{
								color: "white",
								width: wp("12%")
							}}
						>
							{Math.round(this.state.sensorDataZ * 100) / 100}
						</Text>
						<Text style={styles.cardsText}>uT</Text>
					</View>
					<View style={styles.innerCards}>
						<Text style={styles.cardsText}>North :</Text>
						<Text
							style={{
								color: "white",
								width: wp("12%")
							}}
						>
							{Math.round(this.state.azimuth)}
						</Text>
						<Text
							style={{
								fontSize: hp("1.5%"),
								color: "white",
								paddingBottom: hp("2.5%")
							}}
						>
							o
						</Text>
					</View>
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
		width: wp("95%"),
		height: hp("50%"),
		alignItems: "center",
		borderRadius: hp("50%"),
		justifyContent: "space-evenly",
		backgroundColor: "white"
	},
	image: {
		width: "70%",
		height: "70%",
		borderRadius: hp("50%"),
		resizeMode: "contain"
	},
	verticalDirection: {
		color: "white",
		padding: hp("1.5%"),
		fontSize: hp("2%"),
		fontWeight: "bold",
		position: "absolute",
		borderRadius: hp("5%"),
		backgroundColor: "#79e627"
	},
	horizontalDirection: {
		top: hp("22%"),
		color: "white",
		padding: hp("1.5%"),
		fontSize: hp("2%"),
		fontWeight: "bold",
		position: "absolute",
		borderRadius: hp("5%"),
		backgroundColor: "#79e627"
	},
	card: {
		width: wp("90%"),
		height: hp("15%"),
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	innerCards: {
		width: wp("40%"),
		height: hp("10%"),
		alignItems: "center",
		flexDirection: "row",
		borderRadius: hp("3%"),
		backgroundColor: "#e74c3c",
		justifyContent: "space-evenly"
	},
	cardsText: {
		color: "white",
		fontSize: hp("2%"),
		fontWeight: "bold"
	}
});

import React, { Component } from "react";
import {
	Text,
	View,
	Image,
	StyleSheet,
	ScrollView,
	TouchableOpacity
} from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from "react-native-responsive-screen";

import { sensorsList } from "../assets/data";

export default class Home extends Component {
	render() {
		return (
			<ScrollView style={styles.container}>
				{sensorsList.map(sensor => {
					return (
						<View key={sensor.id} style={styles.sensorCard}>
							<View
								style={[
									styles.sensorCardImage,
									{ marginBottom: sensor.id === "8" ? hp("2%") : 0 }
								]}
							>
								<Image source={sensor.image} style={styles.sensorImage} />
								<Text style={styles.sensorTitile}>{sensor.name}</Text>
							</View>
							<View style={styles.sensorCardDescriptionContainer}>
								<Text style={styles.description}>Description</Text>
								<Text style={styles.sensorCardDescriptionText}>
									{" "}
									{sensor.description}{" "}
								</Text>
								<TouchableOpacity
									style={styles.button}
									onPress={() => this.props.history.push(sensor.address)}
								>
									<Text style={styles.buttonText}>Go to Sensor Page</Text>
								</TouchableOpacity>
							</View>
						</View>
					);
				})}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: wp("100%"),
		height: hp("100%")
	},
	sensorCard: {
		width: wp("95%"),
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "center",
		marginTop: hp("2%"),
		justifyContent: "space-evenly"
	},
	sensorCardImage: {
		elevation: 10,
		width: wp("40%"),
		height: hp("20%"),
		overflow: "hidden",
		borderColor: "orange",
		alignItems: "center",
		borderRadius: hp("3%"),
		backgroundColor: "white",
		justifyContent: "flex-end"
	},
	sensorImage: {
		width: "80%",
		height: "60%",
		resizeMode: "contain"
	},
	sensorTitile: {
		padding: wp("3%"),
		fontSize: hp("2.2%"),
		fontWeight: "bold"
	},
	sensorCardDescriptionContainer: {
		width: wp("50%"),
		height: hp("18%"),
		alignItems: "center",
		justifyContent: "space-between"
	},
	description: {
		width: "90%",
		fontSize: hp("2%"),
		fontWeight: "bold"
	},
	sensorCardDescriptionText: {
		width: "90%",
		color: "#929c95",
		fontSize: hp("1.7%"),
		textAlign: "justify"
	},
	button: {
		width: wp("35%"),
		height: hp("4%"),
		alignItems: "center",
		borderRadius: wp("5%"),
		justifyContent: "center",
		backgroundColor: "orange"
	},
	buttonText: {
		color: "white",
		fontSize: hp("1.5%")
	}
});

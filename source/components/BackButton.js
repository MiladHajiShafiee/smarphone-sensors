import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from "react-native-responsive-screen";

const backImage = require("../assets/images/back1.png");

const BackButton = props => {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => props.history.push("/Home")}
		>
			<Image source={backImage} style={styles.image} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		zIndex: 1,
		top: hp("3%"),
		left: wp("5%"),
		width: wp("15%"),
		height: hp("8%"),
		position: "absolute"
	},
	image: {
		width: "50%",
		height: "50%",
		resizeMode: "contain"
	}
});

export default BackButton;

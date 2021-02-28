import React from "react";
import Stack from "react-router-native-stack";
import { NativeRouter, Route } from "react-router-native";

import Home from "./components/Home";
import Splsh from "./components/Splash";
import Proximity from "./components/Proximity";
import Gyroscope from "./components/Gyroscope";
import LightSensor from "./components/LightSensor";
import StepCounter from "./components/StepCounter";
import Thermometer from "./components/Thermometer";
import Orientation from "./components/Orientation";
import Magnetometer from "./components/Magnetometer";
import Accelerometer from "./components/Accelerometer";

const App = () => {
	return (
		<NativeRouter>
			<Stack animationType="slide-horizontal">
				<Route exact path="/" component={Splsh} />
				<Route path="/Home" component={Home} />
				<Route path="/Proximity" component={Proximity} />
				<Route path="/Gyroscope" component={Gyroscope} />
				<Route path="/LightSensor" component={LightSensor} />
				<Route path="/StepCounter" component={StepCounter} />
				<Route path="/Thermometer" component={Thermometer} />
				<Route path="/Orientation" component={Orientation} />
				<Route path="/Magnetometer" component={Magnetometer} />
				<Route path="/Accelerometer" component={Accelerometer} />
			</Stack>
		</NativeRouter>
	);
};

export default App;

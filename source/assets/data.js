export const sensorsList = [
	{
		id: "1",
		name: "Gyroscope",
		image: require("./images/gyroscope.jpg"),
		address: "/Gyroscope",
		description:
			"The gyroscope allows you to determine the angular velocity of an Android device at any given instant."
	},
	{
		id: "2",
		name: "Accelerometer",
		image: require("./images/accelerometer1.png"),
		address: "/Accelerometer",
		description:
			"This sensor measure the acceleration force in m/s2 on all three physical axes (x, y, and z), including the force of gravity."
	},
	{
		id: "3",
		name: "Magnetometer",
		image: require("./images/magnetometer1.png"),
		address: "/Magnetometer",
		description:
			"Magnetic field sensors either utilize an internal magnet or directly detect a permanent or electromagnetic field."
	},
	{
		id: "4",
		name: "Orientation",
		image: require("./images/orientation1.png"),
		address: "/Orientation",
		description:
			"The orientation sensor is software-based and derives its data from the accelerometer and the geomagnetic field sensor."
	},
	{
		id: "5",
		name: "Proximity",
		image: require("./images/proximity.png"),
		address: "/Proximity",
		description:
			"A proximity sensor is a sensor able to detect the presence of nearby objects without any physical contact."
	},
	{
		id: "6",
		name: "Light Sensor",
		image: require("./images/lightSensor.jpg"),
		address: "/LightSensor",
		description:
			"It is a photodetector that is used to sense the amount of ambient light present, and appropriately dim the device's screen to match it."
	},
	{
		id: "7",
		name: "Step Counter",
		image: require("./images/step_counter1.png"),
		address: "/StepCounter",
		description:
			"Pedometers can measure your steps because your body swings from side to side as you walk. Each swing counts as one step."
	},
	{
		id: "8",
		name: "Thermometer",
		image: require("./images/thermometer.png"),
		address: "/Thermometer",
		description:
			"If your mobile device is not equipped with a temperature sensor, there is still a way to get a decent temperature reading for the surrounding air."
	}
	// {
	// 	id: "9",
	// 	name: "Maps",
	// 	image: require("./images/maps.png"),
	// 	address: "/Maps",
	// 	description:
	// 		"During a single sensor event the accelerometer returns acceleration force data for the three coordinate axes."
	// }
];

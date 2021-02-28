import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const techImage = require('../assets/images/technology5.png');

class Splash extends Component {
    goPage = () =>
        setTimeout(() => {
            this.props.history.push('/Home');
        }, 3000);
    componentDidMount() {
        this.goPage();
    }
    componentWillUnmount() {
        clearTimeout(this.goPage);
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={techImage} style={styles.techImage} />
                <Text style={styles.identification}>
                    Smartphone Sensors Project
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    techImage: {
        width: wp('80%'),
        height: hp('50%'),
        resizeMode: 'contain',
    },
    identification: {
        fontSize: hp('3%'),
        fontWeight: 'bold',
    },
});

export default Splash;

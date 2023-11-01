import React, { Component, useRef, useEffect } from 'react';
import {
    ActivityIndicator, Text, View, Image, Animated, TouchableHighlight
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './scripts/stylesheet.js'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: styles,
            isLoading: true,
        };
    }

    render() {
        return (
            <View style={[this.state.styles.backgroundScreen]}>
                <View style={{justifyContent:'center', flex:1}}>
                    <Text style={{ color: '#ffffff', fontSize: 40, textAlign:'center' }}>
                        home page
                    </Text>
                </View>
            </View>
        );
    }
}
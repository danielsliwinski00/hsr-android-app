
import React, { Component, useRef, useEffect } from 'react';
import {
    ActivityIndicator, Text, View, Image, Animated, TouchableHighlight
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './scripts/stylesheet.js'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './home.js';
import Characters from './characters.js';

const Drawer = createDrawerNavigator();

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: styles,
            isLoading: true,
            sidebar: false
        };
    }

    async componentDidMount() {
        this.setState({
            isLoading: false
        })

    }

    render() {
        if (this.state.isLoading == true) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color='black' />
                </View>
            );
        }
        return (
            <View style={[this.state.styles.backgroundScreen]}>
                <Drawer.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        drawerPosition: "left",
                        drawerInactiveTintColor: '#f1f1f1f',
                        drawerActiveBackgroundColor: '#8034eb',
                        drawerActiveTintColor: '#ffffff',
                        drawerStyle: {
                            backgroundColor: '#1f1f1f',
                        },
                    }}
                >
                    <Drawer.Screen
                        name="Home"
                        component={Home}
                        options={() => ({
                            headerTitle: 'Home',
                            headerTransparent: true,
                            headerTintColor: '#ffffff',
                        })}
                    />
                    <Drawer.Screen
                        name="Characters"
                        component={Characters}
                        options={() => ({
                            headerTitle: 'Characters',
                            headerTransparent: true,
                            headerTintColor: '#ffffff',
                        })}
                    />
                </Drawer.Navigator>
            </View>
        );
    }
}

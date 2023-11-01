import React, { Component, useRef, useEffect } from 'react';
import {
    ActivityIndicator, Text, View, Image, Animated, TouchableHighlight, FlatList
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './scripts/stylesheet.js'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import gameinfo from './scripts/gameinfo.js';

export default class Characters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: styles,
            isLoading: true,
            charactersList: gameinfo.characters
        };
    }

    componentDidMount(){
        console.log(this.state.charactersList)
    }

    render() {
        return (
            <View style={[this.state.styles.backgroundScreen]}>
                <View style={{justifyContent:'center', flex:1}}>
                <Image
                        style={{ height: 250, width: 'auto', marginTop: '20%' }}
                        source={{
                            uri:'https://qeircrvhglsvhgqicqdc.supabase.co/storage/v1/object/public/images/Characters/Blade/blade.png?t=2023-11-01T20%3A12%3A15.503Z'
                        }
                        }
                    />
                </View>
            </View>
        );
    }
}
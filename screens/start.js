
import React, { Component, useRef, useEffect } from 'react';
import {
    ActivityIndicator, Text, View, Image, Animated
} from 'react-native';
import { TouchableOpacity, TouchableHighlight, Touchable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './scripts/stylesheet.js'

export default class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: styles,
            isLoading: true,
            rememberMe: '[  ]',
            email: '',
            password: '',
        };
    }

    async signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: this.state.email,
            password: this.state.password,
        })
    }

    handleLoginScreen() {
        <View style={{
            flex: 1, zIndex: 100, backgroundColor: '#000000', position: 'absolute',
            x: 0, y: 0,
            transform: 'translateX(-100px)', duration: 500
        }}>
        </View>
        this.props.navigation.navigate('LogIn')
    }

    handleRememberMe() {
        if (this.state.rememberMe == '[  ]') {
            this.setState({
                rememberMe: '[X]'
            })
            AsyncStorage.setItem('rememberMe', 'true');
        }
        else {
            this.setState({
                rememberMe: '[  ]'
            })
            AsyncStorage.setItem('rememberMe', 'false');
        }
    }

    async componentDidMount() {
        if (await AsyncStorage.getItem('rememberMe') == 'true') {
            this.setState({
                rememberMe: '[X]',
            })
        }
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
                <View style={{ flex: 1 }}>
                    <Image
                        style={{ height: 250, width: 'auto', marginTop: '20%' }}
                        source={
                            require('./assets/images/Honkai-Star-Rail.png')
                        }
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{paddingTop: '25%' }}>
                        <TouchableHighlight
                            style={[this.state.styles.loginButtons, { backgroundColor: '#a7a7a7', borderColor: '#a7a7a7' }]}
                            onPress={()=>{this.props.navigation.navigate('Main')}}
                        >
                            <Text style={[this.state.styles.loginButtonsText]}>
                                Continue as guest
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[this.state.styles.loginButtons]}
                            onPress={() => { this.handleLoginScreen() }}
                        >
                            <Text style={[this.state.styles.loginButtonsText]}>
                                Log in
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[this.state.styles.loginButtons]}
                            onPress={() => { this.props.navigation.navigate('SignUp') }}
                        >
                            <Text style={[this.state.styles.loginButtonsText]}>
                                Sign up
                            </Text>
                        </TouchableHighlight>
                        <View
                            style={{
                                paddingVertical: 5, justifyContent: 'center',
                                paddingHorizontal: 15, margin: 2, flex: 1, flexDirection: 'row'
                            }}
                        >
                            <TouchableHighlight onPress={() => { this.handleRememberMe() }}>
                                <Text style={[this.state.styles.loginButtonsText, { fontSize: 18 }]}>
                                    {this.state.rememberMe}
                                </Text>
                            </TouchableHighlight>
                            <Text style={[this.state.styles.loginButtonsText, { marginLeft: 5, fontSize: 18 }]}>
                                Remember me
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

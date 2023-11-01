
import React, { Component } from 'react';
import {
    ActivityIndicator, Text, TextInput, View,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import validation from './scripts/validation.js';
import { supabase } from './scripts/supabase.js'
import styles from './scripts/stylesheet.js'


export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: styles,
            isLoading: true,
            email: '',
            password: '',
        };
    }

    async LogIn() {
        const { error } = await supabase.auth.signInWithPassword({
            email: this.state.email,
            password: this.state.password,
        })

        if (error) toast.show(error.message, { type: 'danger' })
        else{
    toast.show('successful login', {type: 'success'})}
    }

    validate() {
        if (this.validateEmail() && this.validatePassword() == true) {
            this.LogIn()
        }
        else if (!this.validateEmail()) {
            toast.show('Invalid email format', { type: 'danger' })
        }
        else if (!this.validatePassword()) {
            toast.show('Invalid password format', { type: 'danger' })
        }
        else if (!this.validatePassword() && !this.validateEmail()) {
            toast.show('Invalid email and password format', { type: 'danger' })
        }
        else {
            toast.show('Server Error', { type: 'caution' })
        }
    }

    validateEmail() {
        if (validation(this.state.email, 'email') == true) {
            return true;
        } else {
            toast.show('Invalid email', { type: 'danger' });
        }
    }

    validatePassword() {
        if (validation(this.state.password, 'password') == true) {
            return true;
        } else {
            toast.show('Invalid password', { type: 'danger' });
        }
    }

    handleEmail = (text) => {
        this.setState({ email: text });
    };

    handlePassword = (text) => {
        this.setState({ password: text });
    };

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
                <View style={{ flex: 1 }}>
                </View>
                <View style={{ flex: 1}}>
                    <View style={{ paddingTop: '40%', justifyContent:'center' }}>
                        <TextInput
                            style={[this.state.styles.loginTextInput]}
                            autoCapitalize="none"
                            placeholder="Email"
                            value={this.state.email}
                            onChangeText={this.handleEmail}
                        />
                        <TextInput
                            style={[this.state.styles.loginTextInput,]}
                            secureTextEntry
                            autoCapitalize="none"
                            placeholder="Password"
                            value={this.state.password}
                            onChangeText={this.handlePassword}
                        />
                        <TouchableOpacity
                            style={[this.state.styles.loginConfirmButton]}
                            onPress={() => { this.validate() }}>
                            <Text
                             style={[this.state.styles.loginConfirmButtonText]}
                            >
                                Log in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

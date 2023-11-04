
import React, { Component } from 'react';
import {
    ActivityIndicator, Text, TextInput, View, Modal
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import validation from './scripts/validation.js';
import { supabase } from './scripts/supabase.js'
import styles from './scripts/stylesheet.js';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: styles,
            isLoading: true,
            email: '',
            password: '',
            passwordRequirements: false,
        };
    }

    async signUp() {
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: this.state.email,
            password: this.state.password,
        })

        if (error) toast.show(error.message, { type: 'danger' });
        if (!session) toast.show('Please check your inbox for email verification!', { type: 'success' }, ()=>{this.props.navigation.navigate('LogIn')});
    }

    validate() {
        if (this.validateEmail() && this.validatePassword() == true) {
            this.signUp()
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
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000000' }}>
                    <ActivityIndicator size='large' color='#ffffff' />
                </View>
            );
        }
        return (
            <View style={[this.state.styles.backgroundScreen]}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.passwordRequirements}
                    onRequestClose={() => {
                        this.setState({ passwordRequirements: false });
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            z: 100
                        }}
                        activeOpacity={1}
                        onPress={() => { this.setState({ passwordRequirements: false }) }}
                    >
                        <View style={{
                            position: 'absolute',
                            backgroundColor: '#1f1f1f',
                            borderBottomRightRadius: 20,
                            borderTopLeftRadius: 20,
                            height: 200,
                            width: '80%',
                            top: 200,
                            right: '10%'
                        }}
                        >
                            <Text style={{ alignSelf: 'center', verticalAlign: 'middle', textAlign: 'center', textAlignVertical: 'center', fontSize: 18, color: '#ffffff', padding: 15 }}>
                                A password is required to have the following:
                                a capital letter, a lowercase letter, a number,
                                a special symbol and have a total length of 8 or more characters
                            </Text>
                            <TouchableOpacity
                                style={[this.state.styles.loginConfirmButton]}
                                onPress={() => { this.setState({ passwordRequirements: false }) }}
                            >
                                <Text style={[this.state.styles.loginConfirmButtonText]}>
                                    OK
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>

                <View style={{ flex: 1 }}>
                </View>
                <View style={{ flex: 2 }}>
                    <View style={{ paddingTop: '20%' }}>
                        <Text style={{ fontSize: 16, textAlign: 'center', color: '#ffffff', marginRight: '5%' }}>
                            Email
                        </Text>
                        <TextInput
                            style={[this.state.styles.loginTextInput]}
                            autoCapitalize="none"
                            placeholder="Email"
                            value={this.state.email}
                            onChangeText={this.handleEmail}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, textAlign: 'center', color: '#ffffff', marginRight: '5%' }}>
                                Password
                            </Text>
                            <TouchableOpacity onPress={() => { this.setState({ passwordRequirements: true }) }}>
                                <Text
                                    style={{ fontSize: 12, textAlign: 'center', color: 'red', paddingTop: 2 }}
                                >
                                    [View Requirements]
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={[this.state.styles.loginTextInput]}
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
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

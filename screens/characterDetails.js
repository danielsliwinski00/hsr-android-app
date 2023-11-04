import React, { Component, useRef, useEffect } from 'react';
import {
    ActivityIndicator, Text, View, Image, Animated, TouchableHighlight, FlatList
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './scripts/stylesheet.js'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import characters from './scripts/characters.js';
import { supabase } from './scripts/supabase.js';

export default class Characters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: styles,
            isLoading: true,
            supabasedata: null,
            character: '',
        };
    }

    async getData() {
        const { data, error } = await supabase
            .from('characters')
            .select('*')
            .eq('name', this.state.character)
        if (error) {
            Toast.show(error.message, { type: 'danger' })
        }
        if (data) {
            this.setState({ supabasedata: data, isLoading: false }, console.log(data))
        }
    }

    characterElement(element) {
        switch (true) {
            case element === 'Fire':
                return { color: '#e93537' };
            case element === 'Ice':
                return { color: '#8ad5f1' };
            case element === 'Imaginary':
                return ({ color: '#f6e44d' });
            case element === 'Lightning':
                return ({ color: '#c462e1' });
            case element === 'Physical':
                return ({ color: '#979799' });
            case element === 'Quantum':
                return ({ color: '#635dc9' });
            case element === 'Wind':
                return ({ color: '#60cf9a' });
            default:
                return ({ color: '#f1f1f1' });
        }
    }

    componentDidMount() {
        this.setState({
            character: this.props.route.params.character
        }, () => { this.getData() })
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
                <View style={{ flex: 2, justifyContent:'center' }}>
                    <Image
                        style={{ height: 'auto', width: '95%', aspectRatio: 1, alignSelf:'center' }}
                        source={{ uri: this.state.supabasedata[0].splash_path + '?time' + (new Date()).getTDime() }}
                    />
                </View>
                <View style={{ justifyContent: 'flex-start', flex: 1}}>
                    <Text style={[{ textAlign: 'center', fontSize: 26, marginTop: 4, color: '#ffffff' }, this.characterElement(this.state.supabasedata[0].element)]}>
                        {this.state.supabasedata[0].name}
                    </Text>
                </View>
            </View>
        );
    }
}
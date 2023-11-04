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
        };
    }

    async sortData() {
        await this.setState({
            supabasedata: this.state.supabasedata.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            })
        }, () => { this.setState({ isLoading: false }) })
    }

    async getData() {
        const { data, error } = await supabase
            .from('characters')
            .select('name, path, element, icon_path, path_icon, element_icon')
        if (error) {
            Toast.show(error.message, { type: 'danger' })
        }
        if (data) {
            this.setState({ supabasedata: data}, () => { this.sortData() })
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
        this.getData()
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
                <View style={{ justifyContent: 'center', flex: 1, marginTop: '15%' }}>
                    <FlatList
                        removeClippedSubviews={false}
                        scrollsToTop={false}
                        numColumns={2}
                        extraData={this.state.supabasedata}
                        bounces={false}
                        data={this.state.supabasedata}
                        keyExtractor={(item) => item.name}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        style={{ marginHorizontal: 15 }}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ backgroundColor: '#181818', borderRadius: 10, borderWidth: 2, borderColor: '#181818', padding: 10, width: '45%', marginVertical: 10 }}>
                                    <Image
                                        style={{ height: 135, width: 'auto', marginTop: 5 }}
                                        source={{ uri: item.icon_path + '?time' + (new Date()).getTime() }}
                                    />
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 3 }}>
                                            <Text style={[{ textAlign: 'center', fontSize: 18, marginTop: 4 }, this.characterElement(item.element)]}>
                                                {item.name}
                                            </Text>
                                            <Text style={[{ textAlign: 'center', fontSize: 12, marginTop: 4 }, this.characterElement(item.element)]}>
                                                {item.path}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Image
                                                style={{ height: 15, width: 15, marginTop: 5, alignSelf:'flex-end' }}
                                                source={{ uri: item.element_icon + '?time' + (new Date()).getTime() }}
                                            />
                                            <Image
                                                style={{ height: 15, width: 15, marginTop: 5,  alignSelf:'flex-end' }}
                                                source={{ uri: item.path_icon + '?time' + (new Date()).getTime() }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
            </View>
        );
    }
}
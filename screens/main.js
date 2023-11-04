
import React, { Component, useRef, useEffect } from 'react';
import {
    ActivityIndicator, Text, View, Image, TouchableHighlight, FlatList, SafeAreaView, ScrollView
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './scripts/stylesheet.js'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './home.js';
import Characters from './characters.js';
import CharacterDetails from './characterDetails.js';
import { supabase } from './scripts/supabase.js';
import Sidebar from './sidebar.js';

import Animated from 'react-native-reanimated';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

let supabasedata = []

function CustomDrawerContent({ navigation, focused, progress, ...rest }) {

    const [isOpenCharacters, openCharacters] = React.useState(false)
    const [isOpenHome, openHome] = React.useState(true)

    return (
        <DrawerContentScrollView {...rest}>
            <View>
                <View>
                    <TouchableOpacity style={[{ flex: 1, flexDirection: 'row', marginVertical: 2, marginHorizontal: 5, padding: 10, borderRadius: 10 },
                    isOpenHome ? { backgroundColor: '#8034eb' } : { backgroundColor: '#181818' }]}
                        onPress={() => { navigation.navigate('Home'), openCharacters(false), openHome(true) }}>
                        <Icon
                            style={{}}
                            name={isOpenHome ? 'home' : 'home-outline'}
                            size={22}
                            color={isOpenHome ? '#ffffff' : '#b3b3b3'}
                        />
                        <Text style={[{ marginLeft: 15, textAlign: 'center', fontSize: 18 }, isOpenHome ? { color: '#ffffff' } : { color: '#b3b3b3' }]}>
                            Home
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={[{ flex: 1, flexDirection: 'row', marginVertical: 2, marginHorizontal: 5, padding: 10, borderRadius: 10 },
                isOpenCharacters ? { backgroundColor: '#8034eb' } : { backgroundColor: '#181818' }]}
                    onPress={() => { openCharacters(!isOpenCharacters) }}>
                    <Icon
                        style={{ flex: 1 }}
                        name={isOpenCharacters ? 'person' : 'person-outline'}
                        size={22}
                        color={isOpenCharacters ? '#ffffff' : '#b3b3b3'}
                    />
                    <Text style={[{ marginLeft: 15, textAlign: 'left', fontSize: 18, flex: 8 }, isOpenCharacters ? { color: '#ffffff' } : { color: '#b3b3b3' }]}>
                        Characters
                    </Text>
                    <Icon
                        style={{ flex: 1 }}
                        name={isOpenCharacters ? 'arrow-up-circle' : 'arrow-down-circle-outline'}
                        size={22}
                        color={isOpenCharacters ? '#ffffff' : '#b3b3b3'}
                    />
                </TouchableOpacity>
                <View>
                    {isOpenCharacters ? (
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <FlatList
                                style={{ width: '100%' }}
                                removeClippedSubviews={false}
                                scrollsToTop={false}
                                extraData={supabasedata}
                                bounces={false}
                                horizontal={false}
                                contentContainerStyle={{ alignItems: "stretch" }}
                                data={supabasedata}
                                initialNumToRender={10}
                                keyExtractor={(item) => item.name}
                                renderItem={({ item }) => {
                                    if (item.name == 'All Characters') {
                                        return (
                                            <TouchableHighlight
                                                style={{
                                                    backgroundColor: '#181818', borderRadius: 10, width: '70%', alignSelf: 'flex-end', marginHorizontal: 4,
                                                    borderWidth: 2, borderColor: '#181818', padding: 5, marginTop: 4, backgroundColor: '#181818'
                                                }}
                                                onPress={() => { navigation.navigate('Characters'), openHome(false), openCharacters(false) }}
                                            >
                                                <Text style={[{ textAlign: 'center', fontSize: 16, margin: 2, color: '#ffffff' }]}>
                                                    {item.name}
                                                </Text>
                                            </TouchableHighlight>
                                        );
                                    }
                                    return (
                                        <TouchableHighlight
                                            style={{
                                                backgroundColor: '#181818', borderRadius: 10, width: '70%', alignSelf: 'flex-end', marginHorizontal: 4,
                                                borderWidth: 2, borderColor: '#181818', padding: 5, marginTop: 4, backgroundColor: '#181818'
                                            }}
                                            onPress={() => { openCharacters(false), openHome(false), navigation.navigate('CharacterDetails' + item.name, { character: item.name }) }}
                                        >
                                            <Text style={[{ textAlign: 'left', fontSize: 16, margin: 2, color: '#ffffff' }]}>
                                                {item.name}
                                            </Text>
                                        </TouchableHighlight>
                                    );
                                }}
                            />
                        </ScrollView>
                    ) : null}
                </View>
            </View>
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: styles,
            isLoading: true,
            supabasedata: null
        };
    }

    async sortData() {
        await this.setState({
            supabasedata: this.state.supabasedata.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            })
        }, () => { this.setState({ isLoading: false }) })
        supabasedata.unshift({ name: 'All Characters' })
    }

    async getData() {
        const { data, error } = await supabase
            .from('characters')
            .select('name')
        if (error) {
            Toast.show(error.message, { type: 'danger' })
        }
        if (data) {
            this.setState({ supabasedata: data, isLoading: false }, () => { this.sortData(), supabasedata = data })
        }
    }

    async componentDidMount() {
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
                <Drawer.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        drawerPosition: "left",
                        drawerActiveBackgroundColor: '#8034eb',
                        drawerActiveTintColor: '#ffffff',
                        drawerInactiveBackgroundColor: '#181818',
                        drawerInactiveTintColor: '#b3b3b3',
                        drawerStyle: {
                            backgroundColor: '#121212',
                            width: '80%'
                        },
                        swipeEdgeWidth: 300,
                    }}
                    drawerContent={props => <CustomDrawerContent {...props} />}
                >
                    <Drawer.Screen
                        name='Home'
                        component={Home}//home-outline
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
                    {
                        supabasedata.map((item) => {
                            return < Drawer.Screen
                                name={'CharacterDetails' + item.name}
                                key={item.name}
                                component={CharacterDetails}
                                options={() => ({
                                    headerTitle: 'Character Details',
                                    headerTransparent: true,
                                    headerTintColor: '#ffffff',
                                })}
                            />
                        })
                    }
                    <Drawer.Screen
                        name="CharacterDetails"
                        component={CharacterDetails}
                        options={() => ({
                            headerTitle: 'Character Details',
                            headerTransparent: true,
                            headerTintColor: '#ffffff',
                        })}
                    />
                </Drawer.Navigator>
            </View >
        );
    }
}

/**
<Drawer.Screen
                        name='Home'
                        component={Home}//home-outline
                        options={() => ({
                            headerTitle: 'Home',
                            headerTransparent: true,
                            headerTintColor: '#ffffff',
                            drawerIcon: ({ focused }) => <Icon
                                name={focused ? 'home' : 'home-outline'}
                                size={22}
                                color={focused ? '#ffffff' : '#b3b3b3'}
                            />,
                        })}
                    />
                    <Drawer.Screen
                        name="Characters"
                        component={Characters}
                        options={() => ({
                            headerTitle: 'Characters',
                            headerTransparent: true,
                            headerTintColor: '#ffffff',
                            drawerIcon: ({ focused }) => <Icon
                                name={focused ? 'person' : 'person-outline'}
                                size={22}
                                color={focused ? '#ffffff' : '#b3b3b3'}
                            />
                        })}
                    />
 */
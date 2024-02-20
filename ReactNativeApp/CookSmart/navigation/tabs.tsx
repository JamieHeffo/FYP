import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Image, Text } from "react-native";

import Chat from "../screens/Chat";
import ShoppingList from "../screens/ShoppingList";
import PhotoRecipe from "../screens/PhotoRecipe";
import Home from "../screens/Home";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow
                }

            }}>
            <Tab.Screen name="Home" component={Home} options={
                {
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Image
                                source={require('../src/assets/icons/home.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            />
                            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>HOME</Text>
                        </View>
                    )
                }

            } />
            <Tab.Screen name="ShoppingList" component={ShoppingList} options={
                {
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Image
                                source={require('../src/assets/icons/food.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            />
                            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>SHOPPING</Text>
                        </View>
                    )
                }

            } />
            <Tab.Screen name="PhotoRecipe" component={PhotoRecipe}
                options={
                    {
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                                <Image
                                    source={require('../src/assets/icons/camera.png')}
                                    resizeMode='contain'
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? '#e32f45' : '#748c94'
                                    }}
                                />
                                <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>GENERATE</Text>
                            </View>
                        )
                    }

                } />
            <Tab.Screen name="Chat" component={Chat} options={
                {
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Image
                                source={require('../src/assets/icons/chat.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            />
                            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>CHAT</Text>
                        </View>
                    )
                }

            } />



        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});
export default Tabs;
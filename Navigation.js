import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { decode as atob, encode as btoa } from 'base-64'
if (!global.btoa) {  global.btoa = btoa }
if (!global.atob) { global.atob = atob }
import Ionicons from 'react-native-vector-icons/Ionicons';
import Accueil from "./Accueil";
import MenuModale from "./MenuModale";
import Menu2 from "./Menu";
import Contact from "./Contact";
import Contact2 from "./Contact2";
import Contact3 from "./Contact3";
import Compte from "./Compte";
import Login from "./Login";
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";
import ModifyProduct from './ModifyProduct';


const Tab = createBottomTabNavigator();

function AccueilScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: { backgroundColor: '#A7000C' },
                headerTintColor: '#fff',
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Menu Modale') {
                        iconName = 'cafe-outline';
                    } else if (route.name === 'Présentation') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Menu') {
                        iconName = 'cafe-outline';
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#A7000C',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: '#000' }
            })}
        >
            <Tab.Screen name="Présentation" component={Accueil} />
            <Tab.Screen name="Menu Modale" component={MenuModale} />
            <Tab.Screen name="Menu" component={Menu2} />
        </Tab.Navigator>
    );
}

function DiversScreen() {
    const isFocused = useIsFocused();
    const [roles, setUserRoles] = useState(null);
    async function decodeToken() {
        try {
            const storedToken = await AsyncStorage.getItem('userToken');
            if (storedToken) {
                const decodedToken = jwtDecode(storedToken);
                setUserRoles(decodedToken.roles);
                console.log(roles);
            } else {
                setUserRoles(null);
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        decodeToken();
    
    }, [isFocused]);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: { backgroundColor: '#A7000C' },
                headerTintColor: '#fff',
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Info') {
                        iconName = 'person-outline';
                    } else if (route.name === 'Connexion') {
                        iconName = 'key-outline';
                    } else if (route.name === 'Ajout produit') {
                        iconName = 'add-circle-outline';
                    } else if (route.name === 'Suppression produit') {
                        iconName = 'remove-circle-outline';
                    } else if (route.name === 'Modifier produit') {
                        iconName = 'arrow-up-circle-outline';
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#A7000C',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: '#000' }
            })}
        >
            <Tab.Screen name="Info" component={Compte} />
            <Tab.Screen name="Connexion" component={Login} />
            {roles && roles.includes('ROLE_ADMIN') && <Tab.Screen name="Ajout produit" component={AddProduct} />}
            {roles && roles.includes('ROLE_ADMIN') && <Tab.Screen name="Modifier produit" component={ModifyProduct} />}
            {roles && roles.includes('ROLE_ADMIN') && <Tab.Screen name="Suppression produit" component={DeleteProduct} />}
        </Tab.Navigator>
    );
}

function ContactScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: { backgroundColor: '#A7000C' },
                headerTintColor: '#fff',
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Téléphone') {
                        iconName = 'call-outline';
                    } else if (route.name === 'Email') {
                        iconName = 'at-circle-outline';
                    } else if (route.name === 'Adresse') {
                        iconName = 'location-outline';
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#A7000C',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: '#000' }
            })}
        >
            <Tab.Screen name="Téléphone" component={Contact} />
            <Tab.Screen name="Email" component={Contact2} />
            <Tab.Screen name="Adresse" component={Contact3} />
        </Tab.Navigator>
    );
}


function Navigation() {

    const Drawer = createDrawerNavigator();
    return (
        <NavigationContainer >
            <Drawer.Navigator
                screenOptions={({ route }) => ({
                    headerStyle: { backgroundColor: '#A7000C' },
                    headerTintColor: '#fff',
                    drawerIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Accueil') {
                            iconName = 'home';
                        } else if (route.name === 'Compte') {
                            iconName = 'person-outline';
                        } else if (route.name === 'Contact') {
                            iconName = 'at-circle-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    drawerActiveTintColor: '#A7000C',
                    drawerInactiveTintColor: 'gray',
                    drawerStyle: { backgroundColor: '#000' }
                })}>
                <Drawer.Screen name="Accueil" component={AccueilScreen} />
                <Drawer.Screen name="Compte" component={DiversScreen} />
                <Drawer.Screen name="Contact" component={ContactScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
export default Navigation;
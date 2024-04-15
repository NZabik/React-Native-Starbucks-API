import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Accueil from "./Accueil";
import Menu from "./MenuModale";
import Menu2 from "./Menu";
import Contact from "./Contact";
import Contact2 from "./Contact2";
import Contact3 from "./Contact3";
import Divers from "./Divers";
import Divers2 from "./Divers2";
import Divers3 from "./Divers3";

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
            <Tab.Screen name="Menu Modale" component={Menu} />
            <Tab.Screen name="Menu" component={Menu2} />
        </Tab.Navigator>
    );
}

function DiversScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: { backgroundColor: '#A7000C' },
                headerTintColor: '#fff',
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Modale') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Divers2') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Divers3') {
                        iconName = focused ? 'list' : 'list-outline';
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#A7000C',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: '#000' }
            })}
        >
            <Tab.Screen name="Modale" component={Divers} />
            <Tab.Screen name="Divers2" component={Divers2} />
            <Tab.Screen name="Divers3" component={Divers3} />
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
                        } else if (route.name === 'Divers') {
                            iconName = focused ? 'list' : 'list-outline';
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
                <Drawer.Screen name="Divers" component={DiversScreen} />
                <Drawer.Screen name="Contact" component={ContactScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
export default Navigation;
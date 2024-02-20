import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Chat from "../screens/Chat";
import ShoppingList from "../screens/ShoppingList";
import PhotoRecipe from "../screens/PhotoRecipe";
import ViewRecipes from "../screens/ViewRecipes";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen name="ShoppingList" component={ShoppingList} />
            <Tab.Screen name="PhotoRecipe" component={PhotoRecipe} />
            <Tab.Screen name="ViewRecipes" component={ViewRecipes} />
        </Tab.Navigator>
    );
}

export default Tabs;
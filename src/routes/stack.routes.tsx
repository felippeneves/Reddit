import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Posts from '../screens/Posts'
import WebViewPost from '../screens/WebViewPost';

const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <StackRoutes.Navigator>
        <StackRoutes.Screen 
            name="reddit/r/programing"
            component={Posts}
        />

        <StackRoutes.Screen 
            name="WebViewPost"
            component={WebViewPost}
        />
    </StackRoutes.Navigator>
)

export default AppRoutes;
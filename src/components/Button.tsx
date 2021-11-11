import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import Colors from '../styles/Colors'

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    selected: boolean;
}

export default ({ title, selected, ...rest} : ButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.container, selected && styles.containerSelected]}
            activeOpacity={.7}
            {...rest}
        >
            <Text style={[styles.text, selected && styles.textSelected]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 48,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey,
        borderTopWidth: 1,
        borderTopColor: Colors.grey
    },
    containerSelected: {
        backgroundColor: Colors.blue_light,
    },
    text: {
        fontSize: 16,
        color: Colors.blue,
        fontWeight: 'bold'
    },
    textSelected: {
        color: Colors.white
    }
});
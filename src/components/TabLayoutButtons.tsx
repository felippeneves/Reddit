import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Button from '../components/Button';

import { ButtonProps } from '../model/ButtonProps';

interface ButtonsProps {
    listButtons: ButtonProps[];
    onSelected: (id: number) => void;
}

export default ({ listButtons, onSelected } : ButtonsProps) => {
    
    const [selectedButton, setSelectedButton] = useState<number>(-1);

    const handleSelectedButton = (idSelected: number) => {
        setSelectedButton(idSelected);
    }

    let buttons: JSX.Element[] = [];

    listButtons.forEach((element, index) => {
        buttons.push(
            <Button 
                title={element.title}
                selected={selectedButton == -1 ? index == 0 : selectedButton == element.id}
                onPress={() => { 
                    if(element.id != selectedButton) {
                        onSelected(element.id);
                        handleSelectedButton(element.id);
                    }
                }}
            />
        );
    });

    return (
        <View style={styles.container}>
            {buttons}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});
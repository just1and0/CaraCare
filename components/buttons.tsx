import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { style } from '../assets/style';

interface ButtonProps {
    value: string;
    onPress: () => void;
}

export const Button = (props: ButtonProps) => {
    const { value, onPress } = props;
    return (
        <Pressable onPress={onPress}>
            <View style={style().circleButton}>
                <Text style={style().circleButtonText}>{value}</Text>
            </View>
        </Pressable>

    )
}
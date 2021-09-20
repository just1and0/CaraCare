import React from 'react'
import { View, Text } from 'react-native'
import { style } from '../assets/style'

interface HeaderItemsProps {
    value:number;
    valueAdon?:string;
    description:string;
}

export const HeaderItems = (props:HeaderItemsProps) => {
    const { value, valueAdon, description } =  props;
    return (
        <View style={style().headerItems}>
            <Text style={style().headerItemTitle}>
                {value} {valueAdon}
            </Text>
            <Text style={style().headerItemDescription}>
                {description}
            </Text>
        </View>
    )
}
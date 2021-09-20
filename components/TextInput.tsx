import React from 'react'
import { View, Text, TextInput as DefaultTextInput, TextInputProps as DefaultTextInputProps} from 'react-native'
import { style } from '../assets/style';

interface TextInputProps { }

export const TextInput = (props: TextInputProps & DefaultTextInputProps) => {
    const { onChangeText, value } = props;
    return (
        <View style={style().TextInputView}>
            <DefaultTextInput
                style={style().TextInput}
                keyboardType = 'numeric'
                onChangeText={onChangeText}
                value={value}
            />
            <Text style={style().textInputText}>ml</Text>
        </View>

    )
}
import React, { useState } from "react";
import { View, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { style } from "../assets/style";

interface CarouselProps {
    data: Array<{ value: number, addon: string }>;
    onChange: (i: number) => void;
}

export const CarouselView = (props: CarouselProps) => {

    const [activeIndex, setactiveIndex] = useState(0);

    let _renderItem = ({ item, index }: { item: { value: number, addon: string }, index: number }) => {

        return (
            <View
                key={index}
                style={[
                    style().carouselView
                ]}>
                <Text style={[
                    style().carouselTitle,
                    activeIndex == index && style().carouselTitleCenter,
                ]}>{item.value} {item.addon}</Text>
            </View>

        )
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Carousel
                layout={"default"} 
                data={props.data}
                sliderWidth={600}
                itemWidth={200}
                renderItem={_renderItem}
                onSnapToItem={index => {
                    setactiveIndex(index)
                    props.onChange(index)
                }} />
        </View>
    )
}
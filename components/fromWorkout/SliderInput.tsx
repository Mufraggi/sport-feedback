// components/SliderInput.tsx
import React from "react";
import Slider from "@react-native-community/slider";
import {Text, View, StyleSheet} from "react-native";

export const SliderInput = ({
                                label,
                                value,
                                onChange,
                                color,
                            }: {
    label: string;
    value: number;
    onChange: (val: number) => void;
    color: string;
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}: {value}</Text>
            <Slider
                style={{width: '100%', height: 40}}
                minimumValue={0}
                maximumValue={10}
                step={1}
                value={value}
                onValueChange={onChange}
                minimumTrackTintColor={color}
                maximumTrackTintColor="#D3D3D3"
                thumbTintColor={color}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {marginBottom: 12},
    label: {fontSize: 16, marginBottom: 4},
});

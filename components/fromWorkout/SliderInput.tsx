// components/SliderInput.tsx
import React from "react";
import Slider from "@react-native-community/slider";
import {StyleSheet, Text, View} from "react-native";

export const SliderInput = ({
                                label,
                                value,
                                onChange,
                                color,
                                minimumValue,
                                maximumValue
                            }: {
    label: string;
    value: number;
    onChange: (val: number) => void;
    color: string;
    minimumValue: number;
    maximumValue: number;
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}: {value}</Text>
            <Slider
                style={{width: '100%', height: 40}}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
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

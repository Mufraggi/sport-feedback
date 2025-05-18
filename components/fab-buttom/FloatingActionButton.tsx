import Animated, {SharedValue, useAnimatedStyle, withDelay, withSpring, withTiming} from "react-native-reanimated";
import React from "react";
import {Pressable, Text, View} from "react-native";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.createAnimatedComponent(View);

const SPRING_CONFIG = {
    duration: 1200,
    overshootClamping: true,
    dampingRatio: 0.8,
};

const OFFSET = 60; // Espacement vertical entre les boutons étendus
const LABEL_OFFSET = 5; // Espacement horizontal entre le label et le bouton

export default function FloatingActionButton({isExpanded, index, buttonLetter, label, onPress}: {
    isExpanded: SharedValue<boolean>,
    index: number,
    buttonLetter: string,
    label: string,
    onPress: () => void,
}) {
    const delay = index * 100;

    // Style animé pour le conteneur principal (gère le déplacement vertical et l'échelle globale)
    const containerAnimatedStyle = useAnimatedStyle(() => {
        const moveValue = isExpanded.value ? OFFSET * index : 0;
        const translateValue = withSpring(-moveValue, SPRING_CONFIG);
        const scaleValue = isExpanded.value ? 1 : 0;

        return {
            transform: [
                {translateY: translateValue},
                {
                    scale: withDelay(delay, withTiming(scaleValue)),
                },
            ],
            opacity: withDelay(delay, withTiming(isExpanded.value ? 1 : 0)),
        };
    });

    const labelContainerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(isExpanded.value ? 1 : 0, {duration: 150}),
            transform: [
                {translateX: withTiming(isExpanded.value ? 0 : 10)}
            ]
        };
    });

    // Style animé pour le bouton lui-même
    const buttonAnimatedStyle = useAnimatedStyle(() => {
        const scaleValue = isExpanded.value ? 1 : 0;
        return {
            transform: [
                {scale: withDelay(delay, withTiming(scaleValue))},
            ]
        }
    })

    return (
        <AnimatedView className="absolute right-0 bottom-0 flex-row items-center justify-center z-[-1]"
                      style={containerAnimatedStyle}>
            <AnimatedView
                className="py-1 px-2 rounded w-[100px] flex-row items-center justify-center mr-[5px] shadow-sm"
                style={[
                    labelContainerAnimatedStyle,
                    {
                        shadowColor: '#171717',
                        shadowOffset: {width: -0.5, height: 2},
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        elevation: 2,
                    }
                ]}
            >
                <Text className="text-black text-xs">{label}</Text>
            </AnimatedView>
            <AnimatedPressable
                className="w-10 h-10 bg-[#82cab2] rounded-full flex justify-center items-center"
                style={[
                    buttonAnimatedStyle,
                    {
                        shadowColor: '#171717',
                        shadowOffset: {width: -0.5, height: 3.5},
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        elevation: 3,
                    }
                ]} onPress={onPress}
            >
                <Text className="text-[#f8f9ff] font-bold">{buttonLetter}</Text>
            </AnimatedPressable>
        </AnimatedView>
    );
}
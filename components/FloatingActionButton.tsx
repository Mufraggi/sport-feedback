import Animated, {SharedValue, useAnimatedStyle, withDelay, withSpring, withTiming} from "react-native-reanimated";
import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native"; // Ajout de View

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.createAnimatedComponent(View); // Créer une View animée

const SPRING_CONFIG = {
    duration: 1200,
    overshootClamping: true,
    dampingRatio: 0.8,
};

const OFFSET = 60; // Espacement vertical entre les boutons étendus
const LABEL_OFFSET = 5; // Espacement horizontal entre le label et le bouton

export default function FloatingActionButton({isExpanded, index, buttonLetter, label}: {
    isExpanded: SharedValue<boolean>,
    index: number,
    buttonLetter: string,
    label: string
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

    // Style animé pour le bouton lui-même (si on veut une animation d'échelle spécifique au bouton)
    const buttonAnimatedStyle = useAnimatedStyle(() => {
        const scaleValue = isExpanded.value ? 1 : 0;
        return {
            transform: [
                {scale: withDelay(delay, withTiming(scaleValue))},
            ]
        }
    })


    return (
        <AnimatedView style={[styles.actionButtonContainer, containerAnimatedStyle]}>
            <AnimatedView style={[styles.labelContainer, labelContainerAnimatedStyle]}>
                <Text style={styles.labelText}>{label}</Text>
            </AnimatedView>
            <AnimatedPressable style={[styles.button, styles.shadow, buttonAnimatedStyle]}>
                <Text style={styles.content}>{buttonLetter}</Text>
            </AnimatedPressable>
        </AnimatedView>
    );
}

const styles = StyleSheet.create({
    // Nouveau conteneur pour chaque action (label + bouton)
    actionButtonContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Changez pour centrer horizontalement
        zIndex: -1,
    },
    // Conteneur pour le label
    labelContainer: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginRight: LABEL_OFFSET,
        shadowColor: '#171717',
        shadowOffset: {width: -0.5, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Centre le texte dans le conteneur du label
    },
    labelText: {
        color: 'black',
        fontSize: 12,
    },
    // Style du bouton (Pressable)
    button: {
        width: 40,
        height: 40,
        backgroundColor: '#82cab2',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Style de l'ombre (peut rester sur le bouton)
    shadow: {
        shadowColor: '#171717',
        shadowOffset: {width: -0.5, height: 3.5},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    // Texte à l'intérieur du bouton
    content: {
        color: '#f8f9ff',
        fontWeight: 'bold',
    },
});

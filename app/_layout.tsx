import React from 'react';
import {View, StyleSheet, Pressable, Text, SafeAreaView} from 'react-native';
import {Stack} from 'expo-router';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import FloatingActionButton from '@/components/FloatingActionButton';
import "../global.css"
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function RootLayout() {
    const isExpanded = useSharedValue(false);

    const handlePress = () => {
        isExpanded.value = !isExpanded.value;
    };

    const plusIconStyle = useAnimatedStyle(() => {
        const moveValue = interpolate(Number(isExpanded.value), [0, 1], [0, 2]);
        const translateValue = withTiming(moveValue);
        const rotateValue = isExpanded.value ? '45deg' : '0deg';

        return {
            transform: [
                {translateX: translateValue},
                {rotate: withTiming(rotateValue)},
            ],
        };
    });

    return (
        <SafeAreaView style={styles.container}>
            <Stack />
            {/* FAB placé en bas à droite */}
            <View style={styles.fabContainer}>
                <View style={styles.buttonContainer}>
                    <AnimatedPressable
                        onPress={handlePress}
                        style={[styles.shadow, mainButtonStyles.button]}>
                        <Animated.Text style={[plusIconStyle, mainButtonStyles.content]}>
                            +
                        </Animated.Text>
                    </AnimatedPressable>
                    <FloatingActionButton
                        isExpanded={isExpanded}
                        index={1}
                        buttonLetter={'F'}
                        label={'Add Feedback'}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const mainButtonStyles = StyleSheet.create({
    button: {
        zIndex: 1,
        height: 56,
        width: 56,
        borderRadius: 100,
        backgroundColor: '#b58df1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        fontSize: 24,
        color: '#f8f9ff',
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    fabContainer: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        zIndex: 999,
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: '#82cab2',
        position: 'absolute',
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -2,
        flexDirection: 'row',
    },
    buttonContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: {width: -0.5, height: 3.5},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // Pour Android
    },
    content: {
        color: '#f8f9ff',
        fontWeight: '500', // Corrigé: doit être une chaîne
    },
});
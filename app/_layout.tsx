import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import {Stack} from 'expo-router';
import Animated, {interpolate, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import OriginalFloatingActionButton from '@/components/FloatingActionButton'; // Renommé pour éviter confusion
import "../global.css"
import {BottomSheetProvider, useBottomSheet} from "@/components/BottomSheetContext";
import {GlobalBottomSheet} from "@/components/GlobalBottomSheet";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);


function FabContainer() {
    const {openBottomSheet} = useBottomSheet();
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

    // Action pour le bouton "Add Feedback"
    const handleAddFeedbackPress = () => {
        openBottomSheet('page1'); // 'page1' est l'identifiant pour le contenu du FAB
    };

    return (
        <View style={styles.fabContainer}>
            <View style={styles.buttonContainer}>
                <AnimatedPressable
                    onPress={handlePress} // Ce bouton gère l'expansion
                    style={[styles.shadow, mainButtonStyles.button]}>
                    <Animated.Text style={[plusIconStyle, mainButtonStyles.content]}>
                        +
                    </Animated.Text>
                </AnimatedPressable>
                {/* Ce FloatingActionButton est un des boutons étendus */}
                {/* Assurez-vous que votre composant OriginalFloatingActionButton accepte onPress */}
                <OriginalFloatingActionButton
                    isExpanded={isExpanded}
                    index={1} // ou l'index approprié
                    buttonLetter={'F'}
                    label={'Add Feedback'}
                    onPress={handleAddFeedbackPress} // Ajoutez cette prop à votre composant
                />
            </View>
        </View>
    );
}


export default function RootLayout() {
    return (
        <BottomSheetProvider>
            <SafeAreaView style={styles.container}>
                <Stack/>
                <GlobalBottomSheet/>
                <FabContainer/>
            </SafeAreaView>
        </BottomSheetProvider>
    );
}

// Styles (mainButtonStyles, styles) restent les mêmes
// ... (copiez vos styles ici)
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
        zIndex: 999, // S'assurer qu'il est au-dessus du BottomSheet si le backdrop n'est pas plein écran
    },
    button: { // Ce style semble être pour les boutons enfants du FAB, à vérifier
        width: 40,
        height: 40,
        backgroundColor: '#82cab2',
        position: 'absolute',
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -2, // Ce zIndex pourrait être problématique
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
    content: { // Ce style semble être pour le texte dans les boutons enfants
        color: '#f8f9ff',
        fontWeight: '500',
    },
});
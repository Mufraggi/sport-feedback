import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const StepIndicator = ({steps, currentStep}) => {
    return (
        <View style={styles.stepIndicatorContainer}>
            {Array.from({length: steps}, (_, index) => (
                <View
                    key={index}
                    style={[
                        styles.step,
                        currentStep > index ? styles.completedStep : {},
                        currentStep === index ? styles.currentStep : {},
                    ]}
                >
                    <Text style={styles.stepText}>{index + 1}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    stepIndicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    step: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    completedStep: {
        backgroundColor: '#4CAF50', // Vert pour les étapes complétées
    },
    currentStep: {
        backgroundColor: '#2196F3', // Bleu pour l'étape actuelle
    },
    stepText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default StepIndicator;

// FeelingsStep.tsx
import React from "react";
import {ScrollView, StyleSheet, Text} from "react-native";
import {Control, Controller, FieldErrors} from "react-hook-form";
import {WorkoutFormValues} from "@/components/fromWorkout/schemas/workoutSchema";
import {SliderInput} from "../SliderInput";

interface FeelingsStepProps {
    control: Control<WorkoutFormValues>;
    errors: FieldErrors<WorkoutFormValues>;
}

export const FeelingsStep: React.FC<FeelingsStepProps> = ({control, errors}) => {
    return (
        <ScrollView style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Comment vous sentiez-vous ?</Text>

            <Controller
                control={control}
                name="feeling"
                render={({field}) => (
                    <SliderInput
                        label="Ressenti général"
                        value={field.value}
                        onChange={(value) => field.onChange(Number(value))}
                        color="#4CAF50"
                        minimumValue={1}
                        maximumValue={10}
                    />
                )}
            />

            <Controller
                control={control}
                name="energyLevel"
                render={({field}) => (
                    <SliderInput
                        label="Niveau d'énergie"
                        value={field.value}
                        onChange={(value) => field.onChange(Number(value))}
                        color="#FF9800"
                        minimumValue={1}
                        maximumValue={10}

                    />
                )}
            />

            <Controller
                control={control}
                name="motivationLevel"
                render={({field}) => (
                    <SliderInput
                        label="Niveau de motivation"
                        value={field.value}
                        onChange={(value) => field.onChange(Number(value))}
                        color="#2196F3"
                        minimumValue={1}
                        maximumValue={10}
                    />
                )}
            />

            <Controller
                control={control}
                name="stressLevel"
                render={({field}) => (
                    <SliderInput
                        label="Niveau de stress"
                        value={field.value}
                        onChange={(value) => field.onChange(Number(value))}
                        color="#F44336"
                        minimumValue={1}
                        maximumValue={10}
                    />
                )}
            />

            <Controller
                control={control}
                name="sleepQuality"
                render={({field}) => (
                    <SliderInput
                        label="Qualité du sommeil"
                        value={field.value}
                        onChange={(value) => field.onChange(Number(value))}
                        color="#9C27B0"
                        minimumValue={1}
                        maximumValue={10}
                    />
                )}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    stepContainer: {
        flex: 1,
        padding: 16,
    },
    stepTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
});

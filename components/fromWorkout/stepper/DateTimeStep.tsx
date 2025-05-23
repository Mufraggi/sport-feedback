// DateTimeStep.tsx
import React from "react";
import {ScrollView, StyleSheet, Text} from "react-native";
import {Control, Controller, FieldErrors} from "react-hook-form";
import {WorkoutFormValues} from "@/components/fromWorkout/schemas/workoutSchema";
import {DateTimeSelector} from "../DateTimeSelector";


interface DateTimeStepProps {
    control: Control<WorkoutFormValues>;
    errors: FieldErrors<WorkoutFormValues>;
}

export const DateTimeStep: React.FC<DateTimeStepProps> = ({control, errors}) => {
    return (
        <ScrollView style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Quand avez-vous fait votre entraînement ?</Text>

            <Controller
                control={control}
                name="date"
                render={({field: {onChange, value}}) => (
                    <DateTimeSelector
                        date={value instanceof Date ? value : new Date(value)}
                        onChangeDate={(val) => onChange(val)}
                    />
                )}
            />

            {errors.date && (
                <Text style={styles.errorText}>{errors.date.message}</Text>
            )}
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
    errorText: {
        color: '#F44336',
        fontSize: 14,
        marginTop: -12,
        marginBottom: 16,
    },
});
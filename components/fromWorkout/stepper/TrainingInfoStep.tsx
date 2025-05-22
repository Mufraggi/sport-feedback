// TrainingInfoStep.tsx
import React from "react";
import {Button, ScrollView, StyleSheet, Switch, Text, TextInput, View} from "react-native";
import {Control, Controller, FieldErrors} from "react-hook-form";
import {WorkoutFormValues} from "@/components/fromWorkout/schemas/workoutSchema";
import {SliderInput} from "../SliderInput";

interface TrainingInfoStepProps {
    control: Control<WorkoutFormValues>;
    errors: FieldErrors<WorkoutFormValues>;
}

export const TrainingInfoStep: React.FC<TrainingInfoStepProps> = ({control, errors}) => {
    return (
        <ScrollView style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Détails de votre entraînement</Text>

            {/* Type */}
            <Text style={styles.label}>Type d'entraînement</Text>
            <Controller
                control={control}
                name="type"
                render={({field: {onChange, value}}) => (
                    <View style={styles.buttonGroup}>
                        {["JJB GI", "JJB NO GI", "GRAPPLING"].map((type) => (
                            <Button
                                key={type}
                                title={type}
                                onPress={() => onChange(type)}
                                color={value === type ? "#4CAF50" : "gray"}
                            />
                        ))}
                    </View>
                )}
            />

            {/* Durée */}
            <Controller
                control={control}
                name="duration"
                render={({field}) => (
                    <SliderInput
                        label="Durée (minutes)"
                        value={field.value}
                        onChange={(value) => field.onChange(Number(value))}
                        color="#4CAF50"
                        minimumValue={1}
                        maximumValue={180}
                    />
                )}
            />

            {/* Focus */}
            <Text style={styles.label}>Focus du jour</Text>
            <Controller
                control={control}
                name="focusOfTheDay"
                render={({field}) => (
                    <TextInput
                        style={styles.textInput}
                        placeholder="Ex: travail sur le passing"
                        value={field.value}
                        onChangeText={field.onChange}
                    />
                )}
            />

            {/* Goal */}
            <View style={styles.switchContainer}>
                <Text style={styles.label}>Objectif atteint ?</Text>
                <Controller
                    control={control}
                    name="achievedGoal"
                    render={({field: {onChange, value}}) => (
                        <Switch value={value} onValueChange={onChange}/>
                    )}
                />
            </View>
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
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
        color: '#333',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 8,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
});

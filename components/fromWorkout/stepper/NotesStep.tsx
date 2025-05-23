// NotesStep.tsx
import React from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Controller, Control, FieldErrors, UseFieldArrayReturn } from "react-hook-form";
import { WorkoutFormValues } from "@/components/fromWorkout/schemas/workoutSchema";

interface NotesStepProps {
    control: Control<WorkoutFormValues>;
    errors: FieldErrors<WorkoutFormValues>;
    injuries: UseFieldArrayReturn<WorkoutFormValues, "injuries", "id">;
}

export const NotesStep: React.FC<NotesStepProps> = ({ control, errors, injuries }) => {
    const { fields, append, remove } = injuries;

    return (
        <ScrollView style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Informations complémentaires</Text>

            {/* Blessures */}
            <Text style={styles.sectionTitle}>Blessures</Text>
            {fields.map((item, index) => (
                <View key={item.id} style={styles.injuryRow}>
                    <Controller
                        control={control}
                        name={`injuries.${index}`}
                        render={({ field }) => (
                            <TextInput
                                style={[styles.textInput, { flex: 1 }]}
                                placeholder="Décrivez la blessure"
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                        )}
                    />
                    <Button
                        title="×"
                        color="#F44336"
                        onPress={() => remove(index)}
                    />
                </View>
            ))}

            <Button
                title="+ Ajouter une blessure"
                onPress={() => append("")}
                color="#4CAF50"
            />

            {/* Notes */}
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Notes libres</Text>
            <Controller
                control={control}
                name="notes"
                render={({ field }) => (
                    <TextInput
                        style={[styles.textInput, styles.textArea]}
                        multiline
                        numberOfLines={4}
                        placeholder="Commentaires, observations, points à retenir..."
                        value={field.value}
                        onChangeText={field.onChange}
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
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
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    injuryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
});

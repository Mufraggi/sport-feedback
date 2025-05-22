// components/SparringRoundsInput.tsx
import React from "react";
import {Text, TextInput, View, Button} from "react-native";
import {Controller, Control, UseFieldArrayReturn} from "react-hook-form";
import {WorkoutFormValues} from "@/components/fromWorkout/schemas/workoutSchema";

export const SparringRoundsInput = ({
                                        control,
                                        sparringRounds,
                                        append,
                                        remove,
                                    }: {
    control: Control<WorkoutFormValues>;
    sparringRounds: UseFieldArrayReturn<WorkoutFormValues, 'sparringRounds'>['fields'];
    append: () => void;
    remove: (index: number) => void;
}) => {
    return (
        <View>
            <Text>Sparrings</Text>
            {sparringRounds.map((item, index) => (
                <View key={item.id} style={{marginBottom: 12}}>
                    <Text>Partenaire</Text>
                    <Controller
                        control={control}
                        name={`sparringRounds.${index}.partner`}
                        render={({field}) => (
                            <TextInput style={{borderWidth: 1, padding: 8}} {...field} />
                        )}
                    />
                    <Text>Résultat</Text>
                    <Controller
                        control={control}
                        name={`sparringRounds.${index}.outcome`}
                        render={({field}) => (
                            <TextInput style={{borderWidth: 1, padding: 8}} {...field} />
                        )}
                    />
                    <Button title="Supprimer" onPress={() => remove(index)} />
                </View>
            ))}
            <Button title="Ajouter un sparring" onPress={() => append()} />
        </View>
    );
};

import React from "react";
import { View, Text, TextInput, Button, ScrollView, Switch } from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {workoutSchema} from "@/components/fromWorkout/schemas/workoutSchema";
import {Workout} from "@/domain/workout";


export const WorkoutForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Workout>({
        resolver: zodResolver(workoutSchema),
        defaultValues: {
            type: "JJB GI",
            date: new Date().toISOString(),
            duration: 60,
            feeling: 5,
            achievedGoal: false,
            sparringRounds: [],
            injuries: [],
        },
    });

    const { fields: sparringRounds, append: appendSparring, remove: removeSparring } = useFieldArray({
        control,
        name: "sparringRounds",
    });

    const { fields: injuries, append: appendInjury, remove: removeInjury } = useFieldArray({
        control,
        name: "injuries",
    });

    const onSubmit = (data: Workout) => {
        console.log("Workout submitted:", data);
    };

    return (
        <ScrollView className="p-4">
            <Text className="text-xl font-bold mb-4">Créer un entraînement</Text>

            {/* Type */}
            <Text className="text-base">Type</Text>
            <Controller
                control={control}
                name="type"
                render={({ field: { onChange, value } }) => (
                    <View className="flex-row justify-between mb-2">
                        {["JJB GI", "JJB NO GI", "GRAPPLING"].map((type) => (
                            <Button key={type} title={type} onPress={() => onChange(type)} color={value === type ? "blue" : "gray"} />
                        ))}
                    </View>
                )}
            />

            {/* Date */}
            <Text className="text-base">Date (YYYY-MM-DD)</Text>
            <Controller
                control={control}
                name="date"
                render={({ field }) => (
                    <TextInput className="border p-2 rounded mb-2" placeholder="2025-05-18" {...field} />
                )}
            />
            {errors.date && <Text className="text-red-500">{errors.date.message}</Text>}

            {/* Duration */}
            <Text className="text-base">Durée (minutes)</Text>
            <Controller
                control={control}
                name="duration"
                render={({ field }) => (
                    <TextInput
                        className="border p-2 rounded mb-2"
                        keyboardType="numeric"
                        value={field.value.toString()}
                        onChangeText={(text) => field.onChange(Number(text))}
                    />
                )}
            />

            {/* Feeling */}
            <Text className="text-base">Feeling (1 à 10)</Text>
            <Controller
                control={control}
                name="feeling"
                render={({ field }) => (
                    <TextInput
                        className="border p-2 rounded mb-2"
                        keyboardType="numeric"
                        value={field.value.toString()}
                        onChangeText={(text) => field.onChange(Number(text))}
                    />
                )}
            />

            {/* Focus */}
            <Text className="text-base">Focus du jour</Text>
            <Controller
                control={control}
                name="focusOfTheDay"
                render={({ field }) => (
                    <TextInput className="border p-2 rounded mb-2" placeholder="Ex: travail sur le passing" {...field} />
                )}
            />

            {/* Goal */}
            <Text className="text-base">Objectif atteint ?</Text>
            <Controller
                control={control}
                name="achievedGoal"
                render={({ field: { onChange, value } }) => (
                    <Switch value={value} onValueChange={onChange} className="mb-2" />
                )}
            />

            {/* Sparring Rounds */}
            <Text className="text-lg font-semibold mt-4 mb-2">Sparrings</Text>
            {sparringRounds.map((item, index) => (
                <View key={item.id} className="mb-4 border p-2 rounded">
                    <Text className="text-sm font-medium">Partenaire</Text>
                    <Controller
                        control={control}
                        name={`sparringRounds.${index}.partner`}
                        render={({ field }) => <TextInput className="border p-1 rounded mb-1" {...field} />}
                    />
                    <Text className="text-sm font-medium">Résultat</Text>
                    <Controller
                        control={control}
                        name={`sparringRounds.${index}.outcome`}
                        render={({ field: { onChange, value } }) => (
                            <View className="flex-row justify-between my-1">
                                {["win", "lose", "draw", "unknown"].map((result) => (
                                    <Button
                                        key={result}
                                        title={result}
                                        onPress={() => onChange(result)}
                                        color={value === result ? "green" : "gray"}
                                    />
                                ))}
                            </View>
                        )}
                    />
                    <Text className="text-sm font-medium">Notes</Text>
                    <Controller
                        control={control}
                        name={`sparringRounds.${index}.notes`}
                        render={({ field }) => <TextInput className="border p-1 rounded" {...field} />}
                    />
                    <Button title="Supprimer" onPress={() => removeSparring(index)} color="red" />
                </View>
            ))}
            <Button title="Ajouter un sparring" onPress={() => appendSparring({ partner: "", outcome: "unknown" })} />

            {/* Injuries */}
            <Text className="text-lg font-semibold mt-4 mb-2">Blessures</Text>
            {injuries.map((item, index) => (
                <View key={item.id} className="mb-2 flex-row items-center gap-2">
                    <Controller
                        control={control}
                        name={`injuries.${index}`}
                        render={({ field }) => <TextInput className="border p-2 rounded flex-1" {...field} />}
                    />
                    <Button title="X" color="red" onPress={() => removeInjury(index)} />
                </View>
            ))}
            <Button title="Ajouter une blessure" onPress={() => appendInjury("")} />

            {/* Notes */}
            <Text className="text-base mt-4">Notes</Text>
            <Controller
                control={control}
                name="notes"
                render={({ field }) => (
                    <TextInput
                        className="border p-2 rounded mb-4"
                        multiline
                        numberOfLines={4}
                        placeholder="Commentaires libres"
                        {...field}
                    />
                )}
            />

            {/* Submit */}
            <Button title="Valider" onPress={handleSubmit(onSubmit)} />
        </ScrollView>
    );
};

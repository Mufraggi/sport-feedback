import React, {useState} from "react";
import {Button, ScrollView, StyleSheet, Switch, Text, TextInput, View} from "react-native";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {WorkoutFormValues, workoutSchema} from "@/components/fromWorkout/schemas/workoutSchema";
import {SliderInput} from "./SliderInput";
import {DateTimeSelector} from "./DateTimeSelector";


export const WorkoutForm = () => {
    const [date, setDate] = useState(new Date());

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<WorkoutFormValues>({
        resolver: zodResolver(workoutSchema),
        defaultValues: {
            type: "JJB GI",
            date: new Date(),
            duration: 60,
            feeling: 5,
            energyLevel: 5,
            motivationLevel: 5,
            stressLevel: 5,
            sleepQuality: 5,
            achievedGoal: false,
            injuries: [],
        },
    });

    const {fields: injuries, append: appendInjury, remove: removeInjury} = useFieldArray({
        control,
        name: "injuries",
    });

    const onSubmit = (data: WorkoutFormValues) => {
        console.log("Workout submitted:", data);
    };
    console.log("Form errors:", errors);
    return (
        <ScrollView className="p-4">
            <Controller
                control={control}
                name="date"
                render={({field: {onChange, value}}) => (
                    <DateTimeSelector
                        date={value instanceof Date ? value : new Date(value)}
                        onChangeDate={(val) => onChange(val)} // ici, val est déjà une Date
                    />
                )}
            />

            {/* Type */}
            <Text className="text-base">Type</Text>
            <Controller
                control={control}
                name="type"
                render={({field: {onChange, value}}) => (
                    <View className="flex-row justify-between mb-2">
                        {["JJB GI", "JJB NO GI", "GRAPPLING"].map((type) => (
                            <Button key={type} title={type} onPress={() => onChange(type)}
                                    color={value === type ? "blue" : "gray"}/>
                        ))}
                    </View>
                )}
            />
            <Controller
                control={control}
                name="energyLevel"
                render={({field}) => (
                    <SliderInput label="energyLevel" value={field.value}
                                 onChange={(value) => field.onChange(Number(value))}
                                 color="#4CAF50"/>)}/>
            <Controller
                control={control}
                name="feeling"
                render={({field}) => (
                    <SliderInput label="feeling" value={field.value}
                                 onChange={(value) => field.onChange(Number(value))}
                                 color="#4CAF50"/>
                )}/>
            <Controller
                control={control}
                name="motivationLevel"
                render={({field}) => (
                    <SliderInput label="Niveau de motivation"
                                 value={field.value}
                                 onChange={(value) => field.onChange(Number(value))}
                                 color="#2196F3"/>
                )}/>
            <Controller
                control={control}
                name="stressLevel"
                render={({field}) => (
                    <SliderInput label="Niveau de stress"
                                 value={field.value}
                                 onChange={(value) => field.onChange(Number(value))}
                                 color="#F44336"/>

                )}/>
            <Controller
                control={control}
                name="sleepQuality"
                render={({field}) => (
                    <SliderInput label="Qualité du sommeil"
                                 value={field.value}
                                 onChange={(value) => field.onChange(Number(value))}
                                 color="#9C27B0"/>


                )}/>


            {/* Focus */}
            <Text className="text-base">Focus du jour</Text>
            <Controller
                control={control}
                name="focusOfTheDay"
                render={({field}) => (
                    <TextInput className="border p-2 rounded mb-2"
                               placeholder="Ex: travail sur le passing" {...field} />
                )}
            />

            {/* Goal */}
            <Text className="text-base">Objectif atteint ?</Text>
            <Controller
                control={control}
                name="achievedGoal"
                render={({field: {onChange, value}}) => (
                    <Switch value={value} onValueChange={onChange} className="mb-2"/>
                )}
            />

            {/* Injuries */}
            <Text className="text-lg font-semibold mt-4 mb-2">Blessures</Text>
            {injuries.map((item, index) => (
                <View key={item.id} className="mb-2 flex-row items-center gap-2">
                    <Controller
                        control={control}
                        name={`injuries.${index}`}
                        render={({field}) => <TextInput className="border p-2 rounded flex-1" {...field} />}
                    />
                    <Button title="X" color="red" onPress={() => removeInjury(index)}/>
                </View>
            ))}
            <Button title="Ajouter une blessure" onPress={() => appendInjury("")}/>

            {/* Notes */}
            <Text className="text-base mt-4">Notes</Text>
            <Controller
                control={control}
                name="notes"
                render={({field}) => (
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
            <Button title="Valider" onPress={handleSubmit(onSubmit)}/>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    slider: {
        width: '100%',
        height: 40,
        marginBottom: 20,
    },
    thumb: {
        width: 25,
        height: 25,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#FFF', // Bordure blanche pour le pouce
        shadowColor: '#000', // Ombre portée
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    track: {
        height: 8,
        borderRadius: 4,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    buttonContainer: {
        marginVertical: 10,
        width: '80%',
    },
    selectedText: {
        fontSize: 18,
        marginVertical: 15,
        color: '#555',
        textAlign: 'center',
    },
});

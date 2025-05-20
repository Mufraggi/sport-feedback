import React, {useState} from "react";
import {Button, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, View} from "react-native";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {WorkoutFormValues, workoutSchema} from "@/components/fromWorkout/schemas/workoutSchema";
import {Workout} from "@/domain/workout";
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SliderInput} from "./SliderInput";


export const WorkoutForm = () => {
    const [date, setDate] = useState(new Date()); // Date initiale
    const [showPicker, setShowPicker] = useState(false);
    const [mode, setMode] = useState('date'); // 'date' ou 'time'

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<WorkoutFormValues>({
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

    const {fields: sparringRounds, append: appendSparring, remove: removeSparring} = useFieldArray({
        control,
        name: "sparringRounds",
    });

    const {fields: injuries, append: appendInjury, remove: removeInjury} = useFieldArray({
        control,
        name: "injuries",
    });

    const onSubmit = (data: Workout) => {
        console.log("Workout submitted:", data);
    };
    const [feeling, setFeeling] = useState(5);
    const [energyLevel, setEnergyLevel] = useState(5);
    const [motivationLevel, setMotivationLevel] = useState(5);
    const [stressLevel, setStressLevel] = useState(5);
    const [sleepQuality, setSleepQuality] = useState(5);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // Sur Android, le picker se ferme après la sélection, sur iOS non.
        // On ferme le picker après la sélection sur les deux plateformes pour une cohérence.
        setShowPicker(Platform.OS === 'ios'); // Ferme le picker sur iOS aussi, le met à jour pour Android

        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShowPicker(true);
        setMode(currentMode);
    };

    const showDatePicker = () => {
        showMode('date');
    };

    const showTimePicker = () => {
        showMode('time');
    };
    console.log(control._fields)
    const formatDate = (dateToFormat) => {
        return dateToFormat.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timeToFormat) => {
        return timeToFormat.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    return (
        <ScrollView className="p-4">
            <Text className="text-xl font-bold mb-4">Créer un entraînement</Text>
            <Text style={styles.title}>Sélectionnez Date et Heure</Text>

            <View style={styles.buttonContainer}>
                <Button onPress={showDatePicker} title="Choisir une date"/>
            </View>
            <Text style={styles.selectedText}>Date sélectionnée : {formatDate(date)}</Text>

            <View style={styles.buttonContainer}>
                <Button onPress={showTimePicker} title="Choisir une heure"/>
            </View>
            <Text style={styles.selectedText}>Heure sélectionnée : {formatTime(date)}</Text>

            {showPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode} // Sera 'date' ou 'time'
                    is24Hour={true} // Utilise le format 24 heures
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'} // 'spinner' est souvent plus agréable sur iOS
                    onChange={onChange}
                />
            )}
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

            {/* Date */}
            <Text className="text-base">Date (YYYY-MM-DD)</Text>
            <Controller
                control={control}
                name="date"
                render={({field}) => (
                    <TextInput className="border p-2 rounded mb-2" placeholder="2025-05-18" {...field} />
                )}
            />
            {errors.date && <Text className="text-red-500">{errors.date.message}</Text>}

            {/* Duration */}
            <Text className="text-base">Durée (minutes)</Text>

            <Controller
                control={control}
                name="duration"
                render={({field}) => (
                    <TextInput
                        className="border p-2 rounded mb-2"
                        keyboardType="numeric"
                        value={field.value.toString()}
                        onChangeText={(text) => field.onChange(Number(text))}
                    />
                )}
            />
            <Controller
                control={control}
                name="feeling"
                render={({field}) => (
                    <SliderInput label="feeling" value={field.value}
                                 onChange={(value) => field.onChange(Number(value))}
                                 color="#4CAF50"/>
                )}/>

            <SliderInput label="Energy" value={energyLevel} onChange={setEnergyLevel} color="#FFC107"/>
            <SliderInput label="Niveau de motivation" value={motivationLevel} onChange={setMotivationLevel}
                         color="#2196F3"/>
            <SliderInput label="Niveau de stress" value={stressLevel} onChange={setStressLevel} color="#F44336"/>
            <SliderInput label="Qualité du sommeil" value={sleepQuality} onChange={setSleepQuality} color="#9C27B0"/>

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

            {/* Sparring Rounds */}
            <Text className="text-lg font-semibold mt-4 mb-2">Sparrings</Text>
            {sparringRounds.map((item, index) => (
                <View key={item.id} className="mb-4 border p-2 rounded">
                    <Text className="text-sm font-medium">Partenaire</Text>
                    <Controller
                        control={control}
                        name={`sparringRounds.${index}.partner`}
                        render={({field}) => <TextInput className="border p-1 rounded mb-1" {...field} />}
                    />
                    <Text className="text-sm font-medium">Résultat</Text>
                    <Controller
                        control={control}
                        name={`sparringRounds.${index}.outcome`}
                        render={({field: {onChange, value}}) => (
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
                        render={({field}) => <TextInput className="border p-1 rounded" {...field} />}
                    />
                    <Button title="Supprimer" onPress={() => removeSparring(index)} color="red"/>
                </View>
            ))}
            <Button title="Ajouter un sparring" onPress={() => appendSparring({partner: "", outcome: "unknown"})}/>

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

import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Button, Text, SafeAreaView } from "react-native";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkoutFormValues, workoutSchema } from "@/components/fromWorkout/schemas/workoutSchema";
import { DateTimeStep } from "./stepper/DateTimeStep";
import { TrainingInfoStep } from "./stepper/TrainingInfoStep";
import { FeelingsStep } from "./stepper/FeelingsStep";
import { NotesStep } from "./stepper/NotesStep";

const StepIndicator = ({ steps, currentStep }) => {
    return (
        <View style={styles.stepIndicatorContainer}>
            {Array.from({ length: steps }, (_, index) => (
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

export const WorkoutForm2 = () => {
    const [step, setStep] = useState(1);
    const {
        control,
        handleSubmit,
        formState: { errors },
        trigger,
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
            focusOfTheDay: "",
        },
    });

    const injuries = useFieldArray({
        control,
        name: "injuries",
    });

    const onSubmit = (data: WorkoutFormValues) => {
        console.log("Workout submitted:", data);
    };

    const nextStep = async () => {
        let isValid = false;
        switch (step) {
            case 1:
                isValid = await trigger(["date"]);
                break;
            case 2:
                isValid = await trigger(["type", "duration", "focusOfTheDay"]);
                break;
            case 3:
                isValid = await trigger([
                    "feeling",
                    "energyLevel",
                    "motivationLevel",
                    "stressLevel",
                    "sleepQuality",
                ]);
                break;
            default:
                isValid = true;
        }
        if (isValid) setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <DateTimeStep control={control} errors={errors} />;
            case 2:
                return <TrainingInfoStep control={control} errors={errors} />;
            case 3:
                return <FeelingsStep control={control} errors={errors} />;
            case 4:
                return <NotesStep control={control} errors={errors} injuries={injuries} />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <View style={styles.container}>
                    <StepIndicator steps={4} currentStep={step - 1} />
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {renderStep()}
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        {step > 1 && (
                            <Button title="Précédent" onPress={prevStep} color="#757575" />
                        )}
                        {step < 4 ? (
                            <Button title="Suivant" onPress={nextStep} color="#4CAF50" />
                        ) : (
                            <Button
                                title="Valider l'entraînement"
                                onPress={handleSubmit(onSubmit)}
                                color="#2196F3"
                            />
                        )}
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 100,
        borderWidth: 1, // Bordure de débogage
        borderColor: 'red',
    },
    stepIndicatorContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    step: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
    },
    completedStep: {
        backgroundColor: "#4CAF50",
    },
    currentStep: {
        backgroundColor: "#2196F3",
    },
    stepText: {
        color: "#fff",
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderWidth: 1, // Bordure de débogage
        borderColor: 'blue',
    },
});

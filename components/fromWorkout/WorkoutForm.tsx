// WorkoutForm.tsx
import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {WorkoutFormValues, workoutSchema} from "@/components/fromWorkout/schemas/workoutSchema";
import {ProgressStep, ProgressSteps} from "react-native-progress-steps";
import {DateTimeStep} from "./stepper/DateTimeStep";
import {TrainingInfoStep} from "./stepper/TrainingInfoStep";
import {FeelingsStep} from "./stepper/FeelingsStep";
import {NotesStep} from "./stepper/NotesStep";

export const WorkoutForm = () => {
    const {
        control,
        handleSubmit,
        formState: {errors},
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
            focusOfTheDay: ""
        },
    });

    const injuries = useFieldArray({
        control,
        name: "injuries",
    });

    const onSubmit = (data: WorkoutFormValues) => {
        console.log("Workout submitted:", data);
    };

    const validateStep1 = async (): Promise<boolean> => await trigger(['date']);
    const validateStep2 = async (): Promise<boolean> => await trigger(['type', 'duration', 'focusOfTheDay']);
    const validateStep3 = async (): Promise<boolean> => await trigger(['feeling', 'energyLevel', 'motivationLevel', 'stressLevel', 'sleepQuality']);

    return (
        <View style={styles.container}>
            <ProgressSteps
                activeStepIconBorderColor="#4CAF50"
                activeLabelColor="#4CAF50"
                activeStepIconColor="#4CAF50"
                completedStepIconColor="#4CAF50"
                completedProgressBarColor="#4CAF50"
                completedCheckColor="#ffffff"
            >
                <ProgressStep
                    label="Date & Heure"
                    onNext={validateStep1}
                    errors={!!errors.date}
                    nextBtnStyle={styles.nextButton}
                    previousBtnStyle={styles.previousButton}
                    nextBtnTextStyle={styles.buttonText}
                    previousBtnTextStyle={styles.buttonText}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <DateTimeStep control={control} errors={errors} />
                    </ScrollView>
                </ProgressStep>

                <ProgressStep
                    label="Entraînement"
                    onNext={validateStep2}
                    onPrevious={() => Promise.resolve(true)}
                    errors={!!(errors.type || errors.duration || errors.focusOfTheDay)}
                    nextBtnStyle={styles.nextButton}
                    previousBtnStyle={styles.previousButton}
                    nextBtnTextStyle={styles.buttonText}
                    previousBtnTextStyle={styles.buttonText}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <TrainingInfoStep control={control} errors={errors} />
                    </ScrollView>
                </ProgressStep>

                <ProgressStep
                    label="Ressenti"
                    onNext={validateStep3}
                    onPrevious={() => Promise.resolve(true)}
                    errors={!!(errors.feeling || errors.energyLevel || errors.motivationLevel || errors.stressLevel || errors.sleepQuality)}
                    nextBtnStyle={styles.nextButton}
                    previousBtnStyle={styles.previousButton}
                    nextBtnTextStyle={styles.buttonText}
                    previousBtnTextStyle={styles.buttonText}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <FeelingsStep control={control} errors={errors} />
                    </ScrollView>
                </ProgressStep>

                <ProgressStep
                    label="Notes"
                    onSubmit={handleSubmit(onSubmit)}
                    onPrevious={() => Promise.resolve(true)}
                    finishBtnText="Valider l'entraînement"
                    nextBtnStyle={styles.finishButton}
                    previousBtnStyle={styles.previousButton}
                    nextBtnTextStyle={styles.buttonText}
                    previousBtnTextStyle={styles.buttonText}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <NotesStep control={control} errors={errors} injuries={injuries} />
                    </ScrollView>
                </ProgressStep>
            </ProgressSteps>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100, // pour laisser de la place aux boutons
    },
    nextButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    previousButton: {
        backgroundColor: '#757575',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    finishButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

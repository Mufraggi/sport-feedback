import React, {useEffect} from "react";
import {SafeAreaView, ScrollView, Text, View} from "react-native";
import {format} from "date-fns";
import {useAppDispatch, useAppSelector} from "@/hooks/useWorkouts";
import {UUID} from "crypto";
import {getWorkoutById} from "@/state/workoutsSlice";


// Meter component for ratings
function RatingMeter({value, label, maxValue = 10, colorClass = "bg-green-500"}: {
    value: number;
    label: string;
    maxValue?: number;
    colorClass?: string;
}) {
    return (
        <View className="mb-3 w-full">
            <View className="flex-row justify-between mb-1">
                <Text className="text-sm text-gray-600">{label}</Text>
                <Text className="text-sm font-medium">{value}/{maxValue}</Text>
            </View>
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden w-full">
                <View
                    className={`h-full ${colorClass}`}
                    style={{width: `${(value / maxValue) * 100}%`}}
                />
            </View>
        </View>
    );
}

// Badge component for type and tags
function Badge({label, variant = "default"}: { label: string; variant?: string }) {
    // Function to determine type color
    const getTypeColor = (type: string, isType = false) => {
        if (isType) {
            switch (type) {
                case "JJB GI":
                    return "bg-purple-100 text-purple-700 border-purple-300";
                case "JJB NO GI":
                    return "bg-blue-100 text-blue-700 border-blue-300";
                case "GRAPPLING":
                    return "bg-orange-100 text-orange-700 border-orange-300";
                default:
                    return "bg-gray-100 text-gray-700 border-gray-300";
            }
        } else {
            return "bg-gray-100 text-gray-700 border-gray-300";
        }
    };

    return (
        <View className={`px-2 py-1 rounded-full border ${getTypeColor(label, variant === "type")}`}>
            <Text className={getTypeColor(label, variant === "type").split(" ")[1]}>{label}</Text>
        </View>
    );
}

// Outcome badge for sparring rounds
function OutcomeBadge({outcome}: { outcome: string }) {
    const getOutcomeStyle = (outcome: string) => {
        switch (outcome) {
            case "win":
                return "bg-green-100 text-green-700 border-green-300";
            case "lose":
                return "bg-red-100 text-red-700 border-red-300";
            case "draw":
                return "bg-yellow-100 text-yellow-700 border-yellow-300";
            default:
                return "bg-gray-100 text-gray-700 border-gray-300";
        }
    };

    return (
        <View className={`px-2 py-0.5 rounded-full border ${getOutcomeStyle(outcome)}`}>
            <Text className={getOutcomeStyle(outcome).split(" ")[1]}>
                {outcome.charAt(0).toUpperCase() + outcome.slice(1)}
            </Text>
        </View>
    );
}

// Section header component
function SectionHeader({title}: { title: string }) {
    return (
        <View className="border-b border-gray-200 pb-1 mb-3 w-full">
            <Text className="text-lg font-bold text-gray-800">{title}</Text>
        </View>
    );
}

export default function WorkoutDetailView({workoutId}: { workoutId: UUID }) {
    const dispatch = useAppDispatch();
    const {
        currentWorkout, // Renommé en currentWorkout pour correspondre au state
        loading,
        error
    } = useAppSelector((state) => state.workouts); // Accéder à tout le state pertinent

    useEffect(() => {
        if (workoutId) {
            dispatch(getWorkoutById(workoutId));
        }
    }, [dispatch, workoutId]); // Dépendances de l'effet
    console.log(currentWorkout)
    if (loading || !currentWorkout) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Loading...</Text>
            </View>
        );
    }
    const formattedDate = format(currentWorkout.date, "EEEE, MMMM d, yyyy");

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{flexGrow: 1}} className="w-full">
                <View className="w-full pb-10">
                    <View className="p-4 border-b border-gray-100 w-full">
                        <View className="flex-row justify-between items-center mb-2 w-full">
                            <Badge label={currentWorkout.type} variant="type"/>
                            <Text className="text-sm font-medium text-gray-600">
                                {currentWorkout.duration} minutes
                            </Text>
                        </View>
                        <Text className="text-lg font-bold text-gray-800 mb-1">
                            {currentWorkout.focusOfTheDay}
                        </Text>
                        <Text className="text-sm text-gray-600">
                            {formattedDate}
                        </Text>
                    </View>
                    <View className="p-4 w-full">
                        <View className="mb-4 flex-row items-center w-full">
                            <View className={`w-6 h-6 rounded-full items-center justify-center ${
                                currentWorkout.achievedGoal ? "bg-green-100" : "bg-red-100"
                            }`}>
                                <Text className={`text-xs font-bold ${
                                    currentWorkout.achievedGoal ? "text-green-700" : "text-red-700"
                                }`}>
                                    {currentWorkout.achievedGoal ? "✓" : "✗"}
                                </Text>
                            </View>
                            <Text className="ml-2 text-sm text-gray-700">
                                {currentWorkout.achievedGoal
                                    ? "Goal achieved"
                                    : "Goal not achieved"}
                            </Text>
                        </View>
                        <SectionHeader title="Session Metrics"/>
                        <RatingMeter
                            value={currentWorkout.feeling}
                            label="Overall Feeling"
                            colorClass="bg-green-500"
                        />
                        <RatingMeter
                            value={currentWorkout.energyLevel || 0}
                            label="Energy Level"
                            colorClass="bg-blue-500"
                        />
                        <RatingMeter
                            value={currentWorkout.motivationLevel || 0}
                            label="Motivation"
                            colorClass="bg-purple-500"
                        />
                        <RatingMeter
                            value={currentWorkout.sleepQuality || 0}
                            label="Sleep Quality"
                            colorClass="bg-indigo-500"
                        />
                        <RatingMeter
                            value={currentWorkout.stressLevel || 0}
                            label="Stress Level"
                            colorClass="bg-red-500"
                        />


                        {currentWorkout.sparringRounds && currentWorkout.sparringRounds.length > 0 && (
                            <View className="mt-4 w-full">
                                <SectionHeader title="Sparring Rounds"/>
                                {currentWorkout.sparringRounds.map((round, index) => (
                                    <View key={index} className="mb-3 p-3 bg-gray-50 rounded-lg w-full">
                                        <View className="flex-row justify-between items-center mb-1">
                                            <Text className="font-medium">Partner: {round.partner}</Text>
                                            <OutcomeBadge outcome={round.outcome}/>
                                        </View>
                                        {round.notes && (
                                            <Text className="text-sm text-gray-600">{round.notes}</Text>
                                        )}
                                    </View>
                                ))}
                            </View>
                        )}

                        {currentWorkout.notes && (
                            <View className="mt-4 w-full">
                                <SectionHeader title="Notes"/>
                                <Text className="text-sm text-gray-700 mb-3">
                                    {currentWorkout.notes}
                                </Text>
                            </View>
                        )}


                        {currentWorkout.injuries && currentWorkout.injuries.length > 0 && (
                            <View className="mt-4 w-full">
                                <SectionHeader title="Injuries"/>
                                {currentWorkout.injuries.map((injury, index) => (
                                    <Text key={index} className="text-sm text-red-600 mb-1">
                                        • {injury}
                                    </Text>
                                ))}
                            </View>
                        )}

                        {currentWorkout.tags && currentWorkout.tags.length > 0 && (
                            <View className="mt-4 w-full">
                                <SectionHeader title="Tags"/>
                                <View className="flex-row flex-wrap w-full">
                                    {currentWorkout.tags.map((tag) => (
                                        <View key={tag} className="mr-2 mb-2">
                                            <Badge label={tag}/>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
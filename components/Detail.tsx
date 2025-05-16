import React from "react";
import { SafeAreaView, ScrollView, Text, View, Dimensions } from "react-native";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectWorkoutById } from "@/state/workoutsSlice";

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

export default function WorkoutDetailView({workoutId}: { workoutId: string }) {
    const workout = useSelector((state: any) => selectWorkoutById(state, workoutId));

    if (!workout) return <View><Text>Workout not found</Text></View>;

    const formattedDate = format(workout.date, "EEEE, MMMM d, yyyy");

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="w-full">
                <View className="w-full">
                    <View className="p-4 border-b border-gray-100 w-full">
                        <View className="flex-row justify-between items-center mb-2 w-full">
                            <Badge label={workout.type} variant="type"/>
                            <Text className="text-sm font-medium text-gray-600">
                                {workout.duration} minutes
                            </Text>
                        </View>
                        <Text className="text-lg font-bold text-gray-800 mb-1">
                            {workout.focusOfTheDay}
                        </Text>
                        <Text className="text-sm text-gray-600">
                            {formattedDate}
                        </Text>
                    </View>
                    <View className="p-4 w-full">
                        <View className="mb-4 flex-row items-center w-full">
                            <View className={`w-6 h-6 rounded-full items-center justify-center ${
                                workout.achievedGoal ? "bg-green-100" : "bg-red-100"
                            }`}>
                                <Text className={`text-xs font-bold ${
                                    workout.achievedGoal ? "text-green-700" : "text-red-700"
                                }`}>
                                    {workout.achievedGoal ? "✓" : "✗"}
                                </Text>
                            </View>
                            <Text className="ml-2 text-sm text-gray-700">
                                {workout.achievedGoal
                                    ? "Goal achieved"
                                    : "Goal not achieved"}
                            </Text>
                        </View>
                        <SectionHeader title="Session Metrics"/>
                        <RatingMeter
                            value={workout.feeling}
                            label="Overall Feeling"
                            colorClass="bg-green-500"
                        />
                        <RatingMeter
                            value={workout.energyLevel || 0}
                            label="Energy Level"
                            colorClass="bg-blue-500"
                        />
                        <RatingMeter
                            value={workout.motivationLevel || 0}
                            label="Motivation"
                            colorClass="bg-purple-500"
                        />
                        <RatingMeter
                            value={workout.sleepQuality || 0}
                            label="Sleep Quality"
                            colorClass="bg-indigo-500"
                        />
                        <RatingMeter
                            value={workout.stressLevel || 0}
                            label="Stress Level"
                            colorClass="bg-red-500"
                        />


                        {workout.sparringRounds && workout.sparringRounds.length > 0 && (
                            <View className="mt-4 w-full">
                                <SectionHeader title="Sparring Rounds"/>
                                {workout.sparringRounds.map((round, index) => (
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

                        {workout.notes && (
                            <View className="mt-4 w-full">
                                <SectionHeader title="Notes"/>
                                <Text className="text-sm text-gray-700 mb-3">
                                    {workout.notes}
                                </Text>
                            </View>
                        )}


                        {workout.injuries && workout.injuries.length > 0 && (
                            <View className="mt-4 w-full">
                                <SectionHeader title="Injuries"/>
                                {workout.injuries.map((injury, index) => (
                                    <Text key={index} className="text-sm text-red-600 mb-1">
                                        • {injury}
                                    </Text>
                                ))}
                            </View>
                        )}

                        {workout.tags && workout.tags.length > 0 && (
                            <View className="mt-4 w-full">
                                <SectionHeader title="Tags"/>
                                <View className="flex-row flex-wrap w-full">
                                    {workout.tags.map((tag) => (
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
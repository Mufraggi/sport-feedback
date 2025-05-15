import {View, Text} from "react-native";
import {format} from "date-fns";
import { WorkoutCard} from "../domain/workout";
import {Badge} from "./Badge";
import {FeelingMeter} from "./FeelingMeter";

export default function CardFeedback(item: WorkoutCard) {
    const getTypeBorderColor = (type: string) => {
        switch (type) {
            case "JJB GI":
                return "border-l-purple-500";
            case "JJB NO GI":
                return "border-l-blue-500";
            case "GRAPPLING":
                return "border-l-orange-500";
            default:
                return "border-l-gray-500";
        }
    };

    const formattedDate = format(item.date, "MMMM d");

    return (
        <View
            className={`bg-white rounded-xl p-4 border-l-4 ${getTypeBorderColor(
                item.type
            )} shadow-sm`}
        >
            <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center">
                    <Text className="text-sm font-medium text-gray-700">
                        {formattedDate}
                    </Text>
                </View>
                <Badge label={item.type} variant="outline"/>
            </View>

            {item.focusOfTheDay && (
                <View className="mb-3">
                    <Text className="font-medium mb-1 text-gray-800">Focus</Text>
                    <Text className="text-sm text-gray-700">{item.focusOfTheDay}</Text>
                </View>
            )}

            <View className="mb-3">
                <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        <Text className="text-sm text-gray-700">
                            ⏱ {item.duration} min
                        </Text>
                    </View>
                    <FeelingMeter feeling={item.feeling}/>
                </View>
            </View>

            {item.shortNote && (
                <Text className="mt-1 text-sm text-gray-600 italic">
                    📝 {item.shortNote}
                </Text>
            )}

            {item.tags && item.tags.length > 0 && (
                <View className="flex-row flex-wrap mt-2">
                    {item.tags.map((tag) => (
                        <View
                            key={tag}
                            className="bg-gray-100 px-2 py-1 rounded-full mr-1 mb-1"
                        >
                            <Text className="text-xs text-gray-700">{tag}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}
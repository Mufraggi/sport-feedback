import { View, Text } from "react-native";
import Badge from "./Badge";
import StarRating from "@/components/Stars";
import { format } from 'date-fns';

type Workout = {
    type: string;
    date: Date;
    feeling: number;
    duration: number;
    notes?: string;
};

export default function CardFeedback(item: Workout) {
    return (
        <View className="bg-slate-100 rounded-xl p-3">
            <View className="flex-row justify-between items-center mb-2">
                <Badge label={item.type} variant="secondary" />
                <StarRating rating={item.feeling} maxStars={5} onChange={() => {}} />
            </View>

            <View className="flex-row items-center my-0.5">
                <Text className="text-sm text-gray-800">📅 {format(item.date, 'dd/MM/yyyy')}</Text>
            </View>
            <View className="flex-row items-center my-0.5">
                <Text className="text-sm text-gray-800">⏱ {item.duration} minutes</Text>
            </View>

            {item.notes && (
                <Text className="mt-2 text-xs text-gray-600 italic">📝 {item.notes}</Text>
            )}
        </View>
    );
}
import {Text, View} from "react-native";

export function FeelingMeter({ feeling }: { feeling: number }) {
    return (
        <View className="flex-row items-center">
            <Text className="text-sm mr-2">Feeling:</Text>
            <View className="flex-row">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <View
                        key={i}
                        className={`w-1 h-4 mx-0.5 rounded-sm ${
                            i <= feeling ? "bg-green-500" : "bg-gray-200"
                        }`}
                    />
                ))}
            </View>
            <Text className="ml-2 text-sm font-medium">{feeling}/10</Text>
        </View>
    );
}
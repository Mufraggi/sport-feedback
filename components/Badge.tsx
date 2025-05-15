import React from 'react';
import { Text, View } from 'react-native';

export function Badge({ label, variant }: { label: string; variant: string }) {
    // Function to determine type color
    const getTypeColor = (type: string) => {
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
    };

    return (
        <View className={`px-2 py-1 rounded-full border ${getTypeColor(label)}`}>
            <Text className={getTypeColor(label).split(" ")[1]}>{label}</Text>
        </View>
    );
}
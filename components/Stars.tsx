import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const StarRating = ({rating, maxStars = 5, onChange}: {
    rating: number,
    maxStars?: number,
    onChange: (rating: number) => void
}) => (
    <View className="flex-row">
        {Array.from({length: maxStars}).map((_, i) => (
            <TouchableOpacity key={i} onPress={() => onChange(i + 1)}>
                <Text className={`text-lg mx-0.5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                    {i < rating ? '★' : '☆'}
                </Text>
            </TouchableOpacity>
        ))}
    </View>
);

export default StarRating;
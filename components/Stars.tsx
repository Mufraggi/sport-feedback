import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const StarRating = ({rating, maxStars = 5, onChange}: {
    rating: number,
    maxStars?: number,
    onChange: (rating: number) => void
}) => (
    <View style={{flexDirection: 'row'}}>
        {Array.from({length: maxStars}).map((_, i) => (
            <TouchableOpacity key={i} onPress={() => onChange(i + 1)}>
                <Text style={[styles.star, i < rating ? styles.filled : styles.empty]}>
                    {i < rating ? '★' : '☆'}
                </Text>
            </TouchableOpacity>
        ))}
    </View>
);

const styles = StyleSheet.create({
    star: {
        fontSize: 18,
        marginHorizontal: 2,
    },
    filled: {
        color: '#FFD700',
    },
    empty: {
        color: '#ccc',
    },
});

export default StarRating;

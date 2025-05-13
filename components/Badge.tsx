import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Badge = ({ label }: { label: string; variant?: string }) => (
    <View style={styles.badge}>
        <Text style={styles.text}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#e2e8f0',
        borderRadius: 8,
    },
    text: {
        fontSize: 12,
        color: '#1e293b',
    },
});

export default Badge;

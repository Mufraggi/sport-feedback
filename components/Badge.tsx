import React from 'react';
import { Text, View } from 'react-native';

const Badge = ({ label, variant = 'default' }: { label: string; variant?: string }) => (
    <View className="px-2 py-1 bg-slate-200 rounded-lg">
        <Text className="text-xs text-slate-800">{label}</Text>
    </View>
);

export default Badge;
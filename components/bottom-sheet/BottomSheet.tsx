import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
    SharedValue,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';

type BottomSheetProps = {
    isOpen: SharedValue<boolean>;
    toggleSheet: () => void;
    duration?: number;
    children: React.ReactNode;
};

export default function BottomSheet({ isOpen, toggleSheet, duration = 500, children }: BottomSheetProps) {
    const height = useSharedValue(0);

    const progress = useDerivedValue(() =>
        withTiming(isOpen.value ? 0 : 1, { duration })
    );

    const sheetAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: progress.value * 2 * height.value }],
    }));

    const backdropAnimatedStyle = useAnimatedStyle(() => ({
        opacity: 1 - progress.value,
        zIndex: isOpen.value
            ? 1
            : withDelay(duration, withTiming(-1, { duration: 0 })),
    }));

    const { colorScheme } = useColorScheme();
    const backgroundClass =
        colorScheme === 'light' ? 'bg-white' : 'bg-zinc-800';

    return (
        <>
            <Animated.View
                className="absolute inset-0 bg-black/30"
                style={backdropAnimatedStyle}
            >
                <TouchableOpacity className="flex-1" onPress={toggleSheet} />
            </Animated.View>
            <Animated.View
                onLayout={(e) => {
                    height.value = e.nativeEvent.layout.height;
                }}
                className={`absolute bottom-0 w-full rounded-t-2xl px-6 py-4 z-20 ${backgroundClass}`}
                style={sheetAnimatedStyle}
            >
                {children}
            </Animated.View>
        </>
    );
}

import React, {useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import CardFeedback from "@/components/CardFeedback";
import {toWorkoutCard} from "@/domain/workout";
import {UUID} from "crypto";

import {useBottomSheet} from '@/components/bottom-sheet/BottomSheetContext';
import {useWorkouts} from "@/hooks/useWorkouts";

export default function Index() {
    const [selectedId, setSelectedId] = useState<UUID>();
    const {openBottomSheet} = useBottomSheet();
    const {workouts, loading, error} = useWorkouts();
    if (loading) return <Text>Chargement...</Text>;
    if (error) {
        return (
            <View>
                <Text>Erreur: {error}</Text>
            </View>
        );
    }
    return (
        <View testID="home-screen">
            <Text>Hello</Text>
            <FlatList
                data={workouts.map(toWorkoutCard)}
                contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 8}}
                ItemSeparatorComponent={() => <View style={{height: 16}}/>}
                keyExtractor={(item) => item.id.toString()}
                extraData={selectedId}
                renderItem={({item}) => (
                    <CardFeedback
                        id={item.id}
                        tags={item.tags}
                        shortNote={item.shortNote}
                        focusOfTheDay={item.focusOfTheDay}
                        type={item.type}
                        date={item.date}
                        feeling={item.feeling}
                        duration={item.duration}
                        onPress={() => openBottomSheet('page2', {id: item.id})} // <<< MODIFICATION ICI
                    />
                )}
            />
        </View>
    );
}
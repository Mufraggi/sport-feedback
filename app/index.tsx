import React, {useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import CardFeedback from "@/components/CardFeedback";
import {toWorkoutCard, Workout} from "@/domain/workout";
import {UUID} from "crypto";
import uuid from 'react-native-uuid';
import { useBottomSheet } from '@/components/bottom-sheet/BottomSheetContext';
import {useWorkouts} from "@/hooks/useWorkouts";

const fakeWorkouts: Workout[] = [
    {
        id: uuid.v4() as UUID,
        type: "JJB GI",
        date: new Date("2025-05-12"),
        duration: 90,
        tags: ["guard", "pressure"],
        feeling: 8,
        notes: "Bon rythme. J’ai réussi à garder le calme contre un partenaire plus lourd.",
        focusOfTheDay: "garder le calme sous pression",
        energyLevel: 7,
        motivationLevel: 9,
        stressLevel: 3,
        sleepQuality: 8,
        injuries: [],
        achievedGoal: true,
        sparringRounds: [
            {partner: "Léo", outcome: "draw", notes: "Très technique, échanges équilibrés."},
            {partner: "Mathieu", outcome: "lose", notes: "Il m’a pris le dos deux fois."}
        ]
    },
    {
        id: uuid.v4() as UUID,
        type: "JJB NO GI",
        date: new Date("2025-05-10"),
        duration: 75,
        tags: ["leglock", "passing"],
        feeling: 6,
        notes: "Manque de grip, difficile de stabiliser les positions.",
        focusOfTheDay: "contrôler sans kimono",
        energyLevel: 6,
        motivationLevel: 7,
        stressLevel: 4,
        sleepQuality: 5,
        injuries: ["genou gauche"],
        achievedGoal: false,
        sparringRounds: [
            {partner: "Alex", outcome: "win", notes: "Heel hook rapide."}
        ]
    },
    {
        id: uuid.v4() as UUID,
        type: "GRAPPLING",
        date: new Date("2025-05-08"),
        duration: 60,
        tags: ["wrestling", "scramble"],
        feeling: 7,
        notes: "J’ai beaucoup transpiré, très cardio. Bonne résistance mentale.",
        focusOfTheDay: "enchaîner les scrambles",
        energyLevel: 8,
        motivationLevel: 8,
        stressLevel: 2,
        sleepQuality: 7,
        injuries: [],
        achievedGoal: true,
        sparringRounds: [
            {partner: "Nico", outcome: "draw", notes: "Intense mais propre."}
        ]
    },
    {
        id: uuid.v4() as UUID,
        type: "JJB GI",
        date: new Date("2025-05-07"),
        duration: 90,
        tags: ["sweep", "gripfight"],
        feeling: 5,
        notes: "Pas en forme, beaucoup observé les autres.",
        focusOfTheDay: "améliorer les grips",
        energyLevel: 4,
        motivationLevel: 5,
        stressLevel: 6,
        sleepQuality: 4,
        injuries: [],
        achievedGoal: false
    },
    {
        id: uuid.v4() as UUID,
        type: "JJB GI",
        date: new Date("2025-05-05"),
        duration: 100,
        tags: ["passing", "pressure"],
        feeling: 9,
        notes: "Très bon flow aujourd’hui. J’ai réussi à rester en contrôle.",
        focusOfTheDay: "passage en pressure",
        energyLevel: 9,
        motivationLevel: 10,
        stressLevel: 1,
        sleepQuality: 8,
        injuries: [],
        achievedGoal: true
    },
    {
        id: uuid.v4() as UUID,
        type: "JJB NO GI",
        date: new Date("2025-05-03"),
        duration: 60,
        tags: ["ankle lock"],
        feeling: 7,
        notes: "Nouveau setup d’ankle lock testé avec succès.",
        focusOfTheDay: "tester de nouvelles attaques",
        energyLevel: 7,
        motivationLevel: 8,
        stressLevel: 2,
        sleepQuality: 7,
        injuries: [],
        achievedGoal: true
    },
    {
        id: uuid.v4() as UUID,
        type: "GRAPPLING",
        date: new Date("2025-05-02"),
        duration: 45,
        tags: ["take down", "defense"],
        feeling: 6,
        notes: "Me suis fait projeter plusieurs fois mais j’ai tenu.",
        focusOfTheDay: "défense en lutte",
        energyLevel: 6,
        motivationLevel: 6,
        stressLevel: 3,
        sleepQuality: 6,
        injuries: ["épaule droite"],
        achievedGoal: false
    },
    {
        id: uuid.v4() as UUID,
        type: "JJB GI",
        date: new Date("2025-04-30"),
        duration: 90,
        tags: ["guard retention", "triangle"],
        feeling: 10,
        notes: "Flow parfait, j’étais dans la zone.",
        focusOfTheDay: "rester fluide",
        energyLevel: 10,
        motivationLevel: 10,
        stressLevel: 1,
        sleepQuality: 9,
        injuries: [],
        achievedGoal: true
    }
];

export default function Index() {
    const [selectedId, setSelectedId] = useState<UUID>();
    const { openBottomSheet } = useBottomSheet();
    const { workouts, loading } = useWorkouts();
    if (loading) return <Text>Chargement...</Text>;
    console.log("--------");
    console.log(workouts);
    workouts.forEach(w => console.log(w));
    console.log("--------");
    return (
        <View testID="home-screen">
            <Text>Hello</Text>
            <FlatList
                data={workouts.map(toWorkoutCard)}
                contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
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
                        onPress={() => openBottomSheet('page2', { id: item.id })} // <<< MODIFICATION ICI
                    />
                )}
            />
        </View>
    );
}
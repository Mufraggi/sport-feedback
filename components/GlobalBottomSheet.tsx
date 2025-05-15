import {useBottomSheet} from "@/components/BottomSheetContext";
import BottomSheetComponent from "@/components/BottomSheet";
import {Text, View} from "react-native";
import React from "react";
import {Workout} from "@/domain/workout";
import {UUID} from "crypto";

const fakeWorkouts: Workout[] = [ /* ... vos données ... */ ]; // Pour l'exemple, si non importable

export function GlobalBottomSheet() {
    const {isOpen, closeBottomSheet, activePage, params} = useBottomSheet();

    return (
        <BottomSheetComponent isOpen={isOpen} toggleSheet={closeBottomSheet}>
            {activePage === 'page1' && (
                <View style={{padding: 20}}>
                    <Text style={{color: 'black'}}>Contenu de la page 1 (depuis FAB)</Text>
                    {/* Vous pouvez ajouter ici le formulaire ou le contenu pour 'page1' */}
                </View>
            )}
            {activePage === 'page2' && params?.id && ( // Vérifier que params et params.id existent
                <WorkoutDetailContent workoutId={params.id}/>
            )}
            {activePage === 'page2' && !params?.id && (
                <View style={{padding: 20}}>
                    <Text style={{color: 'black'}}>Erreur : ID du workout manquant.</Text>
                </View>
            )}
        </BottomSheetComponent>
    );
}

const WorkoutDetailContent = ({workoutId}: { workoutId: UUID | string }) => {
    const [workout, setWorkout] = React.useState<Workout | null | undefined>(null);

    React.useEffect(() => {
        if (workoutId) {

            const foundWorkout = fakeWorkouts.find(w => w.id === workoutId);
            setWorkout(foundWorkout);
            console.log(`Affichage des détails pour le workout ID: ${workoutId}`);
        }
    }, [workoutId]);

    if (!workout) {
        return <Text style={{color: 'black', padding: 20}}> {workoutId} Chargement des détails du workout...</Text>;
    }

    return (
        <View style={{padding: 20}}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>Détails du Workout : {workout.type}</Text>
            <Text style={{color: 'black'}}>ID: {workout.id}</Text>
            <Text style={{color: 'black'}}>Date: {new Date(workout.date).toLocaleDateString()}</Text>
            <Text style={{color: 'black'}}>Notes: {workout.notes || "Aucune note"}</Text>
        </View>
    );
};

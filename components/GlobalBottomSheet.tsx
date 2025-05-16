import {useBottomSheet} from "@/components/bottom-sheet/BottomSheetContext";
import BottomSheetComponent from "@/components/bottom-sheet/BottomSheet";
import {Text, View} from "react-native";
import React from "react";
import {Workout} from "@/domain/workout";
import {UUID} from "crypto";
import WorkoutDetailView from "@/components/TmpDetail";

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
                <WorkoutDetailView workoutId={params.id}/>
            )}
            {activePage === 'page2' && !params?.id && (
                <View style={{padding: 20}}>
                    <Text style={{color: 'black'}}>Erreur : ID du workout manquant.</Text>
                </View>
            )}
        </BottomSheetComponent>
    );
}



import React from "react";
import {useBottomSheet} from "@/components/bottom-sheet/BottomSheetContext";
import BottomSheetComponent from "@/components/bottom-sheet/BottomSheet";
import {Text, TouchableOpacity, View} from "react-native";
import WorkoutDetailView from "@/components/Detail";
import {UUID} from "crypto";
import { WorkoutForm2 } from "../fromWorkout/WorkoutForm2";



export function GlobalBottomSheet() {
    const {isOpen, closeBottomSheet, activePage, params} = useBottomSheet();

    // Choisir le contenu à afficher en fonction de la page active
    const renderContent = () => {
        switch (activePage) {
            case 'page1':
                return (
                    <WorkoutForm2/>
                );
            case 'page2':
                if (params?.id) {
                    const id = params.id as UUID;
                    return <WorkoutDetailView workoutId={id}/>;
                } else {
                    return (
                        <View className="p-5 w-full">
                            <Text className="text-black text-lg font-bold">Erreur : ID du workout manquant.</Text>
                        </View>
                    );
                }
            default:
                return (
                    <View className="p-5 w-full">
                        <Text className="text-black">Aucun contenu à afficher</Text>
                    </View>
                );
        }
    };

    return (
        <BottomSheetComponent isOpen={isOpen} toggleSheet={closeBottomSheet}>
            <View className="w-full relative pb-10">
                <TouchableOpacity
                    onPress={closeBottomSheet}
                    className="absolute left-4 top-4 z-50 bg-gray-200 rounded-full w-8 h-8 items-center justify-center"
                >
                    <Text className="text-gray-800 font-bold">✕</Text>
                </TouchableOpacity>
            </View>
            {renderContent()}
        </BottomSheetComponent>
    );
}
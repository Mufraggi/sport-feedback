import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Stack} from 'expo-router';
import "../global.css"
import {BottomSheetProvider} from "@/components/bottom-sheet/BottomSheetContext";
import {GlobalBottomSheet} from "@/components/GlobalBottomSheet";
import FabContainer from "@/components/fab-buttom/FabContainer";
import {createTables, getDBConnection,insertSampleWorkouts} from "@/db/database";
import {Provider} from "react-redux";
import {store} from "@/store/store";

export default function RootLayout() {
    useEffect(() => {
        const setupDb = async () => {
            const db = await getDBConnection();
            await createTables(db);

            // À ne pas faire à chaque démarrage une fois que tu as des données réelles :
            await insertSampleWorkouts();
        };

        setupDb().catch((err) => {
            console.error("Erreur lors de l'initialisation de la DB:", err);
        });
    }, []);
    return (
        <Provider store={store}>
            <BottomSheetProvider>
                <SafeAreaView style={styles.container}>
                    <Stack/>
                    <GlobalBottomSheet/>
                    <FabContainer/>
                </SafeAreaView>
            </BottomSheetProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    fabContainer: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        zIndex: 999, // S'assurer qu'il est au-dessus du BottomSheet si le backdrop n'est pas plein écran
    },
    button: { // Ce style semble être pour les boutons enfants du FAB, à vérifier
        width: 40,
        height: 40,
        backgroundColor: '#82cab2',
        position: 'absolute',
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -2, // Ce zIndex pourrait être problématique
        flexDirection: 'row',
    },
    buttonContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: {width: -0.5, height: 3.5},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // Pour Android
    },
    content: { // Ce style semble être pour le texte dans les boutons enfants
        color: '#f8f9ff',
        fontWeight: '500',
    },
});
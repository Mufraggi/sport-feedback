import {View, StyleSheet,Text} from "react-native";
import Badge from "./Badge";
import StarRating from "@/components/Stars";
import { format } from 'date-fns';

type Workout = {
    type: string;
    date: string;
    feeling: number;
    duration: number;
    notes?: string;
};

export default function CardFeedback(item: Workout) {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Badge label={item.type} variant="secondary" />
                <StarRating rating={item.feeling} maxStars={5} onChange={() => {}} />
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>📅 {format(new Date(item.date), 'dd/MM/yyyy')}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>⏱ {item.duration} minutes</Text>
            </View>

            {item.notes && (
                <Text style={styles.notes}>📝 {item.notes}</Text>
            )}
        </View>)
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        padding: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    infoLabel: {
        fontSize: 14,
        color: '#333',
    },
    notes: {
        marginTop: 8,
        fontSize: 13,
        color: '#555',
        fontStyle: 'italic',
    },
});
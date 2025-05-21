// components/DateTimeSelector.tsx
import React, { useState } from "react";
import { Button, Platform, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export const DateTimeSelector = ({
                                     date,
                                     onChangeDate,
                                 }: {
    date: Date;
    onChangeDate: (date: Date) => void;
}) => {
    const [showPicker, setShowPicker] = useState(false);
    const [mode, setMode] = useState<'date' | 'time'>('date');

    const [tempDate, setTempDate] = useState<Date>(date);

    const showMode = (currentMode: 'date' | 'time') => {
        setMode(currentMode);
        setShowPicker(true);
    };

    const onChange = (_event: any, selectedDate?: Date) => {
        if (!selectedDate) {
            setShowPicker(false);
            return;
        }

        setShowPicker(false);

        const newDate = new Date(tempDate);

        if (mode === 'date') {
            newDate.setFullYear(selectedDate.getFullYear());
            newDate.setMonth(selectedDate.getMonth());
            newDate.setDate(selectedDate.getDate());
        } else if (mode === 'time') {
            newDate.setHours(selectedDate.getHours());
            newDate.setMinutes(selectedDate.getMinutes());
        }

        setTempDate(newDate);
        onChangeDate(newDate); // ✅ Envoie bien une instance de Date
    };

    const formatDate = (d: Date) =>
        d.toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    const formatTime = (d: Date) =>
        d.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        <View>
            <Button title="Choisir une date" onPress={() => showMode("date")} />
            <Text>Date sélectionnée : {formatDate(tempDate)}</Text>

            <Button title="Choisir une heure" onPress={() => showMode("time")} />
            <Text>Heure sélectionnée : {formatTime(tempDate)}</Text>

            {showPicker && (
                <DateTimePicker
                    value={tempDate}
                    mode={mode}
                    is24Hour
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onChange}
                />
            )}
        </View>
    );
};

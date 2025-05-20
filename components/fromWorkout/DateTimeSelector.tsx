// components/DateTimeSelector.tsx
import React, {useState} from "react";
import {Button, Platform, Text, View} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

export const DateTimeSelector = ({
                                     date,
                                     onChangeDate,
                                 }: {
    date: Date;
    onChangeDate: (date: Date) => void;
}) => {
    const [showPicker, setShowPicker] = useState(false);
    const [mode, setMode] = useState<'date' | 'time'>('date');

    const showMode = (currentMode: 'date' | 'time') => {
        setShowPicker(true);
        setMode(currentMode);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(false);
        onChangeDate(currentDate);
    };

    const formatDate = (d: Date) =>
        d.toLocaleDateString('fr-FR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
    const formatTime = (d: Date) =>
        d.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'});

    return (
        <View>
            <Button title="Choisir une date" onPress={() => showMode('date')} />
            <Text>Date sélectionnée : {formatDate(date)}</Text>

            <Button title="Choisir une heure" onPress={() => showMode('time')} />
            <Text>Heure sélectionnée : {formatTime(date)}</Text>

            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode={mode}
                    is24Hour
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange}
                />
            )}
        </View>
    );
};

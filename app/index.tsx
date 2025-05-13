import React from 'react';
import {View, Text} from 'react-native';
import CardFeedback from "@/components/CardFeedback";


export default function Index() {
    return (<View testID='home-screen'><Text>Hello </Text>
        <CardFeedback type={'jbb'} date={new Date().getDate().toString()} feeling={4} duration={10} />
    </View>)
}

import React from 'react';
import {View, Text, FlatList} from 'react-native';
import CardFeedback from "@/components/CardFeedback";


const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export default function Index() {
    return (<View testID='home-screen'><Text>Hello </Text>
            <FlatList data={data}
                      keyExtractor={(index) => index.toString()}
                      renderItem={(index) => <CardFeedback
                          type={'jbb'} date={new Date().getDate().toString()}
                          feeling={4}
                          duration={10}/>}
            />
        </View>
    )
}

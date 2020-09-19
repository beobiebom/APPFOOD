import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';

export default function ProfileScreen() {
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Feed!</Text>
            </View>
        </SafeAreaView>
    )
}
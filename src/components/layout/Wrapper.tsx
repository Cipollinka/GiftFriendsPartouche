import React from 'react';
import {Image, SafeAreaView, View} from 'react-native';

export default function BackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <View style={{flex:1}}>
        <Image style={{flex: 1, width: '100%', height: '100%', position: 'absolute'}} source={require('../../assets/images/bg.png')}/>
    <SafeAreaView
      style={{flex: 1, position: 'relative'}}>
      {children}
    </SafeAreaView>
      </View>
  );
}

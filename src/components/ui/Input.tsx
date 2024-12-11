import {TextInput, TextInputProps} from 'react-native';
import React from 'react';

export default function Input({style, ...props}: TextInputProps) {
  return (
    <TextInput
      {...props}
      placeholderTextColor={'#FFFFFF80'}
      style={[
        {
          backgroundColor: '#252525',
          height: 56,
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          fontSize: 16,
          color: '#FFFFFF',
        },
        style,
      ]}
    />
  );
}

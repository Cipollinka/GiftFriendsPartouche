import React from 'react';
import {Text, StyleSheet, TextStyle, StyleProp} from 'react-native';
import {TextProps} from 'react-native-svg';

const fontWeights = {
  regular: 'DMSans-Regular',
  bold: 'DMSans-Bold',
  semibold: 'DMSans-SemiBold',
  black: 'DMSans-Black',
  medium: 'DMSans-Medium',
  light: 'DMSans-Light',
};

interface Props extends TextProps {
  style?: StyleProp<TextStyle>;
  fw?: keyof typeof fontWeights;
  fs?: number;
  align?: 'left' | 'center' | 'right' | 'justify';
  mt?: number;
  color?: string;
  children: React.ReactNode;
}

const CustomText = ({
  style,
  fw = 'regular',
  fs = 16,
  align = 'left',
  mt,
  color,
  ...props
}: Props) => {
  return (
    <Text
      style={[
        styles.text,
        style,
        {
          fontFamily: fontWeights[fw] as any,
          fontSize: fs || 17,
          textAlign: align,
          marginTop: mt || 0,
          color: color || styles.text.color,
        },
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
});

export default CustomText;

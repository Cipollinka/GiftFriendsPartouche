import {View} from 'react-native';
import React from 'react';
import ProgressWheel from './ProgressWheel';
import Row from '@/components/layout/Row';
import CustomText from '@/components/ui/Text';

interface Props {
  progress: number;
  total: number;
}

export default function Info({progress, total}: Props) {
  return (
    <Row
      justify="space-between"
      style={{
        width: '100%',
        backgroundColor: '#252525',
        borderRadius: 24,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginTop: 14,
      }}>
      <View style={{gap: 16}}>
        <Row gap={10}>
          <View
            style={{
              width: 16,
              height: 16,
              borderRadius: 9999,
              backgroundColor: '#fff',
            }}
          />
          <CustomText fs={14}>In progress</CustomText>
        </Row>

        <Row gap={10}>
          <View
            style={{
              width: 16,
              height: 16,
              borderRadius: 9999,
              backgroundColor: '#DD091E',
            }}
          />
          <CustomText fs={14}>Done</CustomText>
        </Row>
      </View>
      <ProgressWheel progress={progress} total={total} />
    </Row>
  );
}

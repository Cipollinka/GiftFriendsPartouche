import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Row from './layout/Row';
import ArrowIcon from '@/assets/icons/arrow.svg';
import CustomText from './ui/Text';

interface Props {
  onBackPress: () => void;
  title?: string;
  actionText?: string;
  onActionPress?: () => void;
  isActionDisabled?: boolean;
}

export default function TopTitle({
  onBackPress,
  title,
  actionText,
  onActionPress,
  isActionDisabled,
}: Props) {
  return (
    <Row style={{width: '100%', position: 'relative'}}>
      <TouchableOpacity onPress={onBackPress}>
        <ArrowIcon />
      </TouchableOpacity>

      {title && (
        <View style={{left: '50%', transform: [{translateX: '-60%'}]}}>
          <CustomText fw="semibold" fs={25}>
            {title}
          </CustomText>
        </View>
      )}

      {actionText && (
        <TouchableOpacity
          disabled={isActionDisabled}
          onPress={onActionPress}
          style={{position: 'absolute', right: 0}}>
          <View
            style={{
              padding: 8,
              paddingRight: 0,
            }}>
            <CustomText
              color="#DD091E"
              fs={14}
              fontWeight="semibold"
              style={{opacity: isActionDisabled ? 0.5 : 1}}>
              {actionText}
            </CustomText>
          </View>
        </TouchableOpacity>
      )}
    </Row>
  );
}

import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import CustomText from '@/components/ui/Text';
import {Gift, GiftPopularity} from '@/types/common';
import Row from '@/components/layout/Row';
import DotsIcon from '@/assets/icons/dots.svg';
import {useUserStore} from '@/stores/userStore';

interface Props {
  gift: Gift;
  onPress?: (gift: Gift) => void;
  onAddRecipient?: (gift: Gift) => void;
}

const getPopularityLabel = (priority: GiftPopularity) => {
  switch (priority) {
    case GiftPopularity.HIGH:
      return 'High';
    case GiftPopularity.MEDIUM:
      return 'Medium';
    case GiftPopularity.LOW:
      return 'Low';
    default:
      return 'Unknown';
  }
};

export default function Item({gift, onPress, onAddRecipient}: Props) {
  const recipient = useUserStore(state =>
    state.recipients.find(r => r.giftId === gift.id),
  );

  const handleAddRecipient = () => {
    if (recipient) return;
    onAddRecipient && onAddRecipient(gift);
    console.log('add recipient');
  };

  return (
    <View
      style={{
        width: onPress ? '100%' : 300,
        borderRadius: 32,
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#252525',
      }}>
      <Row justify="space-between" style={{width: '100%'}}>
        <Row gap={10}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 9999,
              backgroundColor: '#0a0a0a80',
            }}>
            {gift?.image && (
              <Image
                source={{uri: gift.image}}
                style={{width: 44, height: 44, borderRadius: 9999}}
              />
            )}
          </View>
          <CustomText fw="bold">{gift?.name}</CustomText>
        </Row>

        <Row gap={2}>
          <View
            style={{
              borderRadius: 50,
              backgroundColor: '#DD091E',
              paddingVertical: 4,
              paddingHorizontal: 12,
            }}>
            <CustomText fw="medium" fs={12}>
              {getPopularityLabel(gift?.popularity)}
            </CustomText>
          </View>

          {onPress && (
            <TouchableOpacity onPress={() => onPress(gift)}>
              <View style={{padding: 8, paddingRight: 0}}>
                <DotsIcon />
              </View>
            </TouchableOpacity>
          )}
        </Row>
      </Row>

      <CustomText mt={12}>{gift?.description.slice(0, 100)}</CustomText>

      <View style={{marginTop: 16}}>
        {recipient && onAddRecipient && (
          <Row justify="space-between" style={{width: '100%'}}>
            <CustomText color="#FFFFFF80" fs={14}>
              For {recipient.name} {recipient.surname}
            </CustomText>

            <CustomText fs={20} fw="bold">
              20 $
            </CustomText>
          </Row>
        )}

        {!recipient && onAddRecipient && (
          <Row justify="space-between" style={{width: '100%'}}>
            <TouchableOpacity onPress={handleAddRecipient}>
              <CustomText color="#DD091E" fs={14}>
                + Add recipient
              </CustomText>
            </TouchableOpacity>

            <CustomText fs={20} fw="bold">
              {gift?.price} $
            </CustomText>
          </Row>
        )}
      </View>
    </View>
  );
}

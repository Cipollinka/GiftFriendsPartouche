import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from '@/components/ui/Text';
import {Event, EventPriority} from '@/types/common';
import Row from '@/components/layout/Row';
import DotsIcon from '@/assets/icons/dots.svg';
import DateIcon from '@/assets/icons/date.svg';
import {getEventTypeOptions} from '@/utils/getEventTypeOption';
import {useUserStore} from '@/stores/userStore';

interface Props {
  event: Event;
  onPress?: (event: Event) => void;
  onCheckGift?: (event: Event) => void;
  onAddGift?: (event: Event) => void;
}

const getPriorityLabel = (priority: EventPriority) => {
  switch (priority) {
    case EventPriority.HIGH:
      return 'High';
    case EventPriority.MEDIUM:
      return 'Medium';
    case EventPriority.LOW:
      return 'Low';
    default:
      return 'Unknown';
  }
};

export default function Item({event, onPress, onCheckGift, onAddGift}: Props) {
  const eventType = getEventTypeOptions(event.type);
  const Icon = eventType?.icon;
  const gift = useUserStore(state =>
    state.gifts.find(gift => gift.eventId === event.id),
  );

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
        <CustomText fw="bold">{event.title}</CustomText>

        <Row gap={2}>
          <View
            style={{
              borderRadius: 50,
              backgroundColor: '#DD091E',
              paddingVertical: 4,
              paddingHorizontal: 12,
            }}>
            <CustomText fw="medium" fs={12}>
              {getPriorityLabel(event.priority)}
            </CustomText>
          </View>

          {onPress && (
            <TouchableOpacity onPress={() => onPress(event)}>
              <View style={{padding: 8, paddingRight: 0}}>
                <DotsIcon />
              </View>
            </TouchableOpacity>
          )}
        </Row>
      </Row>

      <CustomText mt={8}>{event.description.slice(0, 100)}</CustomText>

      <Row justify="space-between" mt={12} style={{width: '100%'}}>
        <Row gap={3}>
          <DateIcon />
          <CustomText fw="medium" fs={14}>
            10.01.2024
          </CustomText>
        </Row>

        <Row gap={3}>
          {Icon && <Icon color="#DD091E" />}
          {eventType && (
            <CustomText fw="medium" fs={14}>
              {eventType.label}
            </CustomText>
          )}
        </Row>
      </Row>

      <View style={{marginTop: 16}}>
        {gift && (
          <Row
            justify="space-between"
            style={{width: '100%', marginLeft: onCheckGift ? 0 : 'auto'}}>
            {onCheckGift && (
              <TouchableOpacity
                disabled={!onCheckGift}
                onPress={() => onCheckGift && onCheckGift(event)}>
                <CustomText color="#DD091E" fs={14}>
                  Check gift
                </CustomText>
              </TouchableOpacity>
            )}

            <CustomText fs={20} fw="bold">
              {gift.price} $
            </CustomText>
          </Row>
        )}

        {!gift && onAddGift && (
          <TouchableOpacity
            disabled={!onAddGift}
            onPress={() => onAddGift && onAddGift(event)}>
            <CustomText color="#DD091E" fs={14}>
              + Add gift
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

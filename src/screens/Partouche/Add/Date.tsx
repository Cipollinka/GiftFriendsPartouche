import React, {useEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import TopTitle from '@/components/TopTitle';
import {Image, TouchableOpacity, View} from 'react-native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import CustomText from '@/components/ui/Text';
import Row from '@/components/layout/Row';
import {EVENT_PRIORITIES} from '@/constants/common';
import {EventPriority} from '@/types/common';
import {useUserStore} from '@/stores/userStore';

export default function PartoucheAddDate() {
  const nav = useNavigation<UseNavigationProp>();

  const [eventPriority, setEventPriority] = useState<EventPriority | null>(
    null,
  );

  const currentEvent = useUserStore(state => state.currentEvent);
  const setCurrentEvent = useUserStore(state => state.setCurrentEvent);

  const isEdit = currentEvent?.id !== undefined;
  const isNextDisabled = !eventPriority;

  useEffect(() => {
    if (!isEdit) return;

    currentEvent?.priority && setEventPriority(currentEvent.priority);
  }, [isEdit, currentEvent]);

  const handleNextPress = () => {
    if (!eventPriority) return;

    setCurrentEvent({
      ...currentEvent,
      priority: eventPriority,
    });
    nav.navigate(Screens.PARTOUCHE_ADD_REMINDER);
  };

  return (
    <BackgroundWrapper>
      <Container>
        <View style={{marginBottom: 10, width: '100%'}}>
          <TopTitle
            onBackPress={() => nav.goBack()}
            title="Add event"
            actionText="Next"
            isActionDisabled={isNextDisabled}
            onActionPress={handleNextPress}
          />
        </View>

        <View
          style={{
            marginTop: 20,
            marginHorizontal: 'auto',
          }}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={{width: 240, height: 225}}
          />
        </View>

        <CustomText mt={24} fw="medium" style={{opacity: 0.5}}>
          Priority
        </CustomText>

        <View style={{gap: 9, width: '100%', paddingTop: 10, marginBottom: 30}}>
          {EVENT_PRIORITIES.map(priority => {
            const isSelected = priority
              ? priority.value === eventPriority
              : false;

            return (
              <TouchableOpacity
                key={priority.label}
                onPress={() => setEventPriority(priority.value)}>
                <Row
                  justify="center"
                  style={{
                    width: '100%',
                    backgroundColor: isSelected ? '#DD091E' : '#252525',
                    height: 56,
                    borderRadius: 20,
                  }}>
                  <CustomText>{priority.label}</CustomText>
                </Row>
              </TouchableOpacity>
            );
          })}
        </View>
      </Container>
    </BackgroundWrapper>
  );
}

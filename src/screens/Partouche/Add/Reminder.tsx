import React, {useEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import TopTitle from '@/components/TopTitle';
import {Image, TouchableOpacity, View} from 'react-native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import CustomText from '@/components/ui/Text';
import Row from '@/components/layout/Row';
import DatePicker from 'react-native-date-picker';

import CalendarIcon from '@/assets/icons/date.svg';
import TimeIcon from '@/assets/icons/time.svg';
import {useUserStore} from '@/stores/userStore';

export default function PartoucheAddDate() {
  const nav = useNavigation<UseNavigationProp>();

  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const currentEvent = useUserStore(state => state.currentEvent);
  const setCurrentEvent = useUserStore(state => state.setCurrentEvent);
  const lastEventId = useUserStore(state => state.events.length);

  const isEdit = currentEvent?.id !== undefined;
  const isNextDisabled = !date || !time;

  useEffect(() => {
    if (!isEdit) return;

    currentEvent?.reminderDate && setDate(new Date(currentEvent.reminderDate));
    currentEvent?.reminderTime && setTime(new Date(currentEvent.reminderTime));
  }, [isEdit, currentEvent]);

  const handleNextPress = () => {
    setCurrentEvent({
      ...currentEvent,
      id: currentEvent?.id ?? lastEventId + 1,
      reminderDate: date.toISOString(),
      reminderTime: time.toISOString(),
    });

    nav.navigate(Screens.PARTOUCHE_ADD_GIFT);
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
            source={require('@/assets/images/notification.png')}
            style={{width: 240, height: 225}}
          />
        </View>

        <CustomText mt={24} fw="medium" style={{opacity: 0.5}}>
          Reminder
        </CustomText>

        <View style={{gap: 12, width: '100%', marginTop: 10}}>
          <TouchableOpacity onPress={() => setIsDateModalOpen(true)}>
            <Row
              gap={6}
              style={{
                width: '100%',
                paddingLeft: 20,
                height: 56,
                borderRadius: 20,
                backgroundColor: '#252525',
              }}>
              <CalendarIcon width={24} height={24} />
              <View>
                <CustomText>
                  {date.toLocaleDateString().split('T')[0]}
                </CustomText>
              </View>
            </Row>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsTimeModalOpen(true)}>
            <Row
              gap={6}
              style={{
                width: '100%',
                paddingLeft: 20,
                height: 56,
                borderRadius: 20,
                backgroundColor: '#252525',
              }}>
              <TimeIcon width={24} height={24} />
              <View>
                <CustomText>{time.toTimeString().slice(0, 5)}</CustomText>
              </View>
            </Row>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          open={isDateModalOpen}
          date={date}
          mode="date"
          onConfirm={selectedDate => {
            setIsDateModalOpen(false);
            setDate(selectedDate);
          }}
          onCancel={() => setIsDateModalOpen(false)}
          minimumDate={new Date()}
        />

        <DatePicker
          modal
          open={isTimeModalOpen}
          date={time}
          mode="time"
          onConfirm={selectedDate => {
            setIsTimeModalOpen(false);
            setTime(selectedDate);
          }}
          onCancel={() => setIsTimeModalOpen(false)}
        />
      </Container>
    </BackgroundWrapper>
  );
}

import React, {useEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import TopTitle from '@/components/TopTitle';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {useUserStore} from '@/stores/userStore';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import Input from '@/components/ui/Input';
import DatePicker from 'react-native-date-picker';

import CalendarIcon from '@/assets/icons/date.svg';
import Row from '@/components/layout/Row';
import TextArea from '@/components/ui/TextArea';
import {EVENT_TYPES} from '@/constants/common';
import {EventType} from '@/types/common';

export default function PartoucheAdd() {
  const nav = useNavigation<UseNavigationProp>();

  const setCurrentEvent = useUserStore(state => state.setCurrentEvent);

  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const currentEvent = useUserStore(state => state.currentEvent);
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');

  const isEdit = currentEvent?.id !== undefined;
  const isNextDisabled = !eventType || !title || !description;

  useEffect(() => {
    if (!isEdit) return;

    currentEvent?.type && setEventType(currentEvent.type);
    currentEvent?.title && setTitle(currentEvent.title);
    currentEvent?.date && setDate(new Date(currentEvent.date));
    currentEvent?.description && setDescription(currentEvent.description);
  }, [isEdit, currentEvent]);

  const handleNextPress = () => {
    if (!eventType) return;

    setCurrentEvent({
      ...currentEvent,
      type: eventType,
      title: title,
      date: date.toISOString(),
      description: description,
    });

    nav.navigate(Screens.PARTOUCHE_ADD_DATE);
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}>
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

          <View style={{width: '100%', marginTop: 10, gap: 8}}>
            <Input
              placeholder="Event name"
              value={title}
              onChangeText={setTitle}
            />

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

            <TextArea
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <CustomText mt={24} fw="medium" style={{opacity: 0.5}}>
            Type event
          </CustomText>

          <View
            style={{gap: 9, width: '100%', paddingTop: 10, marginBottom: 30}}>
            {EVENT_TYPES.map(type => {
              const Icon = type.icon;
              const isSelected = type ? type.type === eventType : false;

              return (
                <TouchableOpacity
                  key={type.label}
                  onPress={() => setEventType(type.type)}>
                  <Row
                    justify="center"
                    gap={10}
                    style={{
                      width: '100%',
                      backgroundColor: isSelected ? '#DD091E' : '#252525',
                      height: 56,
                      borderRadius: 20,
                    }}>
                    <Icon color={isSelected ? '#fff' : '#DD091E'} />
                    <CustomText>{type.label}</CustomText>
                  </Row>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </Container>

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
    </BackgroundWrapper>
  );
}

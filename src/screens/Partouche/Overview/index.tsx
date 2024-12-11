import React, {useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import {Image, ScrollView, View} from 'react-native';
import Button from '@/components/ui/Button';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import Item from './Item';
import BottomNavigation from '@/components/BottomNavigation';
import {useUserStore} from '@/stores/userStore';
import {Event} from '@/types/common';
import BottomMenu from '@/components/OverviewBottomMenu';

export default function PartoucheOverview() {
  const nav = useNavigation<UseNavigationProp>();

  const [currentPressedEvent, setCurrentPressedEvent] = useState<Event | null>(
    null,
  );
  const events = useUserStore(state => state.events);
  const setCurrentEvent = useUserStore(state => state.setCurrentEvent);
  const setCurrentGift = useUserStore(state => state.setCurrentGift);

  const doneEvents = useUserStore(state => state.doneEvents);
  const addDoneEvent = useUserStore(state => state.addDoneEvent);

  // const setEvents = useUserStore(state => state.setEvents);

  const removeEvent = useUserStore(state => state.removeEvent);
  // setEvents([]);
  const isEmpty = events.length === 0;

  const handleEventPress = (event: Event | null) => {
    if (!event) return;
    setCurrentEvent(event);
    setCurrentPressedEvent(null);
    nav.navigate(Screens.PARTOUCHE_ADD);
  };

  const handleEventDelete = (event: Event | null) => {
    if (!event) return;

    removeEvent(event.id);
    setCurrentPressedEvent(null);
  };

  const handleCheckGift = (event: Event | null) => {
    if (!event) return;

    nav.navigate(Screens.GIFTS_OVERVIEW, {eventId: event.id});
  };

  const handleAddGift = (event: Event | null) => {
    if (!event) return;

    setCurrentGift(null);
    nav.navigate(Screens.GIFTS_ADD, {eventId: event.id});
  };

  return (
    <BackgroundWrapper>
      <Container>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingBottom: 5,
          }}>
          <CustomText fs={25} fw="semibold">
            Partouche Events
          </CustomText>
        </View>

        {isEmpty && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginTop: 100,
            }}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={{width: 245, height: 245}}
            />

            <CustomText
              fw="semibold"
              fs={25}
              style={{width: 240}}
              align="center">
              There's nothing here yet
            </CustomText>
          </View>
        )}

        {!isEmpty && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{width: '100%', marginTop: 20}} />
            <View style={{gap: 10}}>
              {events.map(event => (
                <Item
                  key={event.id}
                  event={event}
                  onPress={setCurrentPressedEvent}
                  onCheckGift={() => handleCheckGift(event)}
                  onAddGift={() => handleAddGift(event)}
                />
              ))}
            </View>
          </ScrollView>
        )}
        <BottomMenu
          isOpen={!!currentPressedEvent}
          isEventDone={
            currentPressedEvent?.id
              ? doneEvents.includes(currentPressedEvent.id)
              : false
          }
          onClose={() => setCurrentPressedEvent(null)}
          onEdit={() => handleEventPress(currentPressedEvent)}
          onDelete={() => handleEventDelete(currentPressedEvent)}
          onDone={() => {
            currentPressedEvent && addDoneEvent(currentPressedEvent.id);
            setCurrentPressedEvent(null);
          }}
        />
      </Container>
      <View
        style={{
          width: '100%',
          marginTop: 'auto',
          paddingHorizontal: 16,
          paddingBottom: 10,
          gap: 12,
        }}>
        <Button
          title="Add Partouche Event"
          onPress={() => {
            setCurrentEvent(null);
            nav.navigate(Screens.PARTOUCHE_ADD);
          }}
        />
        <BottomNavigation />
      </View>
    </BackgroundWrapper>
  );
}

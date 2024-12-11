import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import TopTitle from '@/components/TopTitle';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {Image, View} from 'react-native';
import Button from '@/components/ui/Button';
import {useUserStore} from '@/stores/userStore';
import {Event} from '@/types/common';

export default function PartoucheAddGift() {
  const nav = useNavigation<UseNavigationProp>();

  const events = useUserStore(state => state.events);
  const currentEvent = useUserStore(state => state.currentEvent) as Event;
  const setCurrentEvent = useUserStore(state => state.setCurrentEvent);
  const addEvent = useUserStore(state => state.addEvent);
  const updateEvent = useUserStore(state => state.updateEvent);

  const gift = useUserStore(state =>
    state.gifts.find(gift => gift.eventId === currentEvent?.id),
  );

  const setCurrentGift = useUserStore(state => state.setCurrentGift);

  const handleDonePress = (isAdd?: boolean) => {
    const isEdit = events.some(event => event.id === currentEvent?.id);
    console.log('currentEvent', currentEvent);

    if (isEdit) {
      updateEvent(currentEvent.id, currentEvent);
    } else {
      addEvent(currentEvent);
    }
    setCurrentEvent(null);

    if (isAdd) {
      if (gift) {
        setCurrentGift(gift);
      } else {
        setCurrentGift(null);
      }
      nav.navigate(Screens.GIFTS_ADD, {eventId: currentEvent?.id});
    } else {
      nav.navigate(Screens.PARTOUCHE_OVERVIEW);
    }
  };

  return (
    <BackgroundWrapper>
      <Container>
        <TopTitle onBackPress={() => nav.goBack()} />

        <View
          style={{
            marginHorizontal: 'auto',
            alignItems: 'center',
            gap: 20,
            marginTop: 50,
          }}>
          <CustomText
            fs={32}
            fw="semibold"
            style={{maxWidth: 220}}
            align="center">
            Do you want to {gift ? 'edit' : 'add'} a gift?
          </CustomText>
          <Image
            source={require('@/assets/images/gift.png')}
            style={{width: 240, height: 225}}
          />
        </View>

        <View style={{width: '100%', gap: 10, marginTop: 'auto'}}>
          <Button
            title={gift ? 'Edit' : 'Add'}
            onPress={() => handleDonePress(true)}
          />
          <Button
            title="Skip"
            variant="secondary"
            onPress={() => handleDonePress()}
          />
        </View>
      </Container>
    </BackgroundWrapper>
  );
}

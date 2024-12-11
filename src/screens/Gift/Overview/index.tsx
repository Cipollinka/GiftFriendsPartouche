import React, {useEffect, useRef, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import {Image, ScrollView, View} from 'react-native';
import Button from '@/components/ui/Button';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import Item from './Item';
import {Gift} from '@/types/common';
import BottomNavigation from '@/components/BottomNavigation';
import {useUserStore} from '@/stores/userStore';
import BottomMenu from '@/components/OverviewBottomMenu';

export default function GiftOverview({route}: any) {
  const eventId = route.params?.eventId;
  const nav = useNavigation<UseNavigationProp>();

  const scrollViewRef = useRef<ScrollView>(null);

  const [currentPressedGift, setCurrentPressedGift] = useState<Gift | null>(
    null,
  );

  const gifts = useUserStore(state => state.gifts);
  const setCurrentGift = useUserStore(state => state.setCurrentGift);
  const removeGift = useUserStore(state => state.removeGift);

  const doneGifts = useUserStore(state => state.doneGifts);
  const addDoneGift = useUserStore(state => state.addDoneGift);

  const isEmpty = gifts.length === 0;

  useEffect(() => {
    if (!eventId) return;
    setTimeout(() => scrollToItem(), 100);
  }, [eventId]);

  const handleGiftPress = (gift: Gift) => {
    setCurrentPressedGift(gift);
  };

  const scrollToItem = () => {
    const index = gifts.findIndex(item => item.eventId === eventId);
    if (index === -1 || !scrollViewRef.current) return;

    const gap = 12;
    const itemHeight = 343;
    const scrollPosition = index * itemHeight + gap * index - 1;

    scrollViewRef.current.scrollTo({
      y: scrollPosition,
      animated: true,
    });
  };

  const handleEventPress = (gift: Gift | null) => {
    if (!gift) return;

    setCurrentGift(gift);
    setCurrentPressedGift(null);
    nav.navigate(Screens.GIFTS_ADD);
  };
  const handleEventDelete = (gift: Gift | null) => {
    if (!gift) return;

    setCurrentPressedGift(null);
    removeGift(gift.id);
  };

  const handleAddRecipient = (gift: Gift) => {
    nav.navigate(Screens.PROFILE_EDIT, {giftId: gift.id});
  };

  return (
    <BackgroundWrapper>
      <Container>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginBottom: 10,
          }}>
          <CustomText fs={25} fw="semibold">
            Partouche Gifts
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
              source={require('@/assets/images/gift.png')}
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
          <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
            <View style={{width: '100%', marginTop: 10}} />
            <View style={{gap: 10}}>
              {gifts.map(gift => (
                <Item
                  key={gift.id}
                  onPress={handleGiftPress}
                  gift={gift}
                  onAddRecipient={handleAddRecipient}
                />
              ))}
            </View>
          </ScrollView>
        )}

        <BottomMenu
          isOpen={!!currentPressedGift}
          isEventDone={
            currentPressedGift?.id
              ? doneGifts.includes(currentPressedGift.id)
              : false
          }
          onClose={() => setCurrentPressedGift(null)}
          onEdit={() => handleEventPress(currentPressedGift)}
          onDelete={() => handleEventDelete(currentPressedGift)}
          onDone={() => {
            setCurrentPressedGift(null);
            currentPressedGift && addDoneGift(currentPressedGift.id);
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
          title="Add gift"
          onPress={() => {
            setCurrentGift(null);
            nav.navigate({
              name: Screens.GIFTS_ADD,
              key: `Screens.GIFTS_ADD_${Date.now()}`,
            });
          }}
        />
        <BottomNavigation />
      </View>
    </BackgroundWrapper>
  );
}

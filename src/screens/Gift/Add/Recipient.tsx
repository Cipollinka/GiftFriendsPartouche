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
import {Gift} from '@/types/common';

export default function PartoucheAddGift() {
  const nav = useNavigation<UseNavigationProp>();

  const gifts = useUserStore(state => state.gifts);
  const currentGift = useUserStore(state => state.currentGift) as Gift;
  const setCurrentGift = useUserStore(state => state.setCurrentGift);

  const addGift = useUserStore(state => state.addGift);
  const updateGift = useUserStore(state => state.updateGift);

  const handleDonePress = (isAdd?: boolean) => {
    const isEdit = gifts.some(event => event.id === currentGift?.id);
    if (isEdit) {
      updateGift(currentGift.id, currentGift);
    } else {
      addGift(currentGift);
    }

    setCurrentGift(null);
    if (isAdd) {
      nav.navigate(Screens.PROFILE_EDIT, {giftId: currentGift?.id});
      return;
    }
    nav.navigate(Screens.GIFTS_OVERVIEW);
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
            Do you want to add a recipient?
          </CustomText>
          <Image
            source={require('@/assets/images/gift.png')}
            style={{width: 240, height: 225}}
          />
        </View>

        <View style={{width: '100%', gap: 10, marginTop: 'auto'}}>
          <Button title="Add" onPress={() => handleDonePress(true)} />
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

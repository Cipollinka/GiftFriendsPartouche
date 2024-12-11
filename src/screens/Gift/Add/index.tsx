import React, {useEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import TopTitle from '@/components/TopTitle';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {useUserStore} from '@/stores/userStore';
import {GiftCategory} from '@/types/common';
import {GIFT_CATEGORIES} from '@/constants/common';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import Row from '@/components/layout/Row';

export default function GiftAdd({route}: any) {
  const eventId = route?.params?.eventId;
  const nav = useNavigation<UseNavigationProp>();
  const [giftCategory, setGiftCategory] = useState<GiftCategory | null>(null);

  const currentGift = useUserStore(state => state.currentGift);
  const setCurrentGift = useUserStore(state => state.setCurrentGift);

  const isEdit = currentGift?.id !== undefined;
  const isNextDisabled = !giftCategory;

  useEffect(() => {
    if (!isEdit) return;

    currentGift?.category && setGiftCategory(currentGift.category);
  }, [isEdit, currentGift]);

  const handleNextPress = () => {
    if (!giftCategory) return;

    setCurrentGift({
      ...currentGift,
      eventId: eventId,
      category: giftCategory,
    });

    nav.navigate(Screens.GIFTS_ADD_INFO);
  };

  return (
    <BackgroundWrapper>
      <Container>
        <View style={{marginBottom: 10, width: '100%'}}>
          <TopTitle
            onBackPress={() => nav.goBack()}
            title="Add gift"
            actionText="Next"
            isActionDisabled={isNextDisabled}
            onActionPress={handleNextPress}
          />
        </View>

        <ScrollView
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 10, marginHorizontal: 'auto'}}>
            <Image
              source={require('@/assets/images/gift.png')}
              style={{width: 240, height: 225}}
            />
          </View>

          <CustomText mt={24} fw="medium" style={{opacity: 0.5}}>
            Gift Category
          </CustomText>

          <View
            style={{gap: 9, width: '100%', paddingTop: 10, marginBottom: 30}}>
            {GIFT_CATEGORIES.map(category => {
              const Icon = category.icon;
              const isSelected = category
                ? category.value === giftCategory
                : false;

              return (
                <TouchableOpacity
                  key={category.label}
                  onPress={() => setGiftCategory(category.value)}>
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
                    <CustomText>{category.label}</CustomText>
                  </Row>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </Container>
    </BackgroundWrapper>
  );
}

import React, {useLayoutEffect} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import BottomNavigation from '@/components/BottomNavigation';
import {Image, Linking, ScrollView, TouchableOpacity, View} from 'react-native';
import TopTitle from '@/components/TopTitle';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useUserStore} from '@/stores/userStore';
import CustomText from '@/components/ui/Text';
import CalendarIcon from '@/assets/icons/date.svg';
import Row from '@/components/layout/Row';

import MaleIcon from '@/assets/icons/male.svg';
import FemaleIcon from '@/assets/icons/female.svg';
import WebsiteIcon from '@/assets/icons/website.svg';
import PrivacyIcon from '@/assets/icons/privacy.svg';
import TosIcon from '@/assets/icons/tos.svg';
import {GENDER} from '@/types/common';

const options = [
  {
    label: 'Developer Website',
    onPress: () => Linking.openURL('https://google.com'),
    Icon: WebsiteIcon,
  },
  {
    label: 'Privacy Policy',
    onPress: () => Linking.openURL('https://google.com'),
    Icon: PrivacyIcon,
  },
  {
    label: 'Terms of Use',
    onPress: () => Linking.openURL('https://google.com'),
    Icon: TosIcon,
  },
];

export default function ProfileOverview() {
  const nav = useNavigation<UseNavigationProp>();

  const user = useUserStore(state => state.user);

  const isMale = user?.gender === GENDER.MALE;

  useLayoutEffect(() => {
    if (user?.name) return;

    nav.navigate(Screens.PROFILE_EDIT);
  }, [nav, user]);

  return (
    <BackgroundWrapper>
      <Container>
        <TopTitle
          onBackPress={() => nav.goBack()}
          title="Profile"
          onActionPress={() => nav.navigate(Screens.PROFILE_EDIT)}
          actionText="Edit"
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%'}}>
          <View
            style={{
              width: 163,
              height: 163,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 9999,
              backgroundColor: '#252525',
              marginHorizontal: 'auto',
              marginTop: 24,
            }}>
            {user?.image && <Image source={{uri: user.image}} />}
          </View>

          <View
            style={{
              gap: 8,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            <CustomText fw="bold" fs={20}>
              {user?.name} {user?.surname}
            </CustomText>
            <CustomText fw="medium">{user?.age} years old</CustomText>
          </View>

          <View style={{gap: 8, marginTop: 16}}>
            <CustomText color="#ffffff90" fw="medium">
              Date of birth
            </CustomText>
            <Row gap={5}>
              <CalendarIcon width={24} height={24} />
              <CustomText fw="medium">
                {user?.dateOfBirth.split('T')[0]}
              </CustomText>
            </Row>
          </View>

          <View style={{gap: 8, marginTop: 16}}>
            <CustomText color="#ffffff90" fw="medium">
              Preferences
            </CustomText>

            <CustomText fw="medium">{user?.preferences}</CustomText>
          </View>

          <View style={{gap: 8, marginTop: 16}}>
            <CustomText color="#ffffff90" fw="medium">
              Gender
            </CustomText>
            <Row gap={5}>
              {isMale ? (
                <MaleIcon color={'#DD091E'} />
              ) : (
                <FemaleIcon color={'#DD091E'} />
              )}
              <CustomText fw="medium">{isMale ? 'Male' : 'Female'}</CustomText>
            </Row>
          </View>

          <View style={{gap: 8, marginTop: 24}}>
            {options.map(option => {
              const Icon = option.Icon;
              return (
                <TouchableOpacity onPress={option.onPress}>
                  <Row
                    gap={5}
                    style={{
                      backgroundColor: '#252525',
                      borderRadius: 50,
                      paddingVertical: 16,
                      paddingHorizontal: 20,
                    }}>
                    <Icon width={24} height={24} />
                    <CustomText fw="medium">{option.label}</CustomText>
                  </Row>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </Container>

      <View
        style={{
          width: '100%',
          marginTop: 'auto',
          paddingHorizontal: 16,
          paddingBottom: 10,
        }}>
        <BottomNavigation />
      </View>
    </BackgroundWrapper>
  );
}

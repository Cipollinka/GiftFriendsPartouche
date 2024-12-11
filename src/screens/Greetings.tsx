import React, {useLayoutEffect} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import {Image, View} from 'react-native';
import Button from '@/components/ui/Button';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useUserStore} from '@/stores/userStore';

export default function Greetings() {
  const nav = useNavigation<UseNavigationProp>();

  const isAlreadyGreeted = useUserStore(state => state.isAlreadyGreeted);
  const setIsAlreadyGreeted = useUserStore(state => state.setIsAlreadyGreeted);

  useLayoutEffect(() => {
    onPress();
  }, [isAlreadyGreeted]);

  const onPress = () => {
    setIsAlreadyGreeted(true);
    nav.navigate(Screens.PARTOUCHE_OVERVIEW);
  };

  return (
    <BackgroundWrapper>
      <Container>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: 100,
          }}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={{width: '100%', height: 250}}
          />
          <CustomText fw="bold" fs={50} color="#DD091E" align="center" mt={10}>
            Gift Friends Partouche
          </CustomText>
        </View>
      </Container>
      <View style={{width: '100%', marginTop: 'auto', padding: 16}}>
        <Button isFullWidth title="Get started" onPress={onPress} />
      </View>
    </BackgroundWrapper>
  );
}

import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import {useUserStore} from '@/stores/userStore';
import QRCode from 'react-native-qrcode-svg';

export default function ProfileCode() {
  const user = useUserStore(state => state.user);
  const qrData = JSON.stringify({...user, image: ''});

  return (
    <BackgroundWrapper>
      <Container>
        <QRCode value={qrData} size={200} />
        <CustomText>ProfileCode</CustomText>
      </Container>
    </BackgroundWrapper>
  );
}

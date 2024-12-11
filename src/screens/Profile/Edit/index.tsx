import React, {useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import TopTitle from '@/components/TopTitle';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import Input from '@/components/ui/Input';
import {GENDER} from '@/types/common';
import Row from '@/components/layout/Row';
import CalendarIcon from '@/assets/icons/date.svg';

import MaleIcon from '@/assets/icons/male.svg';
import FemaleIcon from '@/assets/icons/female.svg';
import TextArea from '@/components/ui/TextArea';
import DatePicker from 'react-native-date-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {useUserStore} from '@/stores/userStore';
import Button from '@/components/ui/Button';
import CodeIcon from '@/assets/icons/code.svg';

export default function ProfileEdit({route}: any) {
  const giftId = route?.params?.giftId;
  const nav = useNavigation<UseNavigationProp>();

  const setUser = useUserStore(state => state.setUser);
  const addRecipient = useUserStore(state => state.addRecipient);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState<GENDER | null>(null);
  const [preferences, setPreferences] = useState('');
  const [image, setImage] = useState('');

  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const isDoneDisabled =
    !name || !surname || !age || gender === null || !preferences;

  const onDonePress = () => {
    if (gender === null) return;

    const recipient = {
      id: giftId ? giftId : 1,
      name,
      surname,
      dateOfBirth: dateOfBirth.toISOString(),
      gender,
      preferences,
      giftId,
      age: Number(age),
      image,
    };

    if (giftId) {
      addRecipient(recipient);
      nav.navigate(Screens.GIFTS_OVERVIEW);
      return;
    }

    setUser(recipient);
    nav.navigate(Screens.PROFILE_OVERVIEW);
  };

  const handleImageSelection = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const sourceUri = result.assets[0].uri;
        const fileName = result.assets[0].fileName || `image_${Date.now()}.jpg`;
        const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

        if (!sourceUri) return;

        await RNFS.copyFile(sourceUri, destPath);
        console.log(`Image saved locally at: ${destPath}`);

        setImage(destPath);
      }
    } catch (error) {
      console.error('Error selecting or saving image:', error);
    }
  };

  return (
    <BackgroundWrapper>
      <Container>
        <TopTitle
          onBackPress={() => nav.goBack()}
          title={giftId ? 'Add person' : 'Edit Profile'}
          actionText="Done"
          isActionDisabled={isDoneDisabled}
          onActionPress={onDonePress}
        />

        <ScrollView
          style={{width: '100%', marginTop: 24}}
          showsVerticalScrollIndicator={false}>
          <View style={{marginHorizontal: 'auto', marginVertical: 20}}>
            <TouchableOpacity onPress={handleImageSelection}>
              <View
                style={{
                  backgroundColor: '#252525',
                  width: 163,
                  height: 163,
                  borderRadius: 9999,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {image ? (
                  <Image
                    source={{uri: image}}
                    style={{width: 163, height: 163, borderRadius: 9999}}
                  />
                ) : (
                  <Image
                    source={require('@/assets/images/photo.png')}
                    style={{width: 90, height: 90}}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* {giftId && (
            <View style={{width: '100%', marginBottom: 16}}>
              <Button
                icon={<CodeIcon />}
                isFullWidth
                title="Scan QR-Code"
                onPress={() => nav.navigate(Screens.PROFILE_CODE)}
              />
            </View>
          )} */}

          <View style={{gap: 8}}>
            <Input placeholder="Name" value={name} onChangeText={setName} />
            <Input
              placeholder="Surname"
              value={surname}
              onChangeText={setSurname}
            />
            <Input placeholder="Age" value={age} onChangeText={setAge} />
            <View>
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
                      {dateOfBirth.toLocaleDateString().split('T')[0]}
                    </CustomText>
                  </View>
                </Row>
              </TouchableOpacity>
            </View>
            <TextArea
              placeholder="Preferences"
              value={preferences}
              onChangeText={setPreferences}
            />
          </View>

          <View style={{marginTop: 16}}>
            <CustomText color="#ffffff80" fw="medium">
              Gender
            </CustomText>

            <View style={{gap: 8, marginTop: 8}}>
              <TouchableOpacity onPress={() => setGender(GENDER.MALE)}>
                <Row
                  style={{
                    backgroundColor:
                      gender === GENDER.MALE ? '#DD091E' : '#252525',
                    borderRadius: 50,
                    width: '100%',
                    justifyContent: 'center',
                    paddingVertical: 16,
                  }}
                  gap={5}>
                  <MaleIcon color={'#fff'} />
                  <CustomText fw="medium">Male</CustomText>
                </Row>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setGender(GENDER.FEMALE)}>
                <Row
                  style={{
                    backgroundColor:
                      gender === GENDER.FEMALE ? '#DD091E' : '#252525',
                    borderRadius: 50,
                    width: '100%',
                    justifyContent: 'center',
                    paddingVertical: 16,
                  }}
                  gap={5}>
                  <FemaleIcon color={'#fff'} />
                  <CustomText fw="medium">Female</CustomText>
                </Row>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Container>

      <DatePicker
        modal
        open={isDateModalOpen}
        date={dateOfBirth}
        mode="date"
        onConfirm={selectedDate => {
          setIsDateModalOpen(false);
          setDateOfBirth(selectedDate);
        }}
        onCancel={() => setIsDateModalOpen(false)}
        minimumDate={new Date()}
      />
    </BackgroundWrapper>
  );
}

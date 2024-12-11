import React, {useEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import {Image, TouchableOpacity, View} from 'react-native';
import TopTitle from '@/components/TopTitle';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import {useUserStore} from '@/stores/userStore';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';

export default function GiftAddInfo() {
  const nav = useNavigation<UseNavigationProp>();

  const [image, setImage] = useState<string | null>(null);
  const [giftName, setGiftName] = useState('');
  const [giftDescription, setGiftDescription] = useState('');
  const [giftPrice, setGiftPrice] = useState('');

  const currentGift = useUserStore(state => state.currentGift);
  const setCurrentGift = useUserStore(state => state.setCurrentGift);

  const isEdit = currentGift?.id !== undefined;
  const isNextDisabled = !giftName || !giftDescription || !giftPrice;

  useEffect(() => {
    if (!isEdit) return;

    currentGift?.name && setGiftName(currentGift.name);
    currentGift?.description && setGiftDescription(currentGift.description);
    currentGift?.price && setGiftPrice(currentGift.price.toString());
    currentGift?.image && setImage(currentGift.image);
  }, [isEdit, currentGift]);

  const handleNextPress = () => {
    if (!giftName || !giftDescription) return;

    setCurrentGift({
      ...currentGift,
      name: giftName,
      description: giftDescription,
      price: Number(giftPrice),
      image: image ?? '',
    });

    nav.navigate(Screens.GIFTS_ADD_POPULARITY);
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
        <View style={{marginBottom: 10, width: '100%'}}>
          <TopTitle
            onBackPress={() => nav.goBack()}
            title="Add gift"
            actionText="Next"
            isActionDisabled={isNextDisabled}
            onActionPress={handleNextPress}
          />
        </View>

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

        <View style={{gap: 8, width: '100%', paddingTop: 10}}>
          <Input
            placeholder="Name"
            value={giftName}
            onChangeText={setGiftName}
          />
          <Input
            placeholder="Price"
            value={giftPrice}
            onChangeText={setGiftPrice}
          />
          <TextArea
            placeholder="Description"
            value={giftDescription}
            onChangeText={setGiftDescription}
          />
        </View>
      </Container>
    </BackgroundWrapper>
  );
}

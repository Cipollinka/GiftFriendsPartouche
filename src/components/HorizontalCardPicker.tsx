import React from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

const CARD_WIDTH = 300; // Card width
const CARD_GAP = 12; // Gap between cards
const SCREEN_WIDTH = Dimensions.get('window').width;

// Define the type for each card item
interface CardItem {
  id: string; // Adjust this to match your data's unique key
  [key: string]: any; // Allow additional fields in the data item
}

// Define the props for the HorizontalCardPicker
interface HorizontalCardPickerProps {
  data: CardItem[]; // Array of card data
  renderItem: ListRenderItem<CardItem>; // Render function for the card
}

const HorizontalCardPicker: React.FC<HorizontalCardPickerProps> = ({
  data,
  renderItem,
}) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={{width: CARD_GAP}} />}
      snapToAlignment="start"
      snapToInterval={CARD_WIDTH + CARD_GAP} // Snaps to card positions
      decelerationRate="fast"
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20, // Center first and last card
  },
});

export default HorizontalCardPicker;

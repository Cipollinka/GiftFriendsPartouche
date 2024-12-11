import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import FlightIcon from '@/assets/icons/calendar.svg';
import StatisticIcon from '@/assets/icons/statistic.svg';
import TopicsIcon from '@/assets/icons/gift.svg';
import ProfileIcon from '@/assets/icons/profile.svg';

import {Screens, UseNavigationProp} from '@/types/navigation';

interface Props {
  onPress: () => void;
  Icon: any;
  selected?: boolean;
}

function NavigationItem({onPress, Icon, selected}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.navigationItem}>
        <View style={styles.item}>
          {<Icon color={selected ? '#DD091E' : '#999999'} />}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function BottomNavigation() {
  const nav = useNavigation<UseNavigationProp>();
  const route = useRoute();

  const handleNavigate = (screen: Screens) => {
    nav.navigate({
      name: screen as any,
      key: `${screen}-${Date.now()}`,
    });
  };

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        zIndex: 40,
        backgroundColor: '#252525',
        borderRadius: 40,
      }}>
      <NavigationItem
        Icon={FlightIcon}
        onPress={() => handleNavigate(Screens.PARTOUCHE_OVERVIEW)}
        selected={route.name === Screens.PARTOUCHE_OVERVIEW}
      />

      <NavigationItem
        Icon={TopicsIcon}
        onPress={() => handleNavigate(Screens.GIFTS_OVERVIEW)}
        selected={route.name === Screens.GIFTS_OVERVIEW}
      />

      <NavigationItem
        Icon={StatisticIcon}
        onPress={() => handleNavigate(Screens.STATISTIC)}
        selected={route.name === Screens.STATISTIC}
      />

      <NavigationItem
        Icon={ProfileIcon}
        onPress={() => handleNavigate(Screens.PROFILE_OVERVIEW)}
        selected={route.name === Screens.PROFILE_OVERVIEW}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  navigationItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  curveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 60,
  },
});

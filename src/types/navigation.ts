import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Event} from './common';

export enum Screens {
  GREETINGS = 'greetings',

  PARTOUCHE_OVERVIEW = 'partouche_overview',
  PARTOUCHE_ADD = 'partouche_add',
  PARTOUCHE_ADD_DATE = 'partouche_add_date',
  PARTOUCHE_ADD_REMINDER = 'partouche_add_reminder',
  PARTOUCHE_ADD_GIFT = 'partouche_add_gift',

  STATISTIC = 'STATISTIC',

  GIFTS_OVERVIEW = 'gifts_overview',
  GIFTS_ADD = 'gifts_add',
  GIFTS_ADD_INFO = 'gifts_add_info',
  GIFTS_ADD_POPULARITY = 'gifts_add_popularity',
  GIFTS_ADD_RECIPIENT = 'gifts_add_recipient',

  RECIPIENT_SCAN_CODE = 'ss',

  STATISTIC_OVERVIEW = 'statistic_overview',

  PROFILE_OVERVIEW = 'profile_overview',
  PROFILE_EDIT = 'profile_edit',
  PROFILE_CODE = 'profile_code',
}

export type RootStackParamList = {
  [Screens.GREETINGS]: undefined;

  [Screens.PARTOUCHE_OVERVIEW]: undefined;
  [Screens.PARTOUCHE_ADD]: {event: Event} | undefined;
  [Screens.PARTOUCHE_ADD_DATE]: undefined;
  [Screens.PARTOUCHE_ADD_REMINDER]: undefined;
  [Screens.PARTOUCHE_ADD_GIFT]: undefined;

  [Screens.STATISTIC]: undefined;

  [Screens.GIFTS_OVERVIEW]: {eventId: number} | undefined;
  [Screens.GIFTS_ADD]: {eventId: number} | undefined;
  [Screens.GIFTS_ADD_INFO]: undefined;
  [Screens.GIFTS_ADD_POPULARITY]: undefined;
  [Screens.GIFTS_ADD_RECIPIENT]: undefined;

  [Screens.RECIPIENT_SCAN_CODE]: undefined;

  [Screens.STATISTIC]: undefined;

  [Screens.PROFILE_OVERVIEW]: undefined;
  [Screens.PROFILE_EDIT]: {giftId: number} | undefined;
  [Screens.PROFILE_CODE]: undefined;
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};

export type UseNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  type: EventType;
  priority: EventPriority;
  reminderDate: string;
  reminderTime: string;
}

export interface Gift {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: GiftCategory;
  popularity: GiftPopularity;
  eventId?: number;
}

export interface Recipient {
  id: number;
  image: string;
  name: string;
  surname: string;
  age: number;
  dateOfBirth: string;
  gender: GENDER;
  preferences: string;
  giftId?: number;
}

export enum EventType {
  BIRTHDAY = 'BIRTHDAY',
  HOLIDAY = 'HOLIDAY',
  ANNIVERSARY = 'ANNIVERSARY',
  WEDDING = 'WEDDING',
  MEETING = 'MEETING',
  CONCERT = 'CONCERT',
  CELEBRATION = 'CELEBRATION',
  IMPORTANT = 'IMPORTANT',
}

export enum EventPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum GiftCategory {
  CLOSING = 'CLOSING',
  ELECTRONICS = 'ELECTRONICS',
  BEAUTY = 'BEAUTY',
  SPORTS = 'SPORTS',
  COOKING = 'COOKING',
  BOOKS = 'BOOKS',
  TOYS = 'TOYS',
  HOME_DECOR = 'HOME_DECOR',
  TRAVEL = 'TRAVEL',
  ART = 'ART',
}

export enum GiftPopularity {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum StatisticTabs {
  GIFTS,
  EVENTS,
}

export enum GENDER {
  MALE,
  FEMALE,
}

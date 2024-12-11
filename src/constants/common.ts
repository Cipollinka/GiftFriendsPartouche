import BirthdayIcon from '@/assets/icons/eventType/birthday.svg';
import HolidayIcon from '@/assets/icons/eventType/holiday.svg';
import AnniversaryIcon from '@/assets/icons/eventType/anniversary.svg';
import WeddingIcon from '@/assets/icons/eventType/wedding.svg';
import MeetingIcon from '@/assets/icons/eventType/meeting.svg';
import ConcertIcon from '@/assets/icons/eventType/concert.svg';
import CelebrationIcon from '@/assets/icons/eventType/celebration.svg';
import ImportantIcon from '@/assets/icons/eventType/important.svg';

import ClosingIcon from '@/assets/icons/giftCategory/clothing.svg';
import ElectronicsIcon from '@/assets/icons/giftCategory/electronics.svg';
import BeautyIcon from '@/assets/icons/giftCategory/beauty.svg';
import SportsIcon from '@/assets/icons/giftCategory/sport.svg';
import CookingIcon from '@/assets/icons/giftCategory/cooking.svg';
import BooksIcon from '@/assets/icons/giftCategory/book.svg';
import ToysIcon from '@/assets/icons/giftCategory/toys.svg';
import HomeDecorIcon from '@/assets/icons/giftCategory/home.svg';
import TravelIcon from '@/assets/icons/giftCategory/travel.svg';
import ArtIcon from '@/assets/icons/giftCategory/art.svg';

import {
  EventPriority,
  EventType,
  GiftCategory,
  GiftPopularity,
} from '@/types/common';

export const EVENT_TYPES = [
  {
    type: EventType.BIRTHDAY,
    label: 'Birthday',
    icon: BirthdayIcon,
  },
  {
    type: EventType.HOLIDAY,
    label: 'Holiday',
    icon: HolidayIcon,
  },
  {
    type: EventType.ANNIVERSARY,
    label: 'Anniversary',
    icon: AnniversaryIcon,
  },
  {
    type: EventType.WEDDING,
    label: 'Wedding',
    icon: WeddingIcon,
  },
  {
    type: EventType.MEETING,
    label: 'Meeting',
    icon: MeetingIcon,
  },
  {
    type: EventType.CONCERT,
    label: 'Concert',
    icon: ConcertIcon,
  },
  {
    type: EventType.CELEBRATION,
    label: 'Celebration',
    icon: CelebrationIcon,
  },
  {
    type: EventType.IMPORTANT,
    label: 'Important',
    icon: ImportantIcon,
  },
];

export const EVENT_PRIORITIES = [
  {
    label: 'High',
    value: EventPriority.HIGH,
  },
  {
    label: 'Medium',
    value: EventPriority.MEDIUM,
  },
  {
    label: 'Low',
    value: EventPriority.LOW,
  },
];

export const GIFT_CATEGORIES = [
  {
    label: 'Clothing and Accessories',
    value: GiftCategory.CLOSING,
    icon: ClosingIcon,
  },
  {
    label: 'Electronics and Gadgets',
    value: GiftCategory.ELECTRONICS,
    icon: ElectronicsIcon,
  },
  {
    label: 'Beauty and Personal Care',
    value: GiftCategory.BEAUTY,
    icon: BeautyIcon,
  },
  {
    label: 'Sports and Fitness',
    value: GiftCategory.SPORTS,
    icon: SportsIcon,
  },
  {
    label: 'Cooking and Kitchenware',
    value: GiftCategory.COOKING,
    icon: CookingIcon,
  },
  {
    label: 'Books and Magazines',
    value: GiftCategory.BOOKS,
    icon: BooksIcon,
  },
  {
    label: 'Toys and Games',
    value: GiftCategory.TOYS,
    icon: ToysIcon,
  },
  {
    label: 'Home Decor',
    value: GiftCategory.HOME_DECOR,
    icon: HomeDecorIcon,
  },
  {
    label: 'Travel and Outdoor',
    value: GiftCategory.TRAVEL,
    icon: TravelIcon,
  },
  {
    label: 'Art and Crafts',
    value: GiftCategory.ART,
    icon: ArtIcon,
  },
];

export const GIFT_POPULARITIES = [
  {
    label: 'High',
    value: GiftPopularity.HIGH,
  },
  {
    label: 'Medium',
    value: GiftPopularity.MEDIUM,
  },
  {
    label: 'Low',
    value: GiftPopularity.LOW,
  },
];

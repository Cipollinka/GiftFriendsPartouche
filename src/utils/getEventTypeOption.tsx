import {EVENT_TYPES} from '@/constants/common';
import {EventType} from '@/types/common';

export const getEventTypeOptions = (type: EventType) => {
  return EVENT_TYPES.find(eventType => eventType.type === type);
};

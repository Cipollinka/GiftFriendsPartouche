import {Event, Gift, Recipient} from '@/types/common';
import {getPersistStoreOptions} from '@/utils/getPersistStoreOptions';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface State {
  isAlreadyGreeted: boolean;
  setIsAlreadyGreeted: (isAlreadyGreeted: boolean) => void;

  currentEvent: Partial<Event> | null;
  setCurrentEvent: (event: Partial<Event> | null) => void;

  currentGift: Partial<Gift> | null;
  setCurrentGift: (gift: Partial<Gift> | null) => void;

  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (id: number, event: Event) => void;
  removeEvent: (id: number) => void;
  setEvents: (events: Event[]) => void;

  gifts: Gift[];
  addGift: (gift: Gift) => void;
  updateGift: (id: number, gift: Gift) => void;
  removeGift: (id: number) => void;
  setGifts: (gift: Gift[]) => void;

  doneEvents: number[];
  addDoneEvent: (id: number) => void;

  doneGifts: number[];
  addDoneGift: (id: number) => void;

  user: Recipient | null;
  setUser: (user: Recipient | null) => void;

  recipients: Recipient[];
  addRecipient: (recipient: Recipient) => void;
}

export const useUserStore = create(
  persist<State>(
    (set, get) => ({
      isAlreadyGreeted: false,
      setIsAlreadyGreeted: isAlreadyGreeted =>
        set({isAlreadyGreeted: isAlreadyGreeted}),

      currentEvent: null,
      setCurrentEvent: event => set({currentEvent: event}),

      currentGift: {},
      setCurrentGift: gift => set({currentGift: gift}),

      events: [],
      addEvent: event => set({events: [...get().events, event]}),
      updateEvent: (id, event) =>
        set({
          events: get().events.map(e =>
            event.id === id ? {...e, ...event} : event,
          ),
        }),
      removeEvent: id =>
        set({events: get().events.filter(event => event.id !== id)}),
      setEvents: events => set({events: events}),

      gifts: [],
      addGift: gift => set({gifts: [...get().gifts, gift]}),
      updateGift: (id, gift) =>
        set({
          gifts: get().gifts.map(e =>
            gift.id === id ? {...e, ...gift} : gift,
          ),
        }),
      removeGift: id =>
        set({gifts: get().gifts.filter(gift => gift.id !== id)}),
      setGifts: a => set({gifts: a}),

      doneEvents: [],
      addDoneEvent: id => set({doneEvents: [...get().doneEvents, id]}),

      doneGifts: [],
      addDoneGift: id => set({doneGifts: [...get().doneGifts, id]}),

      user: null,
      setUser: user => set({user: user}),

      recipients: [],
      addRecipient: recipient => {
        const recipients = get().recipients;
        recipients.push(recipient);
        set({recipients});
      },
    }),

    getPersistStoreOptions('user'),
  ),
);

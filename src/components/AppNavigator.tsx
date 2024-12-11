import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, Screens} from '@/types/navigation';
import Greetings from '@/screens/Greetings';
import PartoucheOverview from '@/screens/Partouche/Overview';
import PartoucheAdd from '@/screens/Partouche/Add';
import PartoucheAddDate from '@/screens/Partouche/Add/Date';
import PartoucheAddReminder from '@/screens/Partouche/Add/Reminder';
import PartoucheAddGift from '@/screens/Partouche/Add/Gift';
import GiftOverview from '@/screens/Gift/Overview';
import GiftAdd from '@/screens/Gift/Add';
import GiftAddInfo from '@/screens/Gift/Add/Info';
import GiftAddPopularity from '@/screens/Gift/Add/Popularity';
import GiftAddRecipient from '@/screens/Gift/Add/Recipient';
import StatisticOverview from '@/screens/Statistic/Overview';
import ProfileOverview from '@/screens/Profile/Overview';
import ProfileEdit from '@/screens/Profile/Edit';
import ProfileCode from '@/screens/Profile/Code';
import RecipientScanCode from '@/screens/Profile/ScanCode';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.GREETINGS}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Screens.GREETINGS} component={Greetings} />

        <Stack.Screen
          name={Screens.PARTOUCHE_OVERVIEW}
          component={PartoucheOverview}
        />
        <Stack.Screen name={Screens.PARTOUCHE_ADD} component={PartoucheAdd} />
        <Stack.Screen
          name={Screens.PARTOUCHE_ADD_DATE}
          component={PartoucheAddDate}
        />
        <Stack.Screen
          name={Screens.PARTOUCHE_ADD_REMINDER}
          component={PartoucheAddReminder}
        />
        <Stack.Screen
          name={Screens.PARTOUCHE_ADD_GIFT}
          component={PartoucheAddGift}
        />

        <Stack.Screen name={Screens.GIFTS_OVERVIEW} component={GiftOverview} />
        <Stack.Screen name={Screens.GIFTS_ADD} component={GiftAdd} />
        <Stack.Screen name={Screens.GIFTS_ADD_INFO} component={GiftAddInfo} />
        <Stack.Screen
          name={Screens.GIFTS_ADD_POPULARITY}
          component={GiftAddPopularity}
        />
        <Stack.Screen
          name={Screens.GIFTS_ADD_RECIPIENT}
          component={GiftAddRecipient}
        />

        <Stack.Screen
          name={Screens.RECIPIENT_SCAN_CODE}
          component={RecipientScanCode}
        />

        <Stack.Screen name={Screens.STATISTIC} component={StatisticOverview} />

        <Stack.Screen
          name={Screens.PROFILE_OVERVIEW}
          component={ProfileOverview}
        />
        <Stack.Screen name={Screens.PROFILE_EDIT} component={ProfileEdit} />
        <Stack.Screen name={Screens.PROFILE_CODE} component={ProfileCode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

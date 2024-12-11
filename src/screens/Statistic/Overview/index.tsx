import React, {useCallback, useMemo, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import BottomNavigation from '@/components/BottomNavigation';
import {ScrollView, View} from 'react-native';
import TabSelector from '@/components/Tabs';
import {StatisticTabs} from '@/types/common';
import Row from '@/components/layout/Row';
import {useUserStore} from '@/stores/userStore';
import Info from './Info';
import HorizontalPicker from '@vseslav/react-native-horizontal-picker';
import GiftItem from '@/screens/Gift/Overview/Item';
import EventItem from '@/screens/Partouche/Overview/Item';
import HorizontalCardPicker from '@/components/HorizontalCardPicker';

const tabs = ['Gifts', 'Events'];

export default function StatisticOverview() {
  const [currentTab, setCurrentTab] = useState<StatisticTabs>(
    StatisticTabs.GIFTS,
  );

  const events = useUserStore(state => state.events);
  const gifts = useUserStore(state => state.gifts);

  const doneEvents = useUserStore(state => state.doneEvents);
  const doneGifts = useUserStore(state => state.doneGifts);

  const entityAccessor = currentTab === StatisticTabs.GIFTS ? gifts : events;
  const progressAccessor =
    currentTab === StatisticTabs.GIFTS ? doneGifts : doneEvents;

  const {doneEntities, inProgressEntities} = useMemo(
    () =>
      entityAccessor.reduce(
        (acc, entity) => {
          const isDone = progressAccessor.includes(entity.id);
          return {
            doneEntities: isDone
              ? [...acc.doneEntities, entity]
              : acc.doneEntities,
            inProgressEntities: isDone
              ? acc.inProgressEntities
              : [...acc.inProgressEntities, entity],
          };
        },
        {doneEntities: [] as any[], inProgressEntities: [] as any[]},
      ),
    [entityAccessor, progressAccessor],
  );

  const renderItem = useCallback(
    ({item}: any) => {
      if (!item) return null;

      if (currentTab === StatisticTabs.GIFTS) {
        return <GiftItem gift={item} />;
      } else {
        return <EventItem event={item} />;
      }
    },
    [currentTab],
  );

  return (
    <BackgroundWrapper>
      <Container>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginBottom: 24,
          }}>
          <CustomText fs={25} fw="semibold">
            Partouche Stats
          </CustomText>
        </View>

        <TabSelector
          tabs={tabs}
          currentTab={currentTab}
          onChangeTab={setCurrentTab}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%', marginTop: 10}}>
          <Info
            progress={progressAccessor.length}
            total={entityAccessor.length}
          />

          {doneEntities.length > 0 && (
            <View style={{marginTop: 24}}>
              <Row
                justify="space-between"
                style={{
                  width: '100%',
                  marginBottom: 10,
                  paddingHorizontal: 10,
                }}>
                <CustomText fw="bold" fs={20}>
                  Done
                </CustomText>
                <CustomText fs={20}>{doneEntities.length}</CustomText>
              </Row>

              <HorizontalCardPicker
                data={doneEntities}
                renderItem={renderItem}
              />
            </View>
          )}

          {inProgressEntities.length > 0 && (
            <View style={{marginTop: 24}}>
              <Row
                justify="space-between"
                style={{
                  width: '100%',
                  marginBottom: 10,
                  paddingHorizontal: 10,
                }}>
                <CustomText fw="bold" fs={20}>
                  In progress
                </CustomText>
                <CustomText fs={20}>{inProgressEntities.length}</CustomText>
              </Row>

              <HorizontalCardPicker
                data={inProgressEntities}
                renderItem={renderItem}
              />
            </View>
          )}
        </ScrollView>
      </Container>

      <View
        style={{
          width: '100%',
          marginTop: 'auto',
          paddingHorizontal: 16,
          paddingBottom: 10,
        }}>
        <BottomNavigation />
      </View>
    </BackgroundWrapper>
  );
}

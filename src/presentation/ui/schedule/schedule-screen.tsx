import React, { useCallback, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import ReactNativeCalendarStrip from 'react-native-calendar-strip'

import GetScheduledRoomUseCase from '~/interactor/room/get-scheduled-room-list-use-case'
import { getColor } from '~/presentation/colors'
import { Screens, TabScreen } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'
import { useTheme } from '~/presentation/theme'

import { ScheduleItem } from './components'
import { useScheduleViewModel } from './schedule-view-model'

type Props = {
  getScheduledRoomList: GetScheduledRoomUseCase
}

const minDate = new Date()
minDate.setMonth(minDate.getMonth() - 1)
const maxDate = new Date()
maxDate.setMonth(maxDate.getMonth() + 1)

const ScheduleScreen: TabScreen<Props, Screens.SCHEDULE> = ({
  getScheduledRoomList,
  user,
  navigation,
}) => {
  const {
    loadScheduledRoomList,
    handleDateSelect,
    markedDates,
    selectedDate,
    selectedRoomList,
  } = useScheduleViewModel({
    getScheduledRoomList,
    user: user!,
  })
  const { isLowVisionMode } = useTheme()

  const memoizedLoadScheduledRoomList = useCallback(
    () => loadScheduledRoomList(),
    [loadScheduledRoomList],
  )

  useEffect(() => {
    memoizedLoadScheduledRoomList()
  }, [memoizedLoadScheduledRoomList])

  return (
    <View style={styles(isLowVisionMode).container}>
      <ReactNativeCalendarStrip
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        daySelectionAnimation={{
          type: 'background',
          duration: 300,
          highlightColor: getColor('#9265DC', isLowVisionMode),
        }}
        style={styles(isLowVisionMode).calendarStrip}
        calendarHeaderStyle={styles(isLowVisionMode).calendarHeader}
        calendarColor={getColor('white', isLowVisionMode)}
        dateNumberStyle={styles(isLowVisionMode).dateNumber}
        dateNameStyle={styles(isLowVisionMode).dateName}
        highlightDateNameStyle={styles(isLowVisionMode).highlightDateName}
        highlightDateNumberStyle={styles(isLowVisionMode).highlightDateNumber}
        highlightDateContainerStyle={
          styles(isLowVisionMode).hightlightDateContainer
        }
        markedDates={markedDates}
        selectedDate={selectedDate}
        onDateSelected={handleDateSelect}
        minDate={minDate}
        maxDate={maxDate}
        useIsoWeekday={false}
        scrollable
      />

      <FlatList
        style={styles(isLowVisionMode).flatList}
        data={selectedRoomList}
        renderItem={({ item, index }) => {
          const navigateToRoom = () =>
            navigation.navigate(Screens.ROOM, {
              room: item.room,
              group: item.group,
            })

          return (
            <ScheduleItem
              room={item.room}
              group={item.group}
              index={index}
              navigateToRoom={navigateToRoom}
            />
          )
        }}
        ItemSeparatorComponent={() => (
          <View style={styles(isLowVisionMode).separator} />
        )}
        keyExtractor={(item) => `schedule-${item.room.uid}`}
      />
    </View>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    container: {
      height: '100%',
      paddingTop: getNotchSize() + 16,
    },
    calendarStrip: {
      height: 80,
    },
    calendarHeader: {
      color: getColor('#101010', isLowVisionMode),
    },
    dateNumber: {
      color: getColor('#101010', isLowVisionMode),
    },
    dateName: {
      color: getColor('#101010', isLowVisionMode),
    },
    highlightDateName: {
      color: getColor('white', isLowVisionMode),
    },
    highlightDateNumber: {
      color: getColor('white', isLowVisionMode),
    },
    hightlightDateContainer: {
      backgroundColor: getColor('#9bb1fe', isLowVisionMode),
    },
    flatList: {
      paddingTop: 20,
      paddingBottom: 16,
      paddingHorizontal: 20,
    },
    separator: {
      marginTop: 16,
    },
  })

export default ScheduleScreen

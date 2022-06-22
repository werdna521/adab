import React, { useCallback, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import ReactNativeCalendarStrip from 'react-native-calendar-strip'

import GetScheduledRoomUseCase from '~/interactor/room/get-scheduled-room-list-use-case'
import { Screens, TabScreen } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'

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

  const memoizedLoadScheduledRoomList = useCallback(
    () => loadScheduledRoomList(),
    [loadScheduledRoomList],
  )

  useEffect(() => {
    memoizedLoadScheduledRoomList()
  }, [memoizedLoadScheduledRoomList])

  return (
    <View style={styles.container}>
      <ReactNativeCalendarStrip
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        daySelectionAnimation={{
          type: 'background',
          duration: 300,
          highlightColor: '#9265DC',
        }}
        style={styles.calendarStrip}
        calendarHeaderStyle={styles.calendarHeader}
        calendarColor="white"
        dateNumberStyle={styles.dateNumber}
        dateNameStyle={styles.dateName}
        highlightDateNameStyle={styles.highlightDateName}
        highlightDateNumberStyle={styles.highlightDateNumber}
        highlightDateContainerStyle={styles.hightlightDateContainer}
        markedDates={markedDates}
        selectedDate={selectedDate}
        onDateSelected={handleDateSelect}
        minDate={minDate}
        maxDate={maxDate}
        useIsoWeekday={false}
        scrollable
      />

      <FlatList
        style={styles.flatList}
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
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item) => `schedule-${item.room.uid}`}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: getNotchSize() + 16,
  },
  calendarStrip: {
    height: 80,
  },
  calendarHeader: {
    color: '#101010',
  },
  dateNumber: {
    color: '#101010',
  },
  dateName: {
    color: '#101010',
  },
  highlightDateName: {
    color: 'white',
  },
  highlightDateNumber: {
    color: 'white',
  },
  hightlightDateContainer: {
    backgroundColor: '#9bb1fe',
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

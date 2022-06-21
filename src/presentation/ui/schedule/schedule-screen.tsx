import React from 'react'
import { StyleSheet, View } from 'react-native'
import ReactNativeCalendarStrip from 'react-native-calendar-strip'

import { Screens, TabScreen } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'

type Props = {}

const minDate = new Date()
minDate.setMonth(minDate.getMonth() - 3)
const maxDate = new Date()
maxDate.setMonth(maxDate.getMonth() + 3)

const ScheduleScreen: TabScreen<Props, Screens.SCHEDULE> = () => {
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
        iconContainer={{ flex: 0.1 }}
        highlightDateNameStyle={styles.highlightDateName}
        highlightDateNumberStyle={styles.highlightDateNumber}
        highlightDateContainerStyle={styles.hightlightDateContainer}
        markedDates={[]}
        selectedDate={undefined}
        minDate={minDate}
        maxDate={maxDate}
        onDateSelected={console.log}
        useIsoWeekday={false}
        scrollable
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
})

export default ScheduleScreen

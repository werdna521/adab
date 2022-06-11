import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { User } from '~/domain/model'
import CreateRoomUseCase from '~/interactor/room/create-room-use-case'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'

import { Button, InputGroup } from '../common/components'
import { useCreateRoomViewModel } from './create-room-view-model'

type Props = {
  user: User
  createRoomUseCase: CreateRoomUseCase
}

const CreateRoomScreen: Screen<Props, Screens.CREATE_ROOM> = ({
  route,
  navigation,
  createRoomUseCase,
}) => {
  const { group } = route.params
  const {
    globalError,
    isProcessing,
    handleCreateRoom,
    handleInputTextChange,
    handleTimePickerOpen,
    timestamp,
  } = useCreateRoomViewModel({ createRoomUseCase, groupID: group.uid })

  const navigateToRoom = () => navigation.pop()
  const handleClick = async () => {
    await handleCreateRoom()
    navigateToRoom()
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Create Room</Text>
      <Text style={styles.description}>
        A Room is where the magic happens. Create a Room to start a session.
        Note: Only owners and admins can talk and end a Room's session.
      </Text>
      <View style={styles.form}>
        <InputGroup
          style={styles.input}
          label="Room Title"
          onChangeText={handleInputTextChange('title')}
          error={globalError}
        />
        <View style={styles.input}>
          <Text style={styles.datePickerLabel}>Session Time</Text>
          <TouchableOpacity
            style={styles.datePicker}
            onPress={handleTimePickerOpen}
            activeOpacity={0.7}
          >
            <Text style={styles.datePickerText}>{timestamp}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ctaContainer}>
        <Button
          style={styles.cta}
          onPress={handleClick}
          disabled={isProcessing}
        >
          Continue
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  contentContainer: {
    paddingTop: getNotchSize() + 16,
    paddingHorizontal: 20,
    minHeight: '100%',
  },
  title: {
    fontSize: 24,
    color: '#1d2d48',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#a4a4a4',
    marginTop: 4,
  },
  form: {
    marginTop: 24,
  },
  input: {
    marginTop: 12,
  },
  ctaContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  cta: {
    marginTop: 144,
    marginBottom: 32,
  },
  datePicker: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginTop: 4,
  },
  datePickerText: {
    color: '#1d2d48',
  },
  datePickerLabel: {
    fontSize: 14,
    color: '#b7b6bd',
    fontWeight: '600',
  },
})

export default CreateRoomScreen

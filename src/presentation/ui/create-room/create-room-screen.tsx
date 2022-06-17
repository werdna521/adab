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
    color: '#101010',
    fontFamily: 'Satoshi-Bold',
  },
  description: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
    fontFamily: 'Satoshi-Medium',
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
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginTop: 2,
    borderWidth: 1,
    borderColor: '#dfdfdf',
  },
  datePickerText: {
    color: '#101010',
    fontFamily: 'Satoshi-Medium',
  },
  datePickerLabel: {
    fontSize: 14,
    color: '#101010',
    fontFamily: 'Satoshi-Medium',
  },
})

export default CreateRoomScreen

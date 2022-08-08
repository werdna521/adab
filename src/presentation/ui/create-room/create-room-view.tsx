import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'

import { User } from '~/domain/model'
import CreateRoomUseCase from '~/interactor/room/create-room-use-case'
import { getColor } from '~/presentation/colors'
import { Screen, Screens } from '~/presentation/navigation'
import { getNotchSize } from '~/presentation/notch'
import { useTheme } from '~/presentation/theme'

import { Button, InputGroup } from '../common/components'
import { useCreateRoomViewModel } from './create-room-view-model'

type Props = {
  user: User
  createRoomUseCase: CreateRoomUseCase
}

const CreateRoomView: Screen<Props, Screens.CREATE_ROOM> = ({
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
  const { isLowVisionMode } = useTheme()

  const navigateToRoom = () => navigation.pop()
  const handleClick = async () => {
    await handleCreateRoom()
    navigateToRoom()
    ToastAndroid.show('Room Created', ToastAndroid.SHORT)
  }

  return (
    <ScrollView
      style={styles(isLowVisionMode).container}
      contentContainerStyle={styles(isLowVisionMode).contentContainer}
    >
      <Text style={styles(isLowVisionMode).title}>Create Room</Text>
      <Text style={styles(isLowVisionMode).description}>
        A Room is where the magic happens. Create a Room to start a session.
        Note: Only owners and admins can talk and end a Room's session.
      </Text>
      <View style={styles(isLowVisionMode).form}>
        <InputGroup
          style={styles(isLowVisionMode).input}
          label="Room Title"
          onChangeText={handleInputTextChange('title')}
          error={globalError}
        />
        <View style={styles(isLowVisionMode).input}>
          <Text style={styles(isLowVisionMode).datePickerLabel}>
            Session Time
          </Text>
          <TouchableOpacity
            style={styles(isLowVisionMode).datePicker}
            onPress={handleTimePickerOpen}
            activeOpacity={0.7}
          >
            <Text style={styles(isLowVisionMode).datePickerText}>
              {timestamp}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles(isLowVisionMode).ctaContainer}>
        <Button
          style={styles(isLowVisionMode).cta}
          onPress={handleClick}
          disabled={isProcessing}
          primary
        >
          Continue
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
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
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Bold',
    },
    description: {
      fontSize: 14,
      color: getColor('#aaa', isLowVisionMode),
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
      borderColor: getColor('#dfdfdf', isLowVisionMode),
    },
    datePickerText: {
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Medium',
    },
    datePickerLabel: {
      fontSize: 14,
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Medium',
    },
  })

export default CreateRoomView

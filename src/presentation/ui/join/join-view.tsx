import { CommonActions } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import GetGroupDetailsUseCase from '~/interactor/group/get-group-details-use-case'
import JoinGroupUseCase from '~/interactor/group/join-group-use-case'
import { getColor } from '~/presentation/colors'
import { Screen, Screens } from '~/presentation/navigation'
import { useTheme } from '~/presentation/theme'

import { Button } from '../common/components'
import { useJoinViewModel } from './join-view-model'

type Props = {
  joinGroupUseCase: JoinGroupUseCase
  getGroupDetailsUseCase: GetGroupDetailsUseCase
}

const JoinView: Screen<Props, Screens.JOIN> = ({
  navigation,
  user,
  route,
  joinGroupUseCase,
  getGroupDetailsUseCase,
}) => {
  const { groupID } = route.params
  const { isLowVisionMode } = useTheme()

  const { handleJoinGroup, isProcessing, isAlreadyMember, group } =
    useJoinViewModel({
      user: user!,
      groupID,
      joinGroupUseCase,
      getGroupDetailsUseCase,
    })

  const navigateToGroup = useCallback(
    () =>
      navigation.dispatch(
        CommonActions.reset({
          routes: [
            {
              name: Screens.TAB,
            },
            {
              name: Screens.GROUP,
              params: {
                groupID,
              },
            },
          ],
          index: 1,
        }),
      ),
    [groupID, navigation],
  )
  const handleIgnore = () => navigation.pop()
  const handleJoin = async () => {
    await handleJoinGroup()
    navigateToGroup()
  }

  useEffect(() => {
    if (isAlreadyMember) navigateToGroup()
  }, [navigateToGroup, isAlreadyMember])

  if (!group) return null

  return (
    <View style={styles(isLowVisionMode).container}>
      <Text style={styles(isLowVisionMode).title}>
        You're invited to join the group "{group.name}"
      </Text>
      <View style={styles(isLowVisionMode).buttonContainer}>
        <Button
          minWidth={150}
          primary={false}
          onPress={handleIgnore}
          disabled={isProcessing}
        >
          Ignore
        </Button>
        <Button
          style={styles(isLowVisionMode).joinButton}
          minWidth={150}
          disabled={isProcessing}
          onPress={handleJoin}
          primary
        >
          Join
        </Button>
      </View>
    </View>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    container: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 16,
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Medium',
      maxWidth: 250,
    },
    buttonContainer: {
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 24,
    },
    joinButton: {
      marginLeft: 16,
    },
  })

export default JoinView

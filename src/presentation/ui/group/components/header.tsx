import Clipboard from '@react-native-clipboard/clipboard'
import React, { FC, memo } from 'react'
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Group } from '~/domain/model'
import { getColor } from '~/presentation/colors'
import { getNotchSize } from '~/presentation/notch'
import { useTheme } from '~/presentation/theme'

import { InputGroup, TextButton } from '../../common/components'

type Props = {
  group: Group
  query: string
  navigateToMember: () => void
  handleCopyInviteLink: () => Promise<string>
  handleQueryChange: (value: string) => void
}

const GroupHeader: FC<Props> = ({
  group,
  query,
  navigateToMember,
  handleCopyInviteLink,
  handleQueryChange,
}) => {
  const { isLowVisionMode } = useTheme()

  const handleCopy = async () => {
    const inviteLink = await handleCopyInviteLink()
    ToastAndroid.show(`Link copied to clipboard!`, ToastAndroid.SHORT)
    Clipboard.setString(inviteLink)
  }
  return (
    <View style={styles(isLowVisionMode).container}>
      <View style={styles(isLowVisionMode).topContainer}>
        <Text style={styles(isLowVisionMode).header}>{group.name}</Text>
        <TouchableOpacity
          style={styles(isLowVisionMode).copyButton}
          activeOpacity={0.7}
          onPress={handleCopy}
        >
          <Icon
            name="content-copy"
            size={20}
            color={getColor('#1d2d48', isLowVisionMode)}
          />
        </TouchableOpacity>
      </View>
      <TextButton
        style={styles(isLowVisionMode).seeMembers}
        onPress={navigateToMember}
      >
        See members{'  '}&gt;
      </TextButton>
      <InputGroup
        style={styles(isLowVisionMode).search}
        placeholder="Search..."
        onChangeText={handleQueryChange}
        value={query}
      />
    </View>
  )
}

const styles = (isLowVisionMode: boolean) =>
  StyleSheet.create({
    container: {
      paddingTop: getNotchSize() + 16,
      paddingHorizontal: 20,
    },
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    copyButton: {
      marginTop: 4,
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      fontSize: 24,
      color: getColor('#101010', isLowVisionMode),
      fontFamily: 'Satoshi-Bold',
      maxWidth: '80%',
    },
    seeMembers: {
      paddingLeft: 0,
    },
    search: {
      marginTop: 8,
      marginBottom: 24,
    },
  })

export default memo(GroupHeader)

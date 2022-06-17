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
import { getNotchSize } from '~/presentation/notch'

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
  const handleCopy = async () => {
    const inviteLink = await handleCopyInviteLink()
    ToastAndroid.show(`Link copied to clipboard!`, ToastAndroid.SHORT)
    Clipboard.setString(inviteLink)
  }
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.header}>{group.name}</Text>
        <TouchableOpacity
          style={styles.copyButton}
          activeOpacity={0.7}
          onPress={handleCopy}
        >
          <Icon name="content-copy" size={20} color="#1d2d48" />
        </TouchableOpacity>
      </View>
      <TextButton style={styles.seeMembers} onPress={navigateToMember}>
        See members{'  '}&gt;
      </TextButton>
      <InputGroup
        style={styles.search}
        placeholder="Search..."
        onChangeText={handleQueryChange}
        value={query}
      />
    </View>
  )
}

const styles = StyleSheet.create({
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
    color: '#101010',
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

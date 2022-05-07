import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const CreateGroupFAB: FC = () => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container}>
      <Icon name="add" size={40} color="white" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d2d2d',
    width: 64,
    height: 64,
    borderRadius: 200,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 24,
    right: 24,
    elevation: 10,
  },
})

export default CreateGroupFAB

import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="black" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
})

export default Loading
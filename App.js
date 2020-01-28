import React, { useState } from 'react'
import { StyleSheet, View, Button, TextInput, Text } from 'react-native'

import AppNavigator from './navigation/AppNavigator'

import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'

import { Ionicons } from '@expo/vector-icons'

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    )
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
        <AppNavigator />
      </View>
    )
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ])
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error)
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddeeff',
    flex: 1,
  },
  toDoNameInput: {
    marginTop: 40,
    marginLeft: 20,
    height: 30,
  },
  toDoDescriptionInput: {
    marginTop: 40,
    marginLeft: 20,
    marginBottom: 20,
    height: 30,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: 'red',
    color: 'red',
  },
  buttonContainer: {
    marginLeft: 80,
    marginRight: 80,
    marginTop: 10,
    marginBottom: 10,
  },
})

import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Button, TextInput, Text } from 'react-native'
import API, { graphqlOperation } from '@aws-amplify/api'
import { createTodo } from './src/graphql/mutations'
import { listTodos } from './src/graphql/queries'

import AppNavigator from './navigation/AppNavigator'

import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'

import { Ionicons } from '@expo/vector-icons'

import config from './aws-exports'
API.configure(config)

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  const [toDoName, setToDoName] = useState('')
  const [toDoDescription, setToDoDescription] = useState('')
  const [toDoList, setToDoList] = useState({})
  const [showToDos, setShowToDos] = useState(false)

  const createNewTodo = async () => {
    const todo = { name: toDoName, description: toDoDescription }
    await API.graphql(graphqlOperation(createTodo, { input: todo }))
    clearInputs()
    getToDoData()
  }

  const getToDoData = async () => {
    const toDoData = await API.graphql(graphqlOperation(listTodos))
    setToDoList(toDoData)
    setShowToDos(true)
  }

  const clearInputs = () => {
    setToDoName('')
    setToDoDescription('')
  }

  useEffect(() => {
    getToDoData()
  }, [])

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

  // return (
  //   <View style={styles.container}>
  //     <TextInput
  //       style={styles.toDoNameInput}
  //       placeholder='To do name'
  //       value={toDoName}
  //       onChangeText={text => setToDoName(text)}
  //     />
  //     <TextInput
  //       style={styles.toDoDescriptionInput}
  //       placeholder='To do description'
  //       value={toDoDescription}
  //       onChangeText={text => setToDoDescription(text)}
  //     />
  //     <View style={styles.buttonContainer}>
  //       <Button
  //         style={styles.button}
  //         onPress={createNewTodo}
  //         title='Create Todo'
  //       />
  //     </View>
  //     <View style={styles.buttonContainer}>
  //       <Button
  //         style={styles.button}
  //         onPress={() => clearInputs()}
  //         title='Reset'
  //       />
  //     </View>
  //     <View style={styles.buttonContainer}>
  //       <Button
  //         style={styles.button}
  //         onPress={() => getToDoData()}
  //         title='Show ToDos'
  //       />
  //     </View>
  //     {showToDos ? (
  //       <View>
  //         {toDoList.data.listTodos.items.map((todo, i) => (
  //           <Text key={todo.id}>
  //             {todo.name} : {todo.description}
  //           </Text>
  //         ))}
  //       </View>
  //     ) : null}
  //   </View>
  // )
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

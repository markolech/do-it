import React, { useEffect, useReducer, useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub'
import { createTodo } from './src/graphql/mutations'

import config from './aws-exports'
API.configure(config) // Configure Amplify
PubSub.configure(config)

export default function App() {
  const [toDoItems, setToDoItems] = useState([])
  const [toDoName, setToDoName] = useState('')
  const [toDoDescription, setToDoDescription] = useState('')

  const createNewTodo = async () => {
    console.log(`Adding todo: ${toDoName}`)
    const todo = { name: toDoName, description: toDoDescription }
    await API.graphql(graphqlOperation(createTodo, { input: todo }))
    clearState()
  }

  const clearState = () => {
    setToDoName('')
    setToDoDescription('')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.toDoNameTextInput}
        placeholder='To do name'
        value={toDoName}
        onChangeText={text => setToDoName(text)}
      />
      <TextInput
        style={styles.toDoDescriptionTextInput}
        placeholder='To do description'
        value={toDoDescription}
        onChangeText={text => setToDoDescription(text)}
      />
      <Button
        style={styles.button}
        onPress={createNewTodo}
        title='Create Todo'
      />

      <Button
        style={styles.button}
        onPress={() => clearState()}
        title='Reset'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddeeff',
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
  },
  toDoNameTextInput: {
    marginTop: 40,
    marginLeft: 20,
    height: 40,
  },
  toDoDescriptionTextInput: {
    margin: 20,
    height: 40,
    width: 200,
  },
  button: {
    margin: 10,
    padding: 10,
  },
})

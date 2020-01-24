import React, { useState } from 'react'
import { StyleSheet, View, Button, TextInput } from 'react-native'
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub'
import { createTodo } from './src/graphql/mutations'

import config from './aws-exports'
API.configure(config)
PubSub.configure(config)

export default function App() {
  const [toDoName, setToDoName] = useState('')
  const [toDoDescription, setToDoDescription] = useState('')

  const createNewTodo = async () => {
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
        style={styles.toDoNameInput}
        placeholder='To do name'
        value={toDoName}
        onChangeText={text => setToDoName(text)}
      />
      <TextInput
        style={styles.toDoDescriptionInput}
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
})

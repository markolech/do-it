import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Button, TextInput, Text } from 'react-native'
import API, { graphqlOperation } from '@aws-amplify/api'
import { createTodo } from './src/graphql/mutations'
import { listTodos } from './src/graphql/queries'

import config from './aws-exports'
API.configure(config)

export default function App() {
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
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          onPress={createNewTodo}
          title='Create Todo'
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          onPress={() => clearInputs()}
          title='Reset'
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          onPress={() => getToDoData()}
          title='Show ToDos'
        />
      </View>
      {showToDos ? (
        <View>
          {toDoList.data.listTodos.items.map((todo, i) => (
            <Text key={todo.id}>
              {todo.name} : {todo.description}
            </Text>
          ))}
        </View>
      ) : null}
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
  buttonContainer: {
    marginLeft: 80,
    marginRight: 80,
    marginTop: 10,
    marginBottom: 10,
  },
})

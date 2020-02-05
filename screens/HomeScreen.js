import * as WebBrowser from 'expo-web-browser'
import React, { useEffect, useState } from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native'

import { Button, Text, Container, Header, Content, Input } from 'native-base'

import { createTodo } from '../src/graphql/mutations'
import { listTodos } from '../src/graphql/queries'

import API, { graphqlOperation } from '@aws-amplify/api'

import config from '../aws-exports'
API.configure(config)

import { MonoText } from '../components/StyledText'

import * as Font from 'expo-font'

export default function HomeScreen() {
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
    <Container>
      {/* <Header /> */}
      <Content>
        <Input
          placeholder='To do name'
          value={toDoName}
          onChangeText={text => setToDoName(text)}
        />
        <Input
          style={styles.toDoDescriptionInput}
          placeholder='To do description'
          value={toDoDescription}
          onChangeText={text => setToDoDescription(text)}
        />

        <Button bordered onPress={createNewTodo}>
          <Text>Create Todo</Text>
        </Button>

        <Button rounded onPress={() => getToDoData()}>
          <Text>Show ToDos</Text>
        </Button>

        <Button full onPress={() => clearInputs()}>
          <Text>Clear</Text>
        </Button>

        {showToDos ? (
          <View>
            {toDoList.data.listTodos.items.map((todo, i) => (
              <Text key={todo.id}>
                {todo.name} : {todo.description}
              </Text>
            ))}
          </View>
        ) : null}
      </Content>
    </Container>
  )
}

// HomeScreen.navigationOptions = {
//   header: null,
// }

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    )

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    )
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    )
  }
}

HomeScreen.navigationOptions = {
  title: 'Home',
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  )
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  )
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  // },
  toDoNameInput: {
    // marginTop: 40,
    // marginLeft: 20,
    // height: 30,
  },
  toDoDescriptionInput: {
    // marginTop: 40,
    // marginLeft: 20,
    // marginBottom: 20,
    // height: 30,
  },
  button: {
    // margin: 10,
    // padding: 10,
    // backgroundColor: 'red',
    // color: 'red',
  },
  buttonContainer: {
    // marginLeft: 80,
    // marginRight: 80,
    // marginTop: 10,
    // marginBottom: 10,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    // paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
})

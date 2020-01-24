// import React, { useEffect, useReducer } from 'react'
// import { StyleSheet, Text, View, Button } from 'react-native'

// import API, { graphqlOperation } from '@aws-amplify/api'
// import PubSub from '@aws-amplify/pubsub'
// import { createTodo } from './src/graphql/mutations'
// import { listTodos } from './src/graphql/queries'
// import { onCreateTodo } from './src/graphql/subscriptions'

// import config from './aws-exports'
// API.configure(config) // Configure Amplify
// PubSub.configure(config)

// async function createNewTodo() {
//   const todo = {
//     name: 'Use AppSync',
//     description: 'Realtime and Offline',
//   }
//   await API.graphql(graphqlOperation(createTodo, { input: todo }))
// }

// const initialState = { todos: [] }
// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'QUERY':
//       return { ...state, todos: action.todos }
//     case 'SUBSCRIPTION':
//       return { ...state, todos: [...state.todos, action.todo] }
//     default:
//       return state
//   }
// }

// export default function App() {
//   const [state, dispatch] = useReducer(reducer, initialState)

//   async function getData() {
//     const todoData = await API.graphql(graphqlOperation(listTodos))
//     dispatch({ type: 'QUERY', todos: todoData.data.listTodos.items })
//     console.log(todoData)
//   }

//   useEffect(() => {
//     console.log('about to get the data')

//     // getData()

//     const subscription = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
//       next: eventData => {
//         const todo = eventData.value.data.onCreateTodo
//         dispatch({ type: 'SUBSCRIPTION', todo })
//       },
//     })
//     return () => subscription.unsubscribe()
//   }, [])

//   return (
//     <View style={styles.container}>
//       <Button onPress={createNewTodo} title='Create Todo' />
//       {/* {state.todos.map((todo, i) => (
//         <Text key={todo.id}>
//           {todo.name} : {todo.description}
//         </Text>
//       ))} */}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// })

// // // GraphQL endpoint: https://s722arrqqfbxjof4iubkor5uje.appsync-api.ap-northeast-2.amazonaws.com/graphql
// // // GraphQL API KEY: da2-olt2t4z2mvg6jjh6riotyz23ii

// // import React, { useState } from 'react'
// // import { StyleSheet, TextInput, Text, View, Button } from 'react-native'

// // // import './App.css'

// // import API, { graphqlOperation } from '@aws-amplify/api'
// // import { createTodo } from './src/graphql/queries'
// // import { listTodos } from './src/graphql/queries'
// // import config from './aws-exports'

// // API.configure(config) // Configure Amplify

// // function App() {
// //   const [todoName, setTodoName] = useState('')
// //   const [todoItems, setTodoItems] = useState([])

// //   const addTodo = async () => {
// //     await API.graphql(
// //       graphqlOperation(createTodo, { input: { name: todoName } })
// //     )
// //     setTodoName('')
// //     updateTodos()
// //   }

// //   const handleChange = event => {
// //     setTodoName(event.target.value)
// //   }

// //   const updateTodos = async () => {
// //     const allTodos = await API.graphql(graphqlOperation(listTodos))
// //     setTodoItems(allTodos.data.listTodos.items)
// //   }

// //   updateTodos()

// //   return (
// //     <View style={styles.container}>
// //       <TextInput
// //         style={{ height: 40 }}
// //         placeholder='Type your todo'
// //         value={todoName}
// //         onChange={handleChange}
// //       />
// //       <Button onPress={addTodo} title='Create Todo' />

// //       {todoItems.map(item => {
// //         return <Text key={item.id}>{item.name}</Text>
// //       })}
// //     </View>
// //   )
// // }

// // export default App

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // })

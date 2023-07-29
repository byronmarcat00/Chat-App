import React, { useState, useEffect } from 'react'; // Corrected import statement
import { Button, ScrollView, View as DefaultView} from 'react-native';
import { View } from './themed/Themed';
import { API, graphqlOperation } from 'aws-amplify'; // Added API import
import { listTodos } from '../graphql/queries';
import MyText from './MyText';
import AddTodo from './AddTodo';
import { deleteTodo, updateTodo } from '../graphql/mutations';
export default function ListTodos() {
  const [todos, setTodos] = useState([]); // Corrected useState

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.graphql(graphqlOperation(listTodos));
        setTodos(data.listTodos.items);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    })();
  }, []);

  const handleUpdateTodo = async (id,name) => {
    await API.graphql(graphqlOperation(updateTodo,{
        input:{id,name},

    }));
    setTodos((prevTodos) => prevTodos.map(todo => todo.id === id ?{...todo,name}: todo));
    console.log("Todo Updated!")
}

  const handleDeleteTodo = async (id) => {
 await API.graphql(graphqlOperation(deleteTodo,{
    input:{id},
 }));
 setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
 console.log("Todo Deleted")
  }

  return (
    <View style={{flex:1}}>
      <AddTodo setTodos={setTodos}/>
      <ScrollView contentContainerStyle={{paddingHorizontal:15}}>
        <MyText type="title">Todos</MyText>
        {todos.map((todo) => ( 
          <DefaultView key={todo.id} style={{flexDirection:'row', justifyContent:"space-between", alignItems:"center"}}>
            <MyText>{todo.name}</MyText>
            <DefaultView style={{flexDirection:'row'}}>
            <Button title ="update"/>

            <Button title="delete" color ={"red"} onPress={() => handleDeleteTodo(todo.id)}/>
            </DefaultView>
           
          </DefaultView>
        ))}
      </ScrollView>
    </View>
  );
}

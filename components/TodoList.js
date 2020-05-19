import React, { useCallback, useMemo, useState } from 'react';
import { Button, FlatList, StyleSheet, TextInput, View } from 'react-native';
import { v4 as uuid } from 'uuid';

import { mockTodo } from '../constants/mock';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todoList, setTodoList] = useState([mockTodo]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const addTodo = useCallback(() => {
    setTodoList(todoList.concat({
      id: uuid(),
      title: newTodoTitle,
    }));
  }, [newTodoTitle, setTodoList, todoList]);

  const handleInputChange = useCallback(text => {
    setNewTodoTitle(text);
  }, [setTodoList, todoList]);

  const removeTodo = useCallback(removedId => {
    setTodoList(todoList.filter(todo => todo.id !== removedId));
  }, [setTodoList, todoList]);

  const list = useMemo(() => (
    <FlatList
      data={todoList}
      keyExtractor={item => item.title}
      renderItem={({ item }) => <TodoItem removeTodo={removeTodo} todo={item} />}
    />
  ), [todoList]);

  return (
    <View style={styles.container}>
      <View style={styles.addTodoContainer}>
        <TextInput onChangeText={handleInputChange} style={styles.addTodoInput} />
        <Button onPress={addTodo} style={styles.addTodoButton} title='Add' />
      </View>
      {list}
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  addTodoButton: {
    height: 30,
  },
  addTodoContainer: {
    flexDirection: 'row',
  },
  addTodoInput: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 35,
    paddingHorizontal: 8,
    width: 200,
  },
});

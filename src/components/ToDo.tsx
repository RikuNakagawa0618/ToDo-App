import React, { useState, useEffect } from 'react';
import { Box, List, Flex, useToast } from '@chakra-ui/react';
import AddTodoForm from './AddTodoForm';
import Filter from './Filter';
import Sort from './Sort';
import TodoItem from './TodoItem';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  deadline: Date;
}

const ToDo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editInput, setEditInput] = useState('');
  const [editDeadline, setEditDeadline] = useState<Date | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sort, setSort] = useState<'deadline' | 'creation'>('deadline');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        deadline: new Date(todo.deadline),
      }));
      setTodos(parsedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, deadline: Date) => {
    setTodos([...todos, { id: Date.now(), text, completed: false, deadline }]);
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (id: number, text: string, deadline: Date) => {
    setEditId(id);
    setEditInput(text);
    setEditDeadline(deadline);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditInput('');
    setEditDeadline(null);
  };

  const saveEdit = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editInput, deadline: editDeadline || todo.deadline } : todo));
    setEditId(null);
    setEditInput('');
    setEditDeadline(null);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sort === 'deadline') {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    } else {
      return a.id - b.id;
    }
  });

  return (
    <Box w="60%" maxW="750px" mx="auto">
      <AddTodoForm addTodo={addTodo} />
      <Flex mb={4} justifyContent="space-between">
        <Filter filter={filter} setFilter={setFilter} />
        <Sort sort={sort} setSort={setSort} />
      </Flex>
      <List spacing={3}>
        {sortedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editId={editId}
            editInput={editInput}
            editDeadline={editDeadline}
            setEditInput={setEditInput}
            setEditDeadline={setEditDeadline}
            startEdit={startEdit}
            cancelEdit={cancelEdit}
            saveEdit={saveEdit}
            removeTodo={removeTodo}
            toggleComplete={toggleComplete}
          />
        ))}
      </List>
    </Box>
  );
};

export default ToDo;

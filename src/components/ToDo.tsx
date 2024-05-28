import React, { useState } from 'react';
import { Box, Button, Input, List, ListItem, Checkbox, Flex, useToast } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomDateInput from './CustomDateInput';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  deadline: Date;
}

const ToDo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editInput, setEditInput] = useState('');
  const [editDeadline, setEditDeadline] = useState<Date | null>(null);
  const toast = useToast();

  const addTodo = () => {
    if (input.trim() === '') {
      toast({
        title: "タスクを入力してください",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!deadline) {
      toast({
        title: "期限を設定してください",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setTodos([...todos, { id: Date.now(), text: input, completed: false, deadline }]);
    setInput('');
    setDeadline(null);
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

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedTodos = Array.from(todos);
    const [removed] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, removed);

    setTodos(reorderedTodos);
  };

  return (
    <Box w="60%" maxW="750px" mx="auto">
      <Flex mb={4}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
          mr={2}
          w="55%"
        />
        <DatePicker
          selected={deadline}
          onChange={(date: Date) => setDeadline(date)}
          customInput={<CustomDateInput />}
          dateFormat="yyyy/MM/dd"
        />
        <Button onClick={addTodo} colorScheme="teal" ml={2} w="18%">Add</Button>
      </Flex>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided: any) => (
            <List {...provided.droppableProps} ref={provided.innerRef} spacing={3}>
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                  {(provided: any) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      display="flex"
                      alignItems="center"
                    >
                      <Checkbox
                        isChecked={todo.completed}
                        onChange={() => toggleComplete(todo.id)}
                        mr={2}
                      />
                      {editId === todo.id ? (
                        <Flex flex="1" alignItems="center">
                          <Input
                            value={editInput}
                            onChange={(e) => setEditInput(e.target.value)}
                            mr={2}
                            w="50%"
                          />
                          <DatePicker
                            selected={editDeadline}
                            onChange={(date: Date) => setEditDeadline(date)}
                            dateFormat="yyyy/MM/dd"
                            customInput={<CustomDateInput />}
                          />
                          <Button onClick={() => saveEdit(todo.id)} colorScheme="teal" size="sm" ml={2}>Save</Button>
                          <Button onClick={cancelEdit} ml={2} colorScheme="gray" size="sm">Cancel</Button>
                        </Flex>
                      ) : (
                        <>
                          <Box
                            flex="1"
                            textDecoration={todo.completed ? 'line-through' : undefined}
                            color={new Date(todo.deadline) < new Date() ? 'red.500' : undefined}
                          >
                            {todo.text} ( 期限 : {todo.deadline.toLocaleDateString()} )
                          </Box>
                          <Button onClick={() => startEdit(todo.id, todo.text, todo.deadline)} colorScheme="yellow" size="sm" mr={2}>Edit</Button>
                          <Button onClick={() => removeTodo(todo.id)} colorScheme="red" size="sm">Remove</Button>
                        </>
                      )}
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default ToDo;

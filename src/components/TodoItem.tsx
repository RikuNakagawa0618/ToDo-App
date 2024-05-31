import React from 'react';
import { ListItem, Checkbox, Box, Flex, Input, Button } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomDateInput from './CustomDateInput';

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
    deadline: Date;
  };
  editId: number | null;
  editInput: string;
  editDeadline: Date | null;
  setEditInput: (value: string) => void;
  setEditDeadline: (date: Date | null) => void;
  startEdit: (id: number, text: string, deadline: Date) => void;
  cancelEdit: () => void;
  saveEdit: (id: number) => void;
  removeTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  editId,
  editInput,
  editDeadline,
  setEditInput,
  setEditDeadline,
  startEdit,
  cancelEdit,
  saveEdit,
  removeTodo,
  toggleComplete
}) => {
  return (
    <ListItem key={todo.id} display="flex" alignItems="center">
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
          <Button onClick={() => saveEdit(todo.id)} colorScheme="teal" size="sm" ml={2}>保存</Button>
          <Button onClick={cancelEdit} ml={2} colorScheme="gray" size="sm">キャンセル</Button>
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
          <Button onClick={() => startEdit(todo.id, todo.text, todo.deadline)} colorScheme="yellow" size="sm" mr={2}>編集</Button>
          <Button onClick={() => removeTodo(todo.id)} colorScheme="red" size="sm">削除</Button>
        </>
      )}
    </ListItem>
  );
};

export default TodoItem;

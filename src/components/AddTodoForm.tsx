import React, { useState } from 'react';
import { Flex, Input, Button, useToast } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomDateInput from './CustomDateInput';

interface AddTodoFormProps {
  addTodo: (text: string, deadline: Date) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
  const [input, setInput] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);
  const toast = useToast();

  const handleSubmit = () => {
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

    addTodo(input, deadline);
    setInput('');
    setDeadline(null);
  };

  return (
    <Flex mb={4}>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="タスクを追加する"
        mr={2}
        w="55%"
      />
      <DatePicker
        selected={deadline}
        onChange={(date: Date) => setDeadline(date)}
        customInput={<CustomDateInput />}
        dateFormat="yyyy/MM/dd"
      />
      <Button onClick={handleSubmit} colorScheme="teal" ml={2} w="18%">追加</Button>
    </Flex>
  );
};

export default AddTodoForm;

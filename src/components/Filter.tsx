import React from 'react';
import { ButtonGroup, Button } from '@chakra-ui/react';

interface FilterProps {
    filter: 'all' | 'active' | 'completed';
    setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
    return (
    <ButtonGroup>
        <Button onClick={() => setFilter('all')} colorScheme={filter === 'all' ? 'teal' : 'gray'}>全て</Button>
        <Button onClick={() => setFilter('active')} colorScheme={filter === 'active' ? 'teal' : 'gray'}>未完了</Button>
        <Button onClick={() => setFilter('completed')} colorScheme={filter === 'completed' ? 'teal' : 'gray'}>完了</Button>
    </ButtonGroup>
    );
};

export default Filter;

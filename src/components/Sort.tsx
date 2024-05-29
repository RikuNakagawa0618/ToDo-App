import React from 'react';
import { Select } from '@chakra-ui/react';

interface SortProps {
    sort: 'deadline' | 'creation';
    setSort: (sort: 'deadline' | 'creation') => void;
}

const Sort: React.FC<SortProps> = ({ sort, setSort }) => {
    return (
    <Select value={sort} onChange={(e) => setSort(e.target.value as 'deadline' | 'creation')} ml={4}>
        <option value="deadline">期限で並び替え</option>
        <option value="creation">作成日で並び替え</option>
    </Select>
    );
};

export default Sort;

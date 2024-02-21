import React from 'react';
import { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { Input, Button } from '@chakra-ui/react';

const Dashboard = () => {
  const [items, setItems] = useState([
    { id: 1, partNo: '9PR5', name: 'Ardox Solvent Cleaner', description: 'Aluminium Oxide', unit: 'Pcs', remark: 'Barang Modal' },
    { id: 2, partNo: '247F63T2', name: 'B737-200 Goodyear', description: 'Thailand', unit: 'Pcs', remark: 'Barang Jadi' },
    { id: 3, partNo: '404F42T2', name: 'Ardox 5503', description: 'Aluminium Oxide', unit: 'Pcs', remark: 'Bahan Baku' },
  ]);

  const [search, setSearch] = useState('');

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  const addItem = () => {
    const newItem = { id: items.length + 1, partNo: '', name: '', description: '', unit: '', remark: '' };
    setItems([...items, newItem]);
  };

  const handleChange = (e, index, key) => {
    const newItems = [...items];
    newItems[index][key] = e.target.value;
    setItems(newItems);
  };
  return (
    <div className=" ml-80 ">
    <div className="mt-12 flex pb-4 border-b mr-12 border-b-gray-400">
      <h1 className='text-3xl '>PT Logistik</h1>
    </div>
    <div className="pb-4 border-b mr-12 border-b-gray-400">
    <div className="ml-4 mt-4">
      <h1 className='text-xl '>No Skep : 2511/KM.4/2015</h1>
      <h1 className='text-xl '>N.P.W.P : 02.744.450.4-413.000</h1>
   
    <div className="">
      <h1 className='text-lg '>Alamat : </h1>
      <h1 className='text-base ml-2 mt-1'>Kawasan Industri Bukit Indah</h1>
      <h1 className='text-base ml-2 '>Kawasan Industri Bukit Indah</h1>
      <h1 className='text-base ml-2 '>Kawasan Industri Bukit Indah</h1>
    </div>
    </div>
    </div>
  </div>
  )
}

export default Dashboard
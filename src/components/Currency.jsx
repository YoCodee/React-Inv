import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Added faTrash icon
import DataTable from 'react-data-table-component';
import axios from 'axios';

const Currency = () => {
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#eff2fa',
        color: '#6a92bc',
      },
    },
    headCells: {
      style: {
        fontSize: '16px',
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.id % 2 === 0,
      style: {
        backgroundColor: '#F3F2F3',
      },
    },
    {
      when: (row) => row.id % 2 !== 0,
      style: {
        backgroundColor: 'white',
      },
    },
  ];

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true
    },
    {
      name: 'currency',
      selector: (row) => row.currency,
    },
    {
      name: 'rate',
      selector: (row) => row.rate,
    },
    {
      name: 'Last Update',
      selector: (row) => row.lastUpdatedAt,
    },
    {
      name: 'Update By',
      selector: (row) => row.address && row.address.city ? row.address.city : 'admin',
    },
    // Added edit column
    {
      name: 'Edit',
      cell: (row) => (
        <div>
          <button onClick={() => handleEdit(row)} style={{ marginRight: '5px' }}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
      ),
      allowOverflow: true,
      button: true,
    },
    {
      name: 'Delete', // Delete button column
      cell: (row) => (
        <button onClick={() => handleDelete(row.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      ),
      allowOverflow: true,
      button: true,
    },
  ];

  const [formData, setFormData] = useState({
    currency: '',
    rate: '',
    remark: '',
  });

  const [editedRow, setEditedRow] = useState(null);
  const [currency, setCurrency] = useState('');
  const [rate, setRate] = useState('');
  const [remark, setRemark] = useState('');
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // State untuk menampilkan dialog konfirmasi
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10; // Sesuaikan dengan ukuran halaman yang diinginkan
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("AuthToken");
        console.log(token)
        const response = await axios.get(`http://217.196.48.228:8080/api/currency?pageNumber=${currentPage}`, {
          headers: {
            'X-API-TOKEN': token
          }
        });

        console.log(response.data.data)
        setRecords(response.data.data);
        setFilterRecords(response.data.data);
        // Update total page count based on response
        setTotalPages(response.data.paging.totalPage);

        console.log(totalPages)

        console.log(currentPage)
      } catch (error) {
        console.log(error);
        // Handle error here
      }
    };
    fetchData();
  }, [currentPage]); // Update data when currentPage changes

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      (row.currency && row.currency.toLowerCase().includes(event.target.value.toLowerCase())) ||
      (row.rate && row.rate.toLowerCase().includes(event.target.value.toLowerCase())) 
    );
    setRecords(newData);
  };

  const toggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("AuthToken");
    const formDataToSend = {
      currency: currency,
      rate: rate,
      remark: remark,
    }
  
    try {
      if (editedRow) {
        // Jika ada row yang diedit, kirim permintaan PUT
        await axios.put(`http://217.196.48.228:8080/api/currency/${editedRow.id}`, formDataToSend, {
          headers: {
            'X-API-TOKEN': token
          }
        });
      } else {
        // Jika tidak, kirim permintaan POST
        const response = await axios.post('http://217.196.48.228:8080/api/currency?pageNumber=0', formDataToSend, {
          headers: {
            'X-API-TOKEN': token
          }
        });
        setRecords((prevRecords) => [...prevRecords, response.data]);
      }
      
      // Reset form fields, editedRow, dan tampilkan data terbaru
      setFormData({
        currency: '',
        rate: '',
        remark: '',
      });
      window.location.replace('/currency')
      setEditedRow(null);
      setShowForm(false);
  
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors);
      } else {
        setError('Terjadi kesalahan saat login. Silakan coba lagi.');
      }
    }
  };
  

  const handleEdit = (row) => {
    setEditedRow(row);
    setCurrency(row.currency);
    setRate(row.rate);
    setRemark(row.remark || '');
    setShowForm(true);
  };
  
  const handleDelete = async (id) => {
    // Set state `showConfirmation` menjadi `true` untuk menampilkan notifikasi
    setShowConfirmation(true);
    // Simpan ID item yang akan dihapus di state `editedRow`
    setEditedRow({ id });
  };
  
  const handleConfirmDelete = async () => {
    const token = localStorage.getItem("AuthToken");
    try {
      await axios.delete(`http://217.196.48.228:8080/api/currency/${editedRow.id}`, {
        headers: {
          'X-API-TOKEN': token
        }
      });
      
      // Filter data yang dihapus dari records dan set state records baru
      setRecords(records.filter((record) => record.id !== editedRow.id));
 
      // Set state `showConfirmation` menjadi `false` untuk menutup notifikasi setelah penghapusan berhasil
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className='ml-72 mt-6'>
      <div className='judul'>
        <h1 className='text-3xl'>
          Currency <span className='text-base'> List</span>
        </h1>
      </div>
      <div className='bg-blue-700 w-28 px-2 py-2 rounded-md mt-8'>
        <button className='text-white' onClick={toggleForm}>
          <FontAwesomeIcon icon={faUser} /> {showForm ? 'Cancel' : 'Add Data'}
        </button>
      </div>

      {showForm && (
        <div className='mt-8'>
          <h2 className='text-xl font-semibold mb-4'>{editedRow ? 'Edit Data' : 'Add New Data'}</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleFormSubmit} className='w-full max-w-2xl bg-white p-6 rounded-lg shadow-md'>
            <div className='flex  items-center mb-2'>
            <label className=' text-right pr-2 font-bold'>
              Currency:
              </label>
              <input type='text' name='id' className='flex-1 p-2 border rounded' placeholder='Enter Currency' value={currency} onChange={(e) => setCurrency(e.target.value)} />
            </div >
        
            <div className='flex  items-center mb-2'>
            <label  className=' text-right pr-2 font-bold'>
              Rate:
              </label>
              <input type='text' name='name' className='flex-1 p-2 ml-8 border rounded' placeholder='Enter Rate' value={rate} onChange={(e) => setRate(e.target.value)} />
              </div>
              <div className='flex  items-center mb-2'>
            <label className=' text-right pr-2 font-bold'>
              Remark:
              </label>
              <input type='text' name='email'  className='flex-1 p-2 ml-2 border rounded' placeholder='Enter Remark' value={remark} onChange={(e) => setRemark(e.target.value)} />
       
            </div>
           
            <br />
            <button type='submit' className='bg-blue-700 text-white px-4 py-2 rounded-md'>
              {editedRow ? 'Update Data' : 'Add Data'}
            </button>
          </form>
        </div>
      )}

      {!showForm && (
        <div>
          <div className="flex justify-end">
            <input
              type="text"
              placeholder='Search..'
              onChange={handleFilter}
              style={{ padding: '6px 10px', border: '1px solid gray', borderRadius: '5px', marginBottom: '7px' }}
            />
          </div>
          <DataTable  conditionalRowStyles={conditionalRowStyles} 
            columns={columns} 
            data={records} 
            fixedHeader 
            
            customStyles={customStyles}
        />
         
        </div>
      )}

     
      <div className="flex items-center gap-4 justify-center">
      <button disabled={currentPage === 0} onClick={handlePreviousPage} className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
        </svg>
        Previous
      </button>

      <div className="flex items-center gap-2">
     
        {Array.from(Array(totalPages).keys()).map((pageNumber) => (
          <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)} className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${currentPage === pageNumber ? 'bg-gray-900/10' : ''}`} type="button">
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              {pageNumber + 1}
            </span>
          </button>
        ))}
      </div>
      <button disabled={currentPage === totalPages - 1} onClick={handleNextPage} className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
        Next
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
        </svg>
      </button>
    </div>

      {/* Dialog konfirmasi untuk penghapusan */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-full max-w-sm mx-auto overflow-hidden bg-white shadow-md rounded">
            <div className="relative flex items-center justify-between px-2 py-2 font-bold text-white bg-yellow-500">
              <div class="relative flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="inline w-6 h-6 mr-2 opacity-75">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Deleting File</span>
              </div>
              <button onClick={() => setShowConfirmation(false)} class="relative">
                <svg class="w-5 h-5 text-yellow-300 fill-current hover:text-white" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </button>
            </div>
            <div className="p-3 bg-white border border-gray-300 rounded-b shadow-lg">
              <p className="font-bold text-gray-700">Are you sure?</p>
              <p className="mt-2 text-sm text-gray-500">Are you sure you want to delete this file?</p>
              <div className="block w-full mt-3 text-right">
                <button onClick={() => setShowConfirmation(false)} className="px-4 py-2 font-semibold text-gray-800 bg-white border border-gray-400 rounded-md hover:bg-gray-100 focus:outline-none">
                  Cancel
                </button>
                {/* Menggunakan handleConfirmDelete saat tombol Confirm ditekan */}
                <button onClick={handleConfirmDelete} className="px-4 py-2 font-bold text-white bg-yellow-500 rounded-md hover:bg-yellow-700 focus:outline-none">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Currency;

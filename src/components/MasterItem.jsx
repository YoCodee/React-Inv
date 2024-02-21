import React, {useState, useEffect} from 'react'
import Papa from 'papaparse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import { faUser, faEdit, faTrash,faFileExcel, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const MasterItem = () => {
  const [file, setFile] = useState(null);
    const [uploadedCSV, setUploadedCSV] = useState(null);
    const [records1, setRecords1] = useState([]);
    const [csvData, setCSVData] = useState(null);
    const [showCSVData, setShowCSVData] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [units, setUnits] = useState([]);
    const [editedRow, setEditedRow] = useState(null);
    const [noPart, setNoPart] = useState('');
    const [description, setDescription] = useState('');
    const [unit, setUnit] = useState("");
    const [hsCode, setHsCode] = useState("")
    const [itemType, setItemType] = useState("")
    const [records, setRecords] = useState([]);
    const [filterRecords, setFilterRecords] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState('');
    const [fileData, setFileData] = useState(null);
    const [tooltipId, setTooltipId] = useState(null);
    const [formData, setFormData] = useState({
      Partno: '',
      description: '',
      hsCode: '',
       itemType:'',
      unit: units,
      
     
    })

    
    const [data, setData] = useState([]);
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
  };

  const handleFormSubmit1 = async (e) => {
      e.preventDefault();

      if (!file) {
          console.error('No file selected!');
          return;
      }

      try {
          const response = await uploadCSV(file);
          console.log('Successfully uploaded CSV:', response.data.data.fileName);
          setUploadedCSV(response.data.data.fileName);
          await readCSV(response.data.data.fileName);
      } catch (error) {
          console.error('Error while uploading CSV:', error);
      }
  };

  const uploadCSV = (file) => {
      const token = localStorage.getItem("AuthToken");
      const formData = new FormData();
      formData.append('csv', file);

      const config = {
          headers: {
              'X-API-TOKEN': token,
              'Content-Type': 'multipart/form-data',
          },
      };

      return axios.post('http://217.196.48.228:8080/api/upload/csv', formData, config);
  };

  useEffect(() => {
      const fetchData = async () => {
          try {
              const token = localStorage.getItem("AuthToken");
              const response = await axios.get(`http://217.196.48.228:8080/api/csv`, {
                  headers: {
                      'X-API-TOKEN': token
                  }
              });

              // Ambil hanya nama file (fileName) dari respons
              const fileNames = response.data.data.map(file => file.fileName);
              setUploadedFiles(fileNames);
          } catch (error) {
              console.error('Error fetching uploaded files:', error);
          }
      };

      fetchData();
  }, []);

  useEffect(() => {
      // Saat komponen dimuat, ambil data records1 dari localStorage
      const storedRecords1 = localStorage.getItem('records1');
      if (storedRecords1) {
          setRecords1(JSON.parse(storedRecords1));
          console.log('Records1 retrieved from localStorage:', JSON.parse(storedRecords1));
      }
  }, []);

  const readCSV = async (fileName) => {
      try {
          const token = localStorage.getItem("AuthToken");
          const response = await axios.get(`http://217.196.48.228:8080/api/csv/${fileName}`, {
              headers: {
                  'X-API-TOKEN': token
              }
          });
          console.log('Successfully read CSV data:', response.data.data);
          setRecords(response.data.data);
          setCSVData(response.data.data);
      } catch (error) {
          console.error('Error while reading CSV:', error);
      }
  };

  const handlePopupDisplay = () => {
      setShowCSVData(!showCSVData);
  };

  const handleDeleteCSV = async () => {
      try {
          const token = localStorage.getItem("AuthToken");
          await axios.delete(`http://217.196.48.228:8080/api/csv/${uploadedCSV}`, {
              headers: {
                  'X-API-TOKEN': token
              }
          });
          console.log('Successfully deleted CSV:', uploadedCSV);
          setUploadedCSV(null);
          setCSVData(null);
          setRecords([]);
          setRecords1([]); // Hapus juga data records1 saat menghapus CSV
          localStorage.removeItem('records1'); // Hapus data records1 dari localStorage
      } catch (error) {
          console.error('Error while deleting CSV:', error);
      }
  };

  const handleInsertToItem = async () => {
      try {
          const token = localStorage.getItem("AuthToken");
          if (!token) {
              throw new Error('Authentication token is missing.');
          }

          const response = await axios.post(`http://217.196.48.228:8080/api/csv/${uploadedCSV}`, {}, {
              headers: {
                  'X-API-TOKEN': token
              }
          });
          console.log('Successfully inserted CSV data to item:', response.data.data);
          setRecords1(response.data.data);

          // Simpan data records1 ke localStorage
          localStorage.setItem('records1', JSON.stringify(response.data.data));
          console.log('Records1 saved to localStorage:', response.data.data);
          window.location.replace('/item')
          // Tampilkan pesan sukses

          // Kosongkan file CSV yang diunggah dan data yang ditampilkan
          setUploadedCSV(null);
          setCSVData(null);
          setRecords([]);

          // Atur kembali nilai `showCSVData` menjadi false untuk menyembunyikan popup
          setShowCSVData(false);
      } catch (error) {
          // Tangani kesalahan yang terjadi
          console.error('Error while inserting CSV data to item:', error);

          // Tampilkan pesan kesalahan kepada pengguna
          alert('Failed to insert data to item. Please try again later.');
      }
  };
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
    const columns1 = [
      {
        name: 'ID',
        selector: (row) => row.id,
        sortable: true,
        cell: (row) => (
          <div>
            <span
              // Tampilkan tooltip saat mouse hover
              title={row.id}
              onMouseEnter={() => setTooltipId(row.id)}
              onMouseLeave={() => setTooltipId(null)}
            >
              {row.id > 36 ? `${row.id.slice(0, 20)}...` : row.id}
            </span>
            {/* Tampilkan tooltip hanya jika ID dipotong */}
           
          </div>
        ),
      },
      {
        name: 'noPart',
        selector: (row) => row.noPart,
        sortable: true,
      },
      {
        name: 'Description',
        selector: (row) => row.description,
      },
      {
        name: 'Unit',
        selector: (row) => row.unit ? row.unit.name : '',
      },
      {
        name: 'hsCode',
        selector: (row) => row.hsCode,
      },
      {
        name: 'Item Type',
        selector: (row) => row.itemType,
      },
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
    ]

    const columns = [
      {
          name: 'noPart',
          selector: (row) => row.noPart,
      },
      {
          name: 'Description',
          selector: (row) => row.description,
      },
      {
          name: 'Unit',
          selector: (row) => row.unit ? row.unit.name : '',
      },
      {
          name: 'hsCode',
          selector: (row) => row.hsCode,
      },
      {
          name: 'Item Type',
          selector: (row) => row.itemType,
      },
  ];
    useEffect(() => {
      const fetchUnits = async () => {
        try {
            const token = localStorage.getItem("AuthToken");
            const response = await axios.get('http://217.196.48.228:8080/api/unit?pageNumber=0', {
                headers: {
                    'X-API-TOKEN': token
                }
            });
            // Simpan data unit ke dalam state
          
            setUnits(response.data.data);
            console.log(response.data.data)
            // Loop melalui setiap elemen dalam array untuk mendapatkan nama unit
           
        } catch (error) {
            console.error('Error fetching units:', error);
        }
    };
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("AuthToken");
          console.log(token)
          const response = await axios.get(`http://217.196.48.228:8080/api/item?pageNumber=${currentPage}`, {
            headers: {
              'X-API-TOKEN': token
            }
          })
          console.log(response.data.data)
          setRecords(response.data.data);
          setFilterRecords(response.data.data);
          // Update total page count based on response
          setTotalPages(response.data.paging.totalPage);

        } catch (error) {
          
        }
      }
      
      fetchData();
      fetchUnits();
    }, [currentPage])

    const toggleForm = () => {
      setShowForm((prevShowForm) => !prevShowForm);
    };
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

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("AuthToken");
      const formDataToSend = {
        noPart: noPart,
        description: description,
        hsCode: hsCode,
        itemType: itemType,
        unit: formData.unit,
      }
    
      try {
        if (editedRow) {
          // Jika ada row yang diedit, kirim permintaan PUT
          await axios.put(`http://217.196.48.228:8080/api/item/${editedRow.id}`, formDataToSend, {
            headers: {
              'X-API-TOKEN': token
            }
          });
          setRecords(prevRecords => prevRecords.map(record => {
            if (record.id === editedRow.id) {
              return { ...record, ...formDataToSend };
            }
            return record;
          }));
        } else {
          // Jika tidak, kirim permintaan POST
          const response = await axios.post('http://217.196.48.228:8080/api/item?pageNumber=0', formDataToSend, {
            headers: {
              'X-API-TOKEN': token
            }
          });
          setRecords((prevRecords) => [...prevRecords, response.data]);
        }
        
        // Reset form fields, editedRow, dan tampilkan data terbaru
        setFormData({
          noPart: '',
          description: '',
          hsCode: '',
          itemType: '',
          unit:'',
         
      
        });
        
        window.location.replace('/item')
        setEditedRow(null);
        setShowForm(false);
    
      } catch (error) {
        console.log(error)
      }
    };

    const handleFilter = (event) => {
      const newData = filterRecords.filter((row) =>
        (row.noPart && row.noPart.toLowerCase().includes(event.target.value.toLowerCase())) 
      
      );
      setRecords(newData);
    };

    const handleEdit = (row) => {
      setEditedRow(row);
      setNoPart(row.noPart);
      setDescription(row.description);
      setHsCode(row.hsCode);
      setItemType(row.itemType);
      setFormData({
        ...formData,
        unit: row.unit.name // Mengambil nama unit dari data yang akan diedit
      });
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
      await axios.delete(`http://217.196.48.228:8080/api/item/${editedRow.id}`, {
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
  

  
  
const handleUnitChange = (e) => {
  console.log('Selected Unit:', e.target.value); // Periksa nama unit yang dipilih
  // Mengatur nama unit yang dipilih ke dalam state `formData`
  setFormData({
    ...formData,
    unit: e.target.value // e.target.value berisi nama unit yang dipilih dari opsi dropdown
  });
};

const deleteFile = async (fileName) => {
  try {
      const token = localStorage.getItem("AuthToken");
      await axios.delete(`http://217.196.48.228:8080/api/csv/${fileName}`, {
          headers: {
              'X-API-TOKEN': token
          }
      });
      console.log('Successfully deleted CSV:', fileName);
      setUploadedFiles(prevFiles => prevFiles.filter(file => file !== fileName));
  } catch (error) {
      console.error('Error while deleting CSV:', error);
  }
};
const clearLocalStorage = () => {
  // Hapus data records1 dari localStorage
  localStorage.removeItem('records1');
  // Hapus juga data records1 yang disimpan dalam state
  setRecords1([]);
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
    <form onSubmit={handleFormSubmit1}>
                <input type="file" accept=".csv" onChange={handleFileChange} />
                <button type="submit">Upload CSV</button>
            </form>
            <ul>
                {uploadedFiles.map((fileName, index) => (
                    <li key={index}>
                        {fileName}
                        <button onClick={() => deleteFile(fileName)}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                    </li>
                ))}
            </ul>
            {uploadedCSV && (
                <div>
                    <h2>

                        <FontAwesomeIcon icon={faFileExcel} /> {uploadedCSV}
                        <button onClick={handleDeleteCSV}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                    </h2>
                    <p onClick={handlePopupDisplay}>View CSV Data</p>
                </div>
            )}
             {showCSVData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="w-full max-w-7xl mx-auto overflow-hidden bg-white shadow-md rounded">
                        <div className="relative flex items-center justify-between px-2 py-2 font-bold text-white bg-yellow-500">
                            <DataTable
                                conditionalRowStyles={conditionalRowStyles}
                                columns={columns}
                                data={records}
                                fixedHeader
                                customStyles={customStyles}
                            />
                        </div>
                        <div className="flex justify-end mx-2 my-3 items-end relative">
                            <button onClick={handleInsertToItem} className='bg-blue-400 px-2 flex justify-end py-3 text-white rounded-sm mx-auto'>Insert to Item</button>
                            <button onClick={clearLocalStorage} className='bg-red-400 px-2 flex justify-end py-3 text-white rounded-sm mx-auto'>Clear Local Storage</button>
                        </div>
                    </div>
                </div>
            )}
    {showForm && (
      <div className='mt-8'>
        <h2 className='text-xl font-semibold mb-4'>{editedRow ? 'Edit Data' : 'Add New Data'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleFormSubmit} className='w-full max-w-2xl bg-white p-6 rounded-lg shadow-md'>
          <div className='flex  items-center mb-2'>
          <label>
            noPart:
            <input type='text' name='id' className='flex-1 p-2 border rounded' placeholder='Enter NoPart'   value={noPart} onChange={(e) => setNoPart(e.target.value)} />
          </label>
         </div>
          <div className='flex  items-center mb-2'>
          <label>
            description:
            <input type='text' name='name' className='flex-1 p-2 border rounded' placeholder='Enter Description'  value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
         </div>
          <div className='flex  items-center mb-2'>
          <label>
            hsCode:
            <input type='text' name='email' className='flex-1 p-2 border rounded' placeholder='Enter hsCode'  value={hsCode} onChange={(e) => setHsCode(e.target.value)} />
          </label>
         </div>
          <div className='flex  items-center mb-2'>
          <label>
            item Type:
            <input type='text' name='email' className='flex-1 p-2 border rounded' placeholder='Enter ItemType'  value={itemType} onChange={(e) => setItemType(e.target.value)} />
          </label>
         </div>
          <div className='flex  items-center mb-2'>
            <label>Select Unit
          <select id="unit" name="unit" className='flex-1 p-2 border rounded' placeholder='Select Unit'  value={formData.unit} onChange={handleUnitChange}>
  <option value="">Select Unit</option>
  {units.map(unit => (
    <option key={unit.id} value={unit.name}>{unit.name}</option>
  ))}
</select>
</label>
          </div>
         
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
          columns={columns1} 
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
  )
}

export default MasterItem
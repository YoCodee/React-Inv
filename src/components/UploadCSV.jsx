import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faFileExcel, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';

function UploadCSV() {
    const [file, setFile] = useState(null);
    const [uploadedCSV, setUploadedCSV] = useState(null);
    const [records, setRecords] = useState([]);
    const [records1, setRecords1] = useState([]);
    const [csvData, setCSVData] = useState(null);
    const [showCSVData, setShowCSVData] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFormSubmit = async (e) => {
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

        return axios.post('http://localhost:8080/api/upload/csv', formData, config);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("AuthToken");
                const response = await axios.get(`http://localhost:8080/api/csv`, {
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
            const response = await axios.get(`http://localhost:8080/api/csv/${fileName}`, {
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
            await axios.delete(`http://localhost:8080/api/csv/${uploadedCSV}`, {
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

            const response = await axios.post(`http://localhost:8080/api/csv/${uploadedCSV}`, {}, {
                headers: {
                    'X-API-TOKEN': token
                }
            });
            console.log('Successfully inserted CSV data to item:', response.data.data);
            setRecords1(response.data.data);

            // Simpan data records1 ke localStorage
            localStorage.setItem('records1', JSON.stringify(response.data.data));
            console.log('Records1 saved to localStorage:', response.data.data);
            window.location.replace('/upload')
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
    const columns1 = [
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
    const deleteFile = async (fileName) => {
        try {
            const token = localStorage.getItem("AuthToken");
            await axios.delete(`http://localhost:8080/api/csv/${fileName}`, {
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

    return (
        <div className='ml-72'>
            <form onSubmit={handleFormSubmit}>
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

            <DataTable
                conditionalRowStyles={conditionalRowStyles}
                columns={columns1}
                data={records1}
                fixedHeader
                customStyles={customStyles}
            />
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
        </div>
    );
}

export default UploadCSV;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCheck, faHome, faArrowDown, faChevronDown, faDatabase, faPerson, faUser, faWarehouse, faFolder, faCog, faLaptop } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOrdersDropdownOpen, setOrdersDropdownOpen] = useState(false);
  const [isPurcashedownOpen, setPurcashedownOpen] = useState(false);
  const [isPurcashedownOpen1, setPurcashedownOpen1] = useState(false);
  const [isPurcashedownOpen2, setPurcashedownOpen2] = useState(false);
  const [isPurcashedownOpen3, setPurcashedownOpen3] = useState(false);
  const [isPurcashedownOpen4, setPurcashedownOpen4] = useState(false);
  const [isPurcashedownOpen5, setPurcashedownOpen5] = useState(false);
  const [isPurcashedownOpen6, setPurcashedownOpen6] = useState(false);
  const [isPurcashedownOpen7, setPurcashedownOpen7] = useState(false);
  const [isPurcashedownOpen8, setPurcashedownOpen8] = useState(false);
  const [isPurcashedownOpen9, setPurcashedownOpen9] = useState(false);
  const [isPurcashedownOpen0, setPurcashedownOpen0] = useState(false);

  const toggleOrdersDropdown = () => {
    setOrdersDropdownOpen(!isOrdersDropdownOpen);
  };
  const togglePurcasheDropdown = () => {
    setPurcashedownOpen(!isPurcashedownOpen);
  };
  const togglePurcasheDropdown1 = () => {
    setPurcashedownOpen1(!isPurcashedownOpen1);
  };
  const togglePurcasheDropdown2 = () => {
    setPurcashedownOpen2(!isPurcashedownOpen2);
  };
  const togglePurcasheDropdown3 = () => {
    setPurcashedownOpen3(!isPurcashedownOpen3);
  };
  const togglePurcasheDropdown4 = () => {
    setPurcashedownOpen4(!isPurcashedownOpen4);
  };
  const togglePurcasheDropdown5 = () => {
    setPurcashedownOpen5(!isPurcashedownOpen5);
  };
  const togglePurcasheDropdown6 = () => {
    setPurcashedownOpen6(!isPurcashedownOpen6);
  };
  const togglePurcasheDropdown7 = () => {
    setPurcashedownOpen7(!isPurcashedownOpen7);
  };
  const togglePurcasheDropdown8 = () => {
    setPurcashedownOpen8(!isPurcashedownOpen8);
  };
  const togglePurcasheDropdown9 = () => {
    setPurcashedownOpen9(!isPurcashedownOpen9);
  };
  const togglePurcasheDropdown0 = () => {
    setPurcashedownOpen0(!isPurcashedownOpen0);
  };

  return (
    <div>

      <div className="fixed left-0 top-0 w-64 h-full bg-[#40A2E3] p-4  z-50 sidebar-menu transition-transform overflow-y-auto shadow-2xl" >
      <a href="#" class="flex items-center pb-4 border-b border-b-gray-800">
            <img src="https://placehold.co/32x32" alt="" class="w-8 h-8 rounded object-cover"/>
            <span class="text-lg font-bold text-white ml-3">  Logo</span>
        </a>
        <ul className="mt-4">
        <li class="mb-1 group ">
                <Link  to='/dashboard' class="flex items-center py-2 px-4 bg-white text-black hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i class="ri-home-2-line mr-3 text-lg"></i>
                    <span class="text-s font-bold"> <FontAwesomeIcon icon={faHome} /> Dashboard  </span>
                </Link>
            </li>

          <li className="mb-1 group active">
            <a
              href="#"
              className={`flex items-center justify-endr py-2 px-4 text-white hover:bg-white hover:text-black rounded-md cursor-pointer ${
                isOrdersDropdownOpen ? 'group-[.active]:bg-white group-[.active]:text-black group-[.selected]:bg-white group-[.selected]:text-gray-100' : ''
              } sidebar-dropdown-toggle`}
              onClick={toggleOrdersDropdown}
            >
              <i className="ri-instance-line mr-3 text-lg"></i>
              <div className="flex justify-between">
              <div className="text-sm cursor-pointer justify-between flex items-center">
                <FontAwesomeIcon icon={faDatabase} className='text-xl mr-3'/>Master Data <FontAwesomeIcon className='ml-[51px]' icon={faChevronDown}/> 
                </div>
                </div>
          
              <i className={`ri-arrow-right-s-line ml-auto ${isOrdersDropdownOpen ? 'group-[.selected]:rotate-90' : ''}`}></i>
            </a>
            <ul className={`pl-7 mt-2 ${isOrdersDropdownOpen ? 'block' : 'hidden'} group-[.selected]:block`}>
              <li className="mb-4">
                <Link to='/currency' href="#" className="text-white text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                  Currency
                </Link>
              </li>
              <li className="mb-4">
                <Link to='/unit' href="#" className="text-white text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                  Units
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/item" className="text-white text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                  Items
                </Link>
              </li>
              <li className="mb-4">
                <Link to='/supplier' className="text-white text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                  Suppliers
                </Link>
              </li>
              <li className="mb-4">
                <Link to='/costumer' className="text-white text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                  Costumers
                </Link>
              </li>
            </ul>
          </li>
          <li className="mb-1 group active">
            <a
              href="#"
              className={`flex items-center justify-endr py-2 px-4 text-white hover:bg-white hover:text-black rounded-md cursor-pointer ${
                isPurcashedownOpen ? 'group-[.active]:bg-white group-[.active]:text-black group-[.selected]:bg-white group-[.selected]:text-gray-100' : ''
              } sidebar-dropdown-toggle`}
              onClick={togglePurcasheDropdown}
            >
              <i className="ri-instance-line mr-3 text-lg"></i>
              <div className="flex justify-between">
              <div className="text-sm cursor-pointer justify-between flex items-center">
              <FontAwesomeIcon icon={faUser} className='text-xl mr-3'/> Purchase <FontAwesomeIcon className='ml-[71px]' icon={faChevronDown}/> 
                </div>
                </div>
          
              <i className={`ri-arrow-right-s-line ml-auto ${isPurcashedownOpen ? 'group-[.selected]:rotate-90' : ''}`}></i>
            </a>
            <ul className={`pl-7 mt-2 ${isPurcashedownOpen ? 'block' : 'hidden'} group-[.selected]:block`}>
              <li className="mb-4">
                <a href="#" className="text-white text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                  Order
                </a>
              </li>
              
            </ul>
          </li>
          <li className="mb-1 group active">
            <a
              href="#"
              className={`flex items-center justify-endr py-2 px-4 text-white hover:bg-white hover:text-black rounded-md cursor-pointer ${
                isPurcashedownOpen1 ? 'group-[.active]:bg-white group-[.active]:text-black group-[.selected]:bg-white group-[.selected]:text-gray-100' : ''
              } sidebar-dropdown-toggle`}
              onClick={togglePurcasheDropdown1}
            >
              <i className="ri-instance-line mr-3 text-lg"></i>
              <div className="flex justify-between">
              <div className="text-sm cursor-pointer justify-between flex items-center">
              <FontAwesomeIcon icon={faUser} className='text-xl mr-3'/> Planning <FontAwesomeIcon className='ml-[73px]' icon={faChevronDown}/> 
                </div>
                </div>
          
              <i className={`ri-arrow-right-s-line ml-auto ${isPurcashedownOpen1 ? 'group-[.selected]:rotate-90' : ''}`}></i>
            </a>
            <ul className={`pl-7 mt-2 ${isPurcashedownOpen1 ? 'block' : 'hidden'} group-[.selected]:block`}>
              <li className="mb-4">
                <a href="#" className="text-white text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                  Order
                </a>
              </li>
              
            </ul>
          </li>
          <li className="mb-1 group active">
            <a
              href="#"
              className={`flex items-center justify-endr py-2 px-4 text-white hover:bg-white hover:text-black rounded-md cursor-pointer ${
                isPurcashedownOpen2 ? 'group-[.active]:bg-white group-[.active]:text-black group-[.selected]:bg-white group-[.selected]:text-gray-100' : ''
              } sidebar-dropdown-toggle`}
              onClick={togglePurcasheDropdown2}
            >
              <i className="ri-instance-line mr-3 text-lg"></i>
              <div className="flex justify-between">
              <div className="text-sm cursor-pointer justify-between flex items-center">
              <FontAwesomeIcon icon={faHome} className='text-xl mr-2'/> WareHouse <FontAwesomeIcon className='ml-[55px]' icon={faChevronDown}/> 
                </div>
                </div>
          
              <i className={`ri-arrow-right-s-line ml-auto ${isPurcashedownOpen2 ? 'group-[.selected]:rotate-90' : ''}`}></i>
            </a>
            <ul className={`pl-7 mt-2 ${isPurcashedownOpen2 ? 'block' : 'hidden'} group-[.selected]:block`}>
              <li className="mb-4">
                <a href="#" className="text-white text-sm flex items-center hover:text-black before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                  Order
                </a>
              </li>
              
            </ul>
          </li>
          <li className="mb-1 group active">
            <a
              href="#"
              className={`flex items-center justify-endr py-2 px-4 text-white hover:bg-white hover:text-black rounded-md cursor-pointer ${
                isPurcashedownOpen3 ? 'group-[.active]:bg-white group-[.active]:text-black group-[.selected]:bg-white group-[.selected]:text-black' : ''
              } sidebar-dropdown-toggle`}
              onClick={togglePurcasheDropdown3}
            >
              <i className="ri-instance-line mr-3 text-lg"></i>
              <div className="flex justify-between">
              <div className="text-sm cursor-pointer justify-between flex items-center">
              <FontAwesomeIcon icon={faHome} className='text-xl mr-2'/>Finish Goods <FontAwesomeIcon className='ml-[47px]' icon={faChevronDown}/> 
                </div>
                </div>
          
              <i className={`ri-arrow-right-s-line ml-auto ${isPurcashedownOpen3 ? 'group-[.selected]:rotate-90' : ''}`}></i>
            </a>
            <ul className={`pl-7 mt-2 ${isPurcashedownOpen3 ? 'block' : 'hidden'} group-[.selected]:block`}>
              <li className="mb-4">
                <a href="#" className="text-white text-sm flex items-center hover:text-black before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                  Order
                </a>
              </li>
              
            </ul>
          </li>
          <li className="mb-1 group active">
            <a
              href="#"
              className={`flex items-center justify-endr py-2 px-4 text-white hover:bg-white hover:text-black rounded-md cursor-pointer ${
                isPurcashedownOpen4 ? 'group-[.active]:bg-white group-[.active]:text-black group-[.selected]:bg-white group-[.selected]:text-black' : ''
              } sidebar-dropdown-toggle`}
              onClick={togglePurcasheDropdown4}
            >
              <i className="ri-instance-line mr-3 text-lg"></i>
              <div className="flex justify-between">
              <div className="text-sm cursor-pointer justify-between flex items-center">
              <FontAwesomeIcon icon={faUser} className='text-xl mr-3'/> Subcon <FontAwesomeIcon className='ml-[81px]' icon={faChevronDown}/> 
                </div>
                </div>
          
              <i className={`ri-arrow-right-s-line ml-auto ${isPurcashedownOpen4 ? 'group-[.selected]:rotate-90' : ''}`}></i>
            </a>
            <ul className={`pl-7 mt-2 ${isPurcashedownOpen4 ? 'block' : 'hidden'} group-[.selected]:block`}>
              <li className="mb-4">
                <a href="#" className="text-white text-sm flex items-center hover:text-black before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                  Order
                </a>
              </li>
              
            </ul>
          </li>
          <li className="mb-1 group active">
            <a
              href="#"
              className={`flex items-center justify-endr py-2 px-4 text-white hover:bg-white hover:text-black rounded-md cursor-pointer ${
                isPurcashedownOpen5 ? 'group-[.active]:bg-white group-[.active]:text-black group-[.selected]:bg-white group-[.selected]:text-black' : ''
              } sidebar-dropdown-toggle`}
              onClick={togglePurcasheDropdown5}
            >
              <i className="ri-instance-line mr-3 text-lg"></i>
              <div className="flex justify-between">
              <div className="text-sm cursor-pointer justify-between flex items-center">
              <FontAwesomeIcon icon={faFolder} className='text-xl mr-3'/>Sales <FontAwesomeIcon className='ml-[94px]' icon={faChevronDown}/> 
                </div>
                </div>
          
              <i className={`ri-arrow-right-s-line ml-auto ${isPurcashedownOpen5 ? 'group-[.selected]:rotate-90' : ''}`}></i>
            </a>
            <ul className={`pl-7 mt-2 ${isPurcashedownOpen5 ? 'block' : 'hidden'} group-[.selected]:block`}>
              <li className="mb-4">
                <a href="#" className="text-white text-sm flex items-center hover:text-black before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                  Order
                </a>
              </li>
              
            </ul>
          </li>
          <li className="mb-1 group active">
            <a
              href="#"
              className={`flex items-center justify-endr py-2 px-4 text-white hover:bg-white hover:text-black rounded-md cursor-pointer ${
                isPurcashedownOpen6 ? 'group-[.active]:bg-white group-[.active]:text-black group-[.selected]:bg-white group-[.selected]:text-black' : ''
              } sidebar-dropdown-toggle`}
              onClick={togglePurcasheDropdown6}
            >
              <i className="ri-instance-line mr-3 text-lg"></i>
              <div className="flex justify-between">
              <div className="text-sm cursor-pointer justify-between flex items-center">
              <FontAwesomeIcon icon={faCog} className='text-xl mr-3'/> Accounting <FontAwesomeIcon className='ml-[56px]' icon={faChevronDown}/> 
                </div>
                </div>
          
              <i className={`ri-arrow-right-s-line ml-auto ${isPurcashedownOpen6 ? 'group-[.selected]:rotate-90' : ''}`}></i>
            </a>
            <ul className={`pl-7 mt-2 ${isPurcashedownOpen6 ? 'block' : 'hidden'} group-[.selected]:block`}>
              <li className="mb-4">
                <a href="#" className="text-white text-sm flex items-center hover:text-black before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                  Order
                </a>
              </li>
              
            </ul>
          </li>
          <li className="mb-1 group active">
            <a
              href="#"
              className={`flex items-center justify-endr py-2 px-4 text-white hover:bg-white hover:text-black rounded-md cursor-pointer ${
                isPurcashedownOpen7 ? 'group-[.active]:bg-white group-[.active]:text-black group-[.selected]:bg-white group-[.selected]:text-black' : ''
              } sidebar-dropdown-toggle`}
              onClick={togglePurcasheDropdown7}
            >
              <i className="ri-instance-line mr-3 text-lg"></i>
              <div className="flex justify-between">
              <div className="text-sm cursor-pointer justify-between flex items-center">
              <FontAwesomeIcon icon={faLaptop} className='text-xl mr-2'/> Report <FontAwesomeIcon className='ml-[85px]' icon={faChevronDown}/> 
                </div>
                </div>
          
              <i className={`ri-arrow-right-s-line ml-auto ${isPurcashedownOpen7 ? 'group-[.selected]:rotate-90' : ''}`}></i>
            </a>
            <ul className={`pl-7 mt-2 ${isPurcashedownOpen7 ? 'block' : 'hidden'} group-[.selected]:block`}>
              <li className="mb-4">
                <a href="#" className="text-white text-sm flex items-center hover:text-black before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                  Order
                </a>
              </li>
              
            </ul>
          </li>
          <li className="mb-1 group active">
            <a
              href="#"
              className={`flex items-center justify-endr py-2 px-4 text-white hover:bg-white hover:text-black rounded-md cursor-pointer ${
                isPurcashedownOpen8 ? 'group-[.active]:bg-white group-[.active]:text-black group-[.selected]:bg-white group-[.selected]:text-black' : ''
              } sidebar-dropdown-toggle`}
              onClick={togglePurcasheDropdown8}
            >
              <i className="ri-instance-line mr-3 text-lg"></i>
              <div className="flex justify-between">
              <div className="text-sm cursor-pointer justify-between flex items-center">
              <FontAwesomeIcon icon={faCog} className='text-xl mr-3'/> Tools <FontAwesomeIcon className='ml-[96px]' icon={faChevronDown}/> 
                </div>
                </div>
          
              <i className={`ri-arrow-right-s-line ml-auto ${isPurcashedownOpen8 ? 'group-[.selected]:rotate-90' : ''}`}></i>
            </a>
            <ul className={`pl-7 mt-2 ${isPurcashedownOpen8 ? 'block' : 'hidden'} group-[.selected]:block`}>
              <li className="mb-4">
                <a href="#" className="text-white text-sm flex items-center hover:text-black before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
                  Order
                </a>
              </li>
              
            </ul>
          </li>
          <li class="mb-1 group">
                <a href="#" class="flex items-center py-2 px-4 text-white hover:bg-white hover:text-black rounded-md group-[.active]:bg-white group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i class="ri-settings-2-line mr-3 text-lg"></i>
                    <span class="text-sm">Settings</span>
                </a>
            </li>
            
        </ul>
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"></div>
    </div>
  );
};

export default Sidebar;

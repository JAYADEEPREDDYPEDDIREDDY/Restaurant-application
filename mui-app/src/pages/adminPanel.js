import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  ShopOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import {Menu } from 'antd';
import AdminPanelNavbar from '../components/AdminPanelNavbar';
import AddResturant from './AddResturant'
import '../styles/adminPanel.css'
import RestaurantList from './RestaurantList';
import DashBoard from './dashBoard';
import Categories from './Categories';
import CategoryIcon from '@mui/icons-material/Category';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
const AdminPanel = () => {
  function getItem(label, key, icon, children, type,component) {
    return {
      key,
      icon,
      children,
      label,
      type,
      component,
    };
  }
  const [collapsed, setCollapsed] = useState(false);
  const [selectedComponent,setSelectedComponent] = useState(null);
  const [selectedComponentName,setSelectedComponentName] = useState(null);
  const [restaurant,setRestaurant]=useState('');
  const items = [
    
    getItem(' Dashboard', '1', <PieChartOutlined style={{fontSize:"20px"}}/>,'','',<DashBoard/>),
    getItem('Restaurants', '2', <ShopOutlined style={{fontSize:"20px"}}/>,'','',<RestaurantList setSelectedComponent={setSelectedComponent} setRestaurant={setRestaurant} />

    ),
    getItem('Categories', '3', <CategoryIcon style={{fontSize:"20px"}}/>,'','',<Categories/>),
    getItem('Delivery Pantners', '4', <LocalShippingIcon style={{fontSize:"20px"}}/>,),
    getItem('Banners', '5', <PhotoLibraryIcon style={{fontSize:"20px"}}/>,),
    getItem('Sub admins', '6', <SupervisorAccountIcon style={{fontSize:"20px"}}/>,),
    getItem('System Management', '7', <SettingsSuggestIcon style={{fontSize:"20px"}}/>,),

  ];
  
 
  const handleCollapse = collapsedValue => {
    if (collapsed !== collapsedValue) { 
      setCollapsed(collapsedValue);
    }
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const handleMenuItemClick=(item)=>{
    setSelectedComponent(item.component);
    setSelectedComponentName(item.label);
  }

  return (
    <>
    
    <div
      style={{
        width: '100%',
        
      }}
   >
    <div className='logo-container '>
          {collapsed ? (
            <img src='./images/logoSmall.svg' alt='logo' className='smallLogo' />
          ) : (
            <img src='./images/logo.svg' alt='logo' className='logo' />
          )}
          <AdminPanelNavbar onSetCollapse={toggleCollapsed} selectedComponentName={selectedComponentName}/>
        </div>
        <div style={{display:'flex'}}>
        <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        style={{  width: collapsed ? '80px' : '256px',height:'90vh',fontWeight:'bold',fontSize:'15px'}}
        onCollapse={handleCollapse} 
        onClick={(e) => handleMenuItemClick(items.find(item => item.key === e.key))}
      />
      {selectedComponent && selectedComponent}
        </div>
      
    </div>
    </>
  );
};
export default AdminPanel;
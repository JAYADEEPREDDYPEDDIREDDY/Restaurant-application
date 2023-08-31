import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Switch,Button } from '@mui/material';
import AddResturant from './AddResturant';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantDetails from './RestaurantDetails';





export default function RestaurantList(props) {

  const { setSelectedComponent } = props;
  const [rows, setRows] = useState([]);
  
  
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const columns = [
{ field: 'id', headerName: 'ID', width: 70 },
{ field: 'restaurantName', headerName: 'Restaurant Name', width: 160 },
{ field: 'address', headerName: 'Address', width: 130 },
{
  field: 'contactNumber',
  headerName: 'Phone number',
  width: 150,
},
{
  field: 'emailId',
  headerName: 'Email',
  width: 150,   
},
{
  field: 'serviceTax',
  headerName: 'Service Tax',
  width: 120,   
},
{
  field: 'eventBookingAvaibale',
  headerName: 'Event Booking Avaiable',
  width: 120,  
},

{
  field: "action",
  headerName: "Status",
  sortable: false,
  renderCell: ({ row }) => <Switch checked={row.status} onChange={() => handleSwitchChange(row)} />,

},
{
  field: "viewMore",
  headerName: "Action",
  sortable: false,
  renderCell: ({ row }) => <Button variant="contained" sx={{ fontSize: '10px' }} onClick={() => handleViewMore(row, setSelectedComponent)}>View More</Button>,

},


];
const navigate = useNavigate();
const handleViewMore = (row) => {
const restaurantName = row.restaurantName;
//props.setRestaurant(restaurantName)
navigate(`/adminPanel/?restaurantName=${restaurantName}`)
setSelectedComponent(<RestaurantDetails/>); // Change to the correct component name
};


const [statusSelected, setStatusSelected] = useState('');
const handleSwitchChange = (row) => {
  const newStatus = !row.status; // Assuming 'status' is the current status property
  setStatusSelected(row.restaurantName);
  
  axios.post(`${process.env.REACT_APP_SERVER_URL}/updateStatus`, {
    params: {
      restaurantName: row.restaurantName,
      newStatus: newStatus
    }
  })
  .then(result => console.log(result))
  .catch(err => console.log(err));
}


useEffect(() => {
  console.log(statusSelected);
}, [statusSelected]);


  const getRestaurantDetails = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/ResturantsList`)
      .then(result => {
        
        setRows(result.data);
      })
      .catch(err => console.log(err));
  };
  
  useEffect(() => {
    getRestaurantDetails();
  }, []);
   // Empty dependency array means the effect runs only on mount
  
    const [value, setValue] = React.useState(0);


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
        <Box sx={{ width: '80%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Restaurants" {...a11yProps(0)} />
              
              <Tab label="Add Restaurant" {...a11yProps(1)}> <Button>Add restaurant</Button></Tab>
            </Tabs>
            
           
            </div>
          </Box>
          <CustomTabPanel value={value} index={0}>
          <div style={{ height:'600px', width: '100%',textAlign:'center' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            style={{textAlign:'center'}}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 9 },
              },
            }}
            pageSizeOptions={[5, 10]}
           
          />
        </div>
          </CustomTabPanel>
          
         
          <CustomTabPanel value={value} index={1}>
           <AddResturant/>
          </CustomTabPanel>
        </Box>
      );
    }
    
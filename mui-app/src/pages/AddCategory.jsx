import React, { useState } from "react";
import {
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";

import Button from "@mui/joy/Button";
import SvgIcon from "@mui/joy/SvgIcon";
import InfoIcon from "@mui/icons-material/Info";
import "react-phone-number-input/style.css";
import axios from "axios";


const AddCategory = () => {
    const [input,setInput]=useState({
        image:'',
        categoryName:'',

    })
    const handleChange = (e) => {
    const { name, value } = e.target;
   setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
      const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setInput((prevInput) => ({
      ...prevInput,
      image: file,
    }));
    setImagePreviewUrl(URL.createObjectURL(file));
    console.log(selectedFile);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to your backend to store data
      const formData = new FormData();
      formData.append('categoryName', input.categoryName);
      formData.append('image', selectedFile);

      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/addCategory`, formData);
      console.log(response.data); // Response from the backend

      // Clear the form after successful submission
      setInput({ image: '', categoryName: '' });
      setSelectedFile(null);
      setImagePreviewUrl('');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  return (
    <>
    <div>
         <h3 style={{ backgroundColor: "black", color: "white", padding: "10px" }}>
          Add Category
         </h3>
    </div>
    <form onSubmit={handleSubmit}>
        <table>
            <tr>
                <td>
              <label>Category :</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <TextField
                required
                margin="normal"
                name="categoryName"
                onChange={handleChange}
                id="outlined-basic"
                label="Category  "
                variant="outlined"
                sx={{ width: "400px" }}
                 value={input.categoryName}
              />
            </td>
            </tr>
            <tr>
            <td>
              <label>Banner Image :</label>
            </td>
            <td style={{ width: "200px" }}></td>
            <td>
              <Button
                margin="normal"
                component="label"
                role={undefined}
                tabIndex={-1}
                variant="outlined"
                color="neutral"
                startIcon={
                  <SvgIcon>
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </SvgIcon>
                }
              >
                Upload a file
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </Button>
              {selectedFile ? (
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  style={{ maxWidth: "10%", marginBottom: "-15px" }}
                />
              ) : (
                <Tooltip title="Click for Info">
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              )}
            </td>
          </tr>

        </table>
        <Button type='submit'>Submit</Button>
    </form>
    </>
  )
}

export default AddCategory;
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';



  

export default function FolderList({list}) {
   
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState({});
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [listData, setList] = React.useState([]);


  React.useEffect(() => {
    setList(list);
  },[list])

  const handleOpenModal = (item, index) => {
      setIsModalOpen(true);
      setSelectedIndex(index);
      setSelectedData(item);
  }

  const handleAddItem = () => {
    setIsModalOpen(true);
    setSelectedIndex(-1);

    setSelectedData({
      "firstName": "",
      "lastName": "",
      "number": "+91 ",
    });

  }

  const handleSaveModal = (inputValue) => {
    if(!inputValue) {
      return;
    }

    const tempList = [...list];
    if(selectedIndex === -1) {
      tempList.unshift(inputValue);
    } else {
      tempList.splice(selectedIndex, 1, inputValue);
    }
  
    setList(tempList);
    setIsModalOpen(false);
  }

  const deleteItem = (index) => {
    const tempList = [...listData];
    tempList.splice(index, 1);
    setList(tempList)
  }

  return (
     <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <AddEditModal isOpenModal={isModalOpen} selectedData={selectedData} handleCloseModal={(inputValue) => handleSaveModal(inputValue)} selectedIndex={selectedIndex} handleDelete={(index) => deleteItem(index)}/>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {
              listData.map((item, index) => <ListItemButton key={index+'test'} onClick={() => handleOpenModal(item, index)}>
                <ListItemAvatar>
                  <Avatar>
                    {item.firstName[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.firstName + " "+ item.lastName} secondary={item.number} />
              </ListItemButton> )
          }
      </List>

      <div style={{position:'fixed', bottom: '30px', right:'25px'}}>
        <Fab color="primary" aria-label="add" onClick={handleAddItem}>
          <AddIcon />
        </Fab>
      </div>
      </CardContent>
    </Card> 
   
  );
}


const AddEditModal = ({isOpenModal = false, selectedData = null, handleCloseModal,selectedIndex, handleDelete}) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue]= React.useState({});

  React.useEffect(() => {
    setOpen(isOpenModal);
  },[isOpenModal]);

  React.useEffect(() => {
    setInputValue(selectedData);
  },[selectedData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    handleCloseModal();
    setOpen(false);
  };

 const handleItemChange = (keyName, value) => {
  const inputValueTemp = {...inputValue, [keyName]: value}
  setInputValue(inputValueTemp);
 }

 const handleSave = () => {
    handleCloseModal(inputValue);
    handleClose();
 }

 const handleDeleteItem = () => {
  if(selectedIndex !== -1) {
    handleDelete(selectedIndex);
    handleClose();
  }
 }


return (
  <React.Fragment>
  <Dialog
    fullWidth={true}
    maxWidth={'sm'}
    open={open}
    onClose={handleClose}
  >
    <DialogTitle>

    <Grid container spacing={2}>
  <Grid item xs={8}>
   Add / Edit Name
  </Grid>
 
  
  <Grid item xs={2}>
  <EditIcon />
  </Grid>
  <Grid item xs={2}>
  <DeleteIcon color={'warning'} style={{cursor:'pointer'}} onClick={() => handleDeleteItem()} />
  </Grid>
</Grid>

    </DialogTitle>
    <DialogContent>
      {/* <DialogContentText>
       Name will here
      </DialogContentText> */}
      <Box
        noValidate
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          m: 'auto',
          width: 'fit-content',
        }}
      >

 
     <TextField id="standard-basic" label="First Name" defaultValue={inputValue?.firstName} variant="standard" value={inputValue?.firstName}
  onChange={(event) => handleItemChange('firstName',event.target.value )} />
       <TextField id="standard-basic" label="Last Name" defaultValue={inputValue?.lastName} variant="standard" value={inputValue?.lastName}
  onChange={(event) => handleItemChange('lastName',event.target.value )} />
       <TextField id="standard-basic" label="Mobile Number" defaultValue={inputValue?.number} variant="standard" value={inputValue?.number}
  onChange={(event) => handleItemChange('number',event.target.value )} />
   
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleSave}>Save</Button>
    </DialogActions>
  </Dialog>
</React.Fragment>
)
}

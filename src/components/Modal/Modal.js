import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import MapComponent from '../../components/Map/MapComponent';

export const Modal = () => {

  return (

    <div className= 'bg-red-500 p-4 container mx-auto w-full h-full'>
      <h1>Modal</h1>
    <MapComponent  />

    </div>
  

  );
};
export default Modal;



// <div class="container mx-auto p-4">
// <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
//   <div class="col-span-2 bg-green-500 p-4 text-white">
    
  {/* <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      height="140"
      image="/static/images/cards/contemplative-reptile.jpg"
      alt="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Lizard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card> */}

{/*   
  </div>
  <div class="bg-red-500 p-4 text-white">Row 2, Column 2</div>
</div>

<div class="grid grid-cols-1 mt-4">
  <div class="bg-blue-500 p-4 text-white">Row 1, Column 1</div>
</div>
</div>

<div class="container mx-auto p-4">

    <div class="grid grid-cols-1 mb-4">
      <div class="bg-blue-500 p-4 text-white">Row 1, Column 1 k</div>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

      <div class="bg-green-500 p-4 text-white">Row 2, Column 1k</div>
      <div class="bg-red-500 p-4 text-white">Row 2, Column 2k</div>

    </div>

</div>  */}
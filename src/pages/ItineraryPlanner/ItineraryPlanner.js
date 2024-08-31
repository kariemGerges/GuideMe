import React, { useEffect, useState } from 'react';
import FormItineraryPage from 'src/components/FormItineraryPage/FormItineraryPage';
import usePlacesFetcher from 'src/Hooks/usePlacesFetcher';
import Loading from 'src/components/Loading/Loading';
import { Link } from 'react-router-dom';
import SearchAndFilter from 'src/components/SearchAndFilter/SearchAndFilter';
import { Card, CardContent, CardMedia, CardActions, Button, Typography, Modal, Box } from '@mui/material';
import MapComponent from 'src/components/Map/MapComponent';
import Chatbot from 'src/components/ChatBot/Chatbot';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function ItineraryPlanner() {
  const [params, setParams] = useState({}); // state to hold search parameters
  const [visiblePlaces, setVisiblePlaces] = useState(4); // state to hold number of visible places
  const [placesData, setPlacesData] = useState([]); // state to hold places data
  const [isMenuOpen, setIsMenuOpen] = useState(false); // state to toggle menu hamburger icon
  const [openModalId, setOpenModalId] = useState(null); // state to open modal

  const { places, isLoading, error } = usePlacesFetcher(params.place);

  const [dragItems, setDragItems] = useState([]); // state to hold drag and drop items

  // store places data in session storage so user can hit back button AND get data from session storage
  useEffect(() => {
    if (places && Array.isArray(places)) {
      setPlacesData(places);
      setDragItems(places);
      sessionStorage.setItem('placesData', JSON.stringify(places));
    } else {
      const storedPlacesData = sessionStorage.getItem('placesData');
      if (storedPlacesData) {
        const parsedData = JSON.parse(storedPlacesData);
        if (Array.isArray(parsedData)) {
          setPlacesData(parsedData);
          setDragItems(parsedData);
        }
      }
    }
  }, [places]);

  // helper functions
  // search function
  const handleSearch = (place) => {
    setParams({ place });
  };

  // show more function
  const handleShowMore = () => {
    setVisiblePlaces((prevVisiblePlaces) => prevVisiblePlaces + 4);
  };

  // get photo url
  const getPhotoUrl = (photoName) => {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoName}&key=${apiKey}`;
  };

  // format number and adding k to the view numbers
  const formatNumber = (num) => {
    return num > 1000 ? (num / 1000).toFixed(1) + 'k' : num;
  };

  // toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // open modal
  const handleOpenModal = (id) => {
    setOpenModalId(id);
  };

  // close modal
  const handleCloseModal = () => {
    setOpenModalId(null);
  };

  // drag and drop function
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    // drag and drop array sorting
    const reorderedItems = Array.from(dragItems); // Create a copy of the items array
    const [removed] = reorderedItems.splice(result.source.index, 1); // Remove the item from the original position
    reorderedItems.splice(result.destination.index, 0, removed); // Add the removed item to the new position

    setDragItems(reorderedItems); // Update the state with the new items order
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container mx-auto p-4 bg-pink-400">
        {/* search and filter */}
        <div className="grid grid-cols-1 mb-1 sm:grid-cols-2 gap-4 bg-blue-400">
          <div className="p-4">
            <FormItineraryPage onSearch={handleSearch} />
          </div>
          <div className="p-4">
            <div className='hidden md:flex'>
              {placesData.length === 0 ? null : <SearchAndFilter />}
            </div>
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-400 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
            {isMenuOpen && (
              <div className="md:hidden flex flex-col">
                <div className="flex flex-col space-y-2">
                  <div>
                    <SearchAndFilter />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 mb-1 lg:grid-cols-3 gap-4 bg-blue-400">
          {/* cards and Modals */}
          <div className="col-span-2">
            <div className="flex overflow-x-auto p-2 space-x-4">
              {isLoading && <p className='text-center text-xl font-bold pt-10 justify-center'>Loading<Loading /></p>}
              {error && <p>Error: {error.message}</p>}
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="flex">
                    {dragItems && Array.isArray(dragItems) && dragItems.slice(0, visiblePlaces).map((place, index) => (
                      <Draggable key={place.id} draggableId={place.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex-shrink-0 p-2 h-60"
                          >
                            <Card sx={{ maxWidth: 345, height: '100%', border: '1px solid black', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                              {place.photos && place.photos[0] && (
                                <CardMedia
                                  component="img"
                                  height="40"
                                  image={getPhotoUrl(place.photos[0].name)}
                                  alt={place.primaryTypeDisplayName?.text || 'Place Image'}
                                />
                              )}
                              <CardContent sx={{ flexGrow: 1, p: 1 }}>
                                <Typography variant="h5" component="div" className='text-center text-xl font-bold p-2'>
                                  {place.primaryTypeDisplayName?.text || 'No Type'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className="text-center mt-2">
                                  {place.displayName?.text || 'No Name'}
                                  <br />
                                  {place.regularOpeningHours?.openNow ? 'Open now' : 'Closed'}
                                  <br />
                                  {place.rating && <span>{place.rating} ⭐ ({formatNumber(place.userRatingCount)})</span>}
                                </Typography>
                              </CardContent>
                              <CardActions sx={{ p: 1 }}>
                                <button
                                  onClick={() => handleOpenModal(place.id)}
                                  className='btn btn-dark'
                                >
                                  More Details
                                </button>
                              </CardActions>
                            </Card>
                            {/* Modal */}
                            <Modal
                              open={openModalId === place.id}
                              onClose={handleCloseModal}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 1, maxWidth: 400, mx: 'auto', mt: 4 }}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                  {place.displayName?.text || 'No Name'}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                  It is a {place.primaryTypeDisplayName?.text || 'No Type'}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                  Place description: {place.editorialSummary?.text || 'No description available'}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                  Phone number: {place.nationalPhoneNumber || 'No phone number'}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                  Address: {place.formattedAddress || 'No address available'}
                                </Typography>
                                <Typography sx={{ mt: 2 }}>
                                  Children friendly: {place.goodForChildren ? 'Yes' : 'No'}
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                  <Button onClick={handleCloseModal} variant="contained" color="secondary" sx={{ mr: 2 }}>
                                    Close
                                  </Button>
                                  <Link to='/PlaceDetails' state={{ place }} style={{ textDecoration: 'none' }}>
                                    <button
                                      className='btn btn-dark'
                                    >
                                      More Details
                                    </button>
                                  </Link>
                                </Box>
                              </Box>
                            </Modal>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            {visiblePlaces < (placesData?.length || 0) && (
              <button
                onClick={handleShowMore}
                className='btn btn-dark p-2 mt-8'
              >
                Show more
              </button>
            )}
          </div>
          {/* map */}
          <div className="m-3">
            <div className="flex overflow-x-auto bg-red-500">
              <div className="flex-shrink-0 w-full h-60">
                {placesData.length === 0 ? null : <MapComponent state={placesData} />}
              </div>
            </div>
          </div>
        </div>
        <div className=''>< Chatbot /></div>
      </div>
    </DragDropContext>
  );
}

export default ItineraryPlanner;




































// import React, { useEffect, useState } from 'react';
// import FormItineraryPage from 'src/components/FormItineraryPage/FormItineraryPage';
// import usePlacesFetcher from 'src/Hooks/usePlacesFetcher';
// import Loading from 'src/components/Loading/Loading';
// import { Link } from 'react-router-dom';
// import SearchAndFilter from 'src/components/SearchAndFilter/SearchAndFilter';
// import { Card, CardContent, CardMedia, CardActions, Button, Typography, Modal, Box } from '@mui/material';
// import MapComponent from 'src/components/Map/MapComponent';
// import Chatbot from 'src/components/ChatBot/Chatbot';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// function ItineraryPlanner() {
//   const [params, setParams] = useState({}); // state to hold search parameters
//   const [visiblePlaces, setVisiblePlaces] = useState(4); // state to hold number of visible places
//   const [placesData, setPlacesData] = useState([]); // state to hold places data
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // state to toggle menu hamburger icon
//   const [openModalId, setOpenModalId] = useState(null); // state to open modal

//   const { places, isLoading, error } = usePlacesFetcher(params.place);

//   const [dragItems, setDragItems] = useState(places); // state to hold drag and drop items


//   // store places data in session storage so user can hit back button AND get data from session storage
//   useEffect(() => {
//     if (places) {
//       setPlacesData(places);
//       sessionStorage.setItem('placesData', JSON.stringify(places));
//     } else {
//       const storedPlacesData = sessionStorage.getItem('placesData');
//       if (storedPlacesData) {
//         setPlacesData(JSON.parse(storedPlacesData));
//         setDragItems(JSON.parse(storedPlacesData));
//       }
//     }
//   }, [places]);

//   // helper functions
//   // search function
//   const handleSearch = (place) => {
//     setParams({ place });
//   };

//   // show more function
//   const handleShowMore = () => {
//     setVisiblePlaces((prevVisiblePlaces) => prevVisiblePlaces + 4);
//   };

//   // get photo url
//   const getPhotoUrl = (photoName) => {
//     const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
//     return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoName}&key=${apiKey}`;
//   };
//   // format number and adding k to the view numbers
//   const formatNumber = (num) => {
//     return num > 1000 ? (num / 1000).toFixed(1) + 'k' : num;
//   };

//   // toggle menu
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   // open modal
//   const handleOpenModal = (id) => {
//     setOpenModalId(id);
//   };
//   // close modal
//   const handleCloseModal = () => {
//     setOpenModalId(null);
//   };

//   // drag and drop function
//   const onDragEnd = (result) => {
//     if (!result.destination){
//       return;
//     }

//   // drag and drop array sorting
//   const reorderedItems = Array.from(dragItems); // Create a copy of the items array
//   const [removed] = reorderedItems.splice(result.source.index, 1); // Remove the item from the original position
//   reorderedItems.splice(result.destination.index, 0, removed); // Add the removed item to the new position

//   setDragItems(reorderedItems); // Update the state with the new items order

//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>

//       <div className="container mx-auto p-4 bg-pink-400">

//         {/* search and filter */}
//         <div className="grid grid-cols-1 mb-1 sm:grid-cols-2 gap-4 bg-blue-400">
//           <div className=" p-4">
//             <FormItineraryPage onSearch={handleSearch} />
//           </div>
//           <div className=" p-4">
//             <div className='hidden md:flex'>
//               {placesData.length === 0 ? null : <SearchAndFilter />}
//             </div>
//             <div className="md:hidden">
//               <button onClick={toggleMenu} className="text-gray-400 focus:outline-none">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
//                 </svg>
//               </button>
//             </div>
//             {isMenuOpen && (
//               <div className="md:hidden flex flex-col">
//                 <div className="flex flex-col space-y-2">
//                   <div>
//                     <SearchAndFilter />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 mb-1 lg:grid-cols-3 gap-4 bg-blue-400">
          
//           {/* cards and Modals */}
//           <div className="col-span-2">
//             <div className="flex overflow-x-auto p-2 space-x-4">

//               {isLoading && <p className='text-center text-xl font-bold pt-10 justify-center'>Loading<Loading /></p>}
//               {error && <p>Error: {error.message}</p>}

//               {placesData && placesData.slice(0, visiblePlaces).map((place, index) => (

//                 <div key={index} className="flex-shrink-0 p-2 h-60">
                  
//                   {/* cards */}
//                   <Draggable key={place.id} draggableId={place.id} index={index}>
//                     {(provided) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                       >
//                         <Card sx={{ maxWidth: 345, height: '100%' ,border: '1px solid black', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//                         {place.photos && place.photos[0] && (
//                           <CardMedia
//                             component="img"
//                             height="40"
//                             image={getPhotoUrl(place.photos[0].name)}
//                             alt={place.primaryTypeDisplayName?.text || 'Place Image'}
//                           />
//                         )}
//                         <CardContent sx={{ flexGrow: 1, p: 1 }}> 
//                           <Typography variant="h5" component="div" className='text-center text-xl font-bold p-2'>
//                             {place.primaryTypeDisplayName?.text || 'No Type'}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary" className="text-center mt-2">
//                             {place.displayName?.text || 'No Name'}
//                             <br />
//                             {place.regularOpeningHours?.openNow ? 'Open now' : 'Closed'}
//                             <br />
//                             {place.rating && <span>{place.rating} ⭐ ({formatNumber(place.userRatingCount)})</span>}
//                           </Typography>
//                         </CardContent>
//                         <CardActions sx={{ p: 1 }}> 
//                           <button 
//                               onClick={() => handleOpenModal(place.id)}
//                               className='btn btn-dark'
//                             >
//                             More Details
//                           </button>
//                         </CardActions>
//                         </Card>
//                       </div>
//                     )}
//                       {provided.placeholder}

//                   </Draggable>
//                   {/* Modal */}
//                   <Modal
//                       open={openModalId === place.id}
//                       onClose={handleCloseModal}
//                       aria-labelledby="modal-modal-title"
//                       aria-describedby="modal-modal-description"
//                     >
//                       <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 1, maxWidth: 400, mx: 'auto', mt: 4 }}>
//                         <Typography id="modal-modal-title" variant="h6" component="h2">
//                           {place.displayName?.text || 'No Name'}
//                         </Typography>
//                         <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                           It is a {place.primaryTypeDisplayName?.text || 'No Type'}
//                         </Typography>
//                         <Typography sx={{ mt: 2 }}>
//                           Place description: {place.editorialSummary?.text || 'No description available'}
//                         </Typography>
//                         <Typography sx={{ mt: 2 }}>
//                           Phone number: {place.nationalPhoneNumber || 'No phone number'}
//                         </Typography>
//                         <Typography sx={{ mt: 2 }}>
//                           Address: {place.formattedAddress || 'No address available'}
//                         </Typography>
//                         <Typography sx={{ mt: 2 }}>
//                           Children friendly: {place.goodForChildren ? 'Yes' : 'No'}
//                         </Typography>
//                         <Box sx={{ mt: 2 }}>
//                           <Button onClick={handleCloseModal} variant="contained" color="secondary" sx={{ mr: 2 }}>
//                             Close
//                           </Button>
//                           <Link to='/PlaceDetails' state={{ place }} style={{ textDecoration: 'none' }}>
//                             <button
//                             className='btn btn-dark'
//                             >
//                               More Details
//                             </button>
//                           </Link>
//                         </Box>
//                       </Box>

//                   </Modal>

//                 </div>
//               ))}
//             </div>

//             {visiblePlaces < (placesData?.length || 0) && (
//               <button
//                 onClick={handleShowMore}
//                 className='btn btn-dark p-2 mt-8'
//               >
//                 Show more
//               </button>
//             )}

//           </div>

//           {/* map */}
//           <div className="m-3">
//             <div className="flex overflow-x-auto bg-red-500">
//               <div className="flex-shrink-0 w-full h-60">
//                 {placesData.length === 0 ? null : <MapComponent state={placesData} />}
//               </div>
//             </div>
//           </div>

//         </div>
        
//         <Droppable droppableId="droppable">

//           {(provided) => (
//             <div
//               className="grid grid-cols-1 mb-1 lg:grid-cols-2 gap-4 bg-blue-400"
//               ref={provided.innerRef}
//               {...provided.droppableProps}
//             >
//               <h1>Itinerary Planner</h1>
//               <h2>drag and drop  itinerary</h2>
//             </div>
//           )}

//           {/* <div className='grid grid-cols-1 mb-1 lg:grid-cols-2 gap-4 bg-blue-400'>
//             <h1>Itinerary Planner</h1>
//             <h2>drag and drop  itinerary</h2>
//           </div> */}
//         </Droppable>

//         <div className=''>< Chatbot /></div>
//       </div>

//     </DragDropContext>

//   );
// }

// export default ItineraryPlanner;

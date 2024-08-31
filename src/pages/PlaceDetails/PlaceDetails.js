import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../PlaceDetails/style/PlaceDetails.css';
import Maps3dView from 'src/components/Maps3dView/Maps3dView';

const PlaceDetails = () => {

    const location = useLocation();
    const  {place}  = location.state || {};
    const [visibleRivews, setVisibleReviews] = useState(4);

    if (!place) {
        return <div className="container mx-auto py-8 my-8 text-center text-lg">Place not found</div>;
    };

    // condition ? expressionIfTrue : expressionIfFalse
    // condition ? expressionIfTrue : expressionIfFalse ? expressionIfTrue : expressionIfFalse 


    const rating = (rate) => {
        const roundedRate = Math.round(rate);
            switch(roundedRate) {
                case 5:
                    return '⭐️⭐️⭐️⭐️⭐️';
                case 4:
                    return '⭐️⭐️⭐️⭐️';
                case 3:
                    return '⭐️⭐️⭐️';
                case 2:
                    return '⭐️⭐️';
                case 1:
                    return '⭐️';
                default:
                    return 'No rating';
            }
    };

    const handleShowMore = () => {
        setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 4);
    };

    const handlePublishTime = (time) => {
        const date = new Date(time);
        return date.toLocaleString();
    };
    
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* <div className="flex h-screen items-center justify-center bg-gradient-to-r from-orange-400 to-pink-500 p-8 bg-green-500 sm:flex-row">
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="w-32 h-32 bg-pink-400 flex items-center justify-center rounded-md">img</div>
                        <div className="w-32 h-32 bg-pink-400 flex items-center justify-center rounded-md">img</div>
                        <div className="w-32 h-32 bg-pink-400 flex items-center justify-center rounded-md">img</div>
                        <div className="w-32 h-32 bg-pink-400 flex items-center justify-center rounded-md">img</div>
                    </div>
                    <div className="m-4">
                        <div className="w-72 h-72 bg-pink-400 flex items-center justify-center rounded-md">img</div>
                    </div>
                </div> */}

                <div className="col-span-1 sm:col-span-2 p-4 m-4">
                    <Tabs>
                        <TabList className="text-lg p-4 font-bold">
                            <Tab>General</Tab>
                            <Tab>Contact</Tab>
                            <Tab>Description</Tab>
                            <Tab>Reviews</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="container mx-auto py-4">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="p-4 bg-white border border-gray-100 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                                        <p>Name: {place && place.displayName.text}</p>
                                        <p>Rating: {rating(place.rating)} {place.rating}</p>
                                        <p>Type: {place && place.primaryTypeDisplayName.text}</p>
                                    </div>
                                    <div className=" col-span-1 sm:col-span-2">
                                        <Maps3dView state={place.location} />
                                    </div>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="container mx-auto py-8">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="p-4 bg-white border border-gray-100 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                                        <p>Phone: {place.nationalPhoneNumber}</p>
                                        <p>International Phone: {place.internationalPhoneNumber}</p>
                                        <a 
                                            href={place.websiteUri}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-decoration-none text-black" 
                                        >
                                            Website: {place.websiteUri}
                                        </a>
                                        <p className="pt-3">Address: {place.formattedAddress}</p>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="container mx-auto py-8">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="p-4 bg-white border border-gray-100 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
                                        <p>{place && place.editorialSummary.text}</p>
                                        <p>Children Friendly: {place.childrenFriendly ? 'Yes' : 'No'}</p>
                                        <p>Restrooms: {place.restroom ? 'Yes' : 'No'}</p>
                                        <p>Wheelchair Accessible Entrance: {place.accessibilityOptions.wheelchairAccessibleEntrance ? 'Yes' : 'No'}</p>
                                        <p>Wheelchair Accessible Parking: {place.accessibilityOptions.wheelchairAccessibleParking ? 'Yes' : 'No'}</p>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="container mx-auto py-8">
                                <div className="justify-content-center">
                                    <ul>
                                        <li className="mb-4 text-lg font-bold">
                                            {place && place.reviews.slice(0, visibleRivews).map((review, index) => (
                                                <div key={index} className="bg-white border border-gray-100 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700 m-2">
                                                    <div className='flex'>
                                                        <img 
                                                            src={review.authorAttribution.photoUri} 
                                                            alt="profile" 
                                                            className="rounded-full w-8 h-8 mr-2"
                                                        />
                                                        <h1 className="text-lg font-bold">{review.authorAttribution.displayName}</h1>
                                                    </div>
                                                    <h2 className="mb-2 text-sm">{rating(review.rating)} {review.relativePublishTimeDescription}</h2>
                                                    <p className="text-lg">{review && review.text.text}</p>
                                                    <span className="text-sm">{handlePublishTime(review.publishTime)}</span>
                                                    <hr />
                                                    <br />
                                                </div>
                                            ))}
                                        </li>
                                    </ul>
                                    {visibleRivews < place.reviews.length && (
                                        <button 
                                            onClick={handleShowMore}
                                            className="bg-black text-white py-2 px-4 rounded-full text-sm"
                                        >
                                            Show more
                                        </button>
                                    )}
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default PlaceDetails;
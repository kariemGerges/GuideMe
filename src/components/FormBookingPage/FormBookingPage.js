import React, { useEffect, useState } from 'react';
import useFlightFetcher from 'src/Hooks/useFlightFetcher';

const FormBookingPage = ({ onSearch }) => {
  const [originLocation, setOriginLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [depTravelDates, setDepTravelDates] = useState('');
  const [adultsNumber, setAdultsNumber] = useState('');
  const [trigger, setTrigger] = useState(false);

  const { flights, isLoading, error } = useFlightFetcher(
    trigger ? originLocation : null,
    trigger ? destinationLocation : null,
    trigger ? depTravelDates : null,
    trigger ? adultsNumber : null
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!originLocation || !destinationLocation || !depTravelDates || !adultsNumber) {
      alert('Please fill in all fields');
      return;
    }
    onSearch(originLocation, destinationLocation, depTravelDates, adultsNumber);
    setTrigger(true);
  };

  useEffect(() => {
    if (flights) {
      setOriginLocation('');
      setDestinationLocation('');
      setDepTravelDates('');
      setAdultsNumber('');
      setTrigger(false);
    }
  }, [flights]);

  return (
    <div className="container mx-auto py-8 my-8">
      <form className="row g-3 needs-validation p-8 m-8" noValidate onSubmit={handleSubmit}>
        <div className="d-flex flex-wrap align-items-center p-4 gap-3">
          <div className="col-md-4">
            <label htmlFor="originLocation" className="form-label">Origin</label>
            <input
              type="text"
              className="form-control"
              id="originLocation"
              placeholder="From where?"
              value={originLocation}
              onChange={(e) => setOriginLocation(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="destinationLocation" className="form-label">Destination</label>
            <input
              type="text"
              className="form-control"
              id="destinationLocation"
              placeholder="Where to go?"
              value={destinationLocation}
              onChange={(e) => setDestinationLocation(e.target.value)}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="depTravelDates" className="form-label">From</label>
            <input
              type="date"
              className="form-control"
              id="depTravelDates"
              placeholder="From date"
              value={depTravelDates}
              onChange={(e) => setDepTravelDates(e.target.value)}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="adultsNumber" className="form-label">How many</label>
            <input
              type="number"
              className="form-control"
              id="adultsNumber"
              placeholder="Adult"
              value={adultsNumber}
              onChange={(e) => setAdultsNumber(e.target.value)}
              required
            />
          </div>
          <div className="col-md-12">
            <button
              className="btn btn-dark w-100"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Searching........' : 'Search'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormBookingPage;

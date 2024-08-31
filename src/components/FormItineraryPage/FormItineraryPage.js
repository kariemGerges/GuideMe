import { useState, useEffect } from 'react';
import usePlacesFetcher from '../../Hooks/usePlacesFetcher';

const FormItineraryPage = ({ onSearch}) => {

    const [place, setPlace] = useState('');
    const [trigger, setTrigger] = useState(false);

    const { places, isLoading, error } = usePlacesFetcher(trigger ? place : null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!place) {
          alert('Please fill in all fields');
          return;
        }
        onSearch(place);
        setTrigger(true);
    };

    useEffect(() => {
        if (places) {
          setPlace('');
          setTrigger(false);
        }
    }, [places]);


  return (
    <div className="container mx-auto p-2">
      <form className="row g-3 needs-validation pt-8 mt-8" noValidate onSubmit={handleSubmit}>
        
        <div className="d-flex flex-wrap p-2 gap-3">

          <div className="col-md-8">
            <label htmlFor="originLocation" className="form-label text-2xl">Where to</label>
            <input
              type="text"
              className="form-control"
              id="originLocation"
              placeholder="From where?"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              required
            />
          </div>

          <div className="pt-10">
            <button
              className="btn btn-dark"
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

export default FormItineraryPage;

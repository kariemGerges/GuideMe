


const SearchAndFilter = () => {
    return (
<div className="container mx-auto p-2 ">
      <form className="row g-3 needs-validation pt-8 mt-8" noValidate
    //    onSubmit={handleSubmit}
       >
        
        <div className="d-flex flex-wrap p-2 gap-3">

          <div className="col-md-3">
            <label htmlFor="originLocation" className="form-label text-2xl">Filters</label>
            <input
              type="text"
              className="form-control"
              id="originLocation"
              placeholder="From where?"
            //   value={place}
            //   onChange={(e) => setPlace(e.target.value)}
              required
            />
          </div>

          <div className="pt-10">
            <button
              className="btn btn-dark text-3xl"
              type="submit"
            //   disabled={isLoading}
            >
              {/* {isLoading ? 'Searching........' : 'Search'} */}
              Filter
            </button>
          </div>
        </div>
      </form>
    </div>
    )
}

export default SearchAndFilter;
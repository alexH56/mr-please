const VenueForm = ({ venues, handleVenue }) => {
  return (
    <form>
      <label>Venue: <select name='venue' onChange={(event) => handleVenue(event)}>
        <option value=''>- select venue -</option>
        {venues ? venues.map(venue => <option key={venue.name} value={venue.name}>{venue.name}</option>) : null}
      </select>
      </label>
    </form>
  );
};

export default VenueForm;

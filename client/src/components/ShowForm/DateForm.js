const DateForm = ({ handleDate }) => {
  return (
    <form>
      <label>Date: <input
        type='date'
        name='date'
        min='2020-02-01'
        max={new Date().toISOString().slice(0, 10)}
        onChange={(event) => handleDate(event)}
      />
      </label>
    </form>
  );
};

export default DateForm;

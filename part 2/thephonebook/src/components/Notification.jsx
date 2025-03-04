const Notification = ({ errorMessage, successMessage }) => {
  if (!errorMessage && !successMessage) {
    return null;
  }

  return (
    <>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
    </>
  );
};

export default Notification;

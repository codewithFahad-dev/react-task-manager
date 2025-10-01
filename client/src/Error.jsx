const Error = ({ errorCode }) => {
  return (
    <div className="error-container">
      <h1>
        {errorCode === 404
          ? "404 Error - Page not found"
          : "❌ Something went wrong"}
      </h1>
    </div>
  );
};

export default Error;

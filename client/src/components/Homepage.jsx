import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to My Website!</h1>
      <p>This is the landing page.</p>
      <Link to="/gallery">
        <button>Enter</button>
      </Link>
    </div>
  );
};

export default Homepage;

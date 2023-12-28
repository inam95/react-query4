import { Link, Outlet, useMatch } from "react-router-dom";

function App() {
  const isRootPath = useMatch({ path: "/", end: true });
  console.log("-------------");

  return (
    <div className="App">
      {!isRootPath ? (
        <Link to="/">Back to Issues List</Link>
      ) : (
        <span>&nbsp;</span>
      )}
      <h1>Issue Tracker</h1>
      <Outlet />
    </div>
  );
}

export default App;

import React from "react";
import { useRoutes, Link } from "react-router-dom";

// import pages
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";

function App() {
  // define routes
  let routes = useRoutes([
    { path: "/", element: <ShowCreators /> },
    { path: "/creator/:id", element: <ViewCreator /> },
    { path: "/add", element: <AddCreator /> },
    { path: "/edit/:id", element: <EditCreator /> },
  ]);

  return (
    <div className="App min-h-screen bg-gray-100 font-sans">
      <header className="py-8">
        <Link to="/">
          <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">
            Creatorverse
          </h1>
        </Link>
      </header>
      <main>
        {routes}
      </main>
    </div>
  );
}

export default App;
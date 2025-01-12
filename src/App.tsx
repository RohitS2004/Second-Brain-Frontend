import { Outlet } from "react-router-dom";

function App() {

  return (
    <div className="max-w-full min-h-screen">
      <main className="">
        <Outlet>

        </Outlet>
      </main>
    </div>
  )
}

export default App

// Side by side implement the light and dark theme
// First do the colo scheming for the application
// Do the Font Selection
// Work on the responsiveness
// Implement the dark mode toggler

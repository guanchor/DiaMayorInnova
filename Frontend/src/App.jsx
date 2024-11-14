import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import ClassGroupsList from "./components/class-group/ClassGroupList";
import AddClassGroup from "./components/class-group/AddClassGroup";
import ClassGroup from "./components/class-group/ClassGroup";
import { ResourceProvider } from "./services/resource";
import routes from "./services/Routes";

function App() {

  return (
    <ResourceProvider routes={routes}>
      <BrowserRouter>
        <Routes>
          <Route path="/class-list" element={<ClassGroupsList />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<AddClassGroup />} />
          <Route path="/class-list/:id" element={<ClassGroup />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ResourceProvider>
  )
}

export default App;

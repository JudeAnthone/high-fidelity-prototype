import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AssList from "./pages/AssList";
import AddTask from "./pages/AddTask";

const App = () => {
    return (
        <div className="min-h-screen bg-stone-50">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/assignments" element={<AssList />} />
                <Route path="/add-task" element={<AddTask />} />
            </Routes>
        </div>
    );
};

export default App;

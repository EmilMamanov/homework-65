import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationComponent from './components/NavigationComponent/NavigationComponent';
import PageComponent from './components/PageComponent/PageComponent';
import EditorComponent from './components/EditorComponent/EditorComponent';
import './App.css';

const App: React.FC = () => {
    const [selectedPage, setSelectedPage] = useState<string>(''); // Установка начального значения

    return (
        <Router>
            <div>
                <NavigationComponent />
                <Routes>
                    <Route
                        path="/pages/admin"
                        element={<EditorComponent selectedPage={selectedPage} setSelectedPage={setSelectedPage} />}
                    />
                    <Route path="/pages/:pageName" element={<PageComponent />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

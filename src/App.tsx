import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Navigation/>
                <Switch>
                    <Route path="/pages/admin" component={EditorComponent} />
                    <Route path="/pages/:pageName" component={PageComponent} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
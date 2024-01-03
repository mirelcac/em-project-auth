import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RegistrationForm } from '../components/registrationForm';
import { LoginForm } from '../components/loginForm';
import { AuthPageContent } from '../components/authPageContent';


export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/register" component={RegistrationForm} />
                <Route path="/login" component={LoginForm} />
                <Route path="/secrets" component={AuthPageContent} />
            </Switch>
        </Router>
    );
};

import { RegistrationForm } from './registrationForm';
import { LoginForm } from './loginForm';
import { LogoutButton } from './logoutButton';

export const MainWrapper = () => {
    return (
        <div>
            <h1>My App</h1>
            <RegistrationForm />
            <LoginForm />
            <LogoutButton />
        </div>
    );
};

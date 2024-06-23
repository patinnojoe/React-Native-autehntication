import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { LoadingOverlay } from '../components/ui';
import { login } from '../utils/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../utils/store/auth-context';

function LoginScreen() {
  const [isAuthenting, setisAuthenticating] = useState(false);
  const authContext = useContext(AuthContext);
  const signInHandler = async ({ email, password }) => {
    setisAuthenticating(true);
    try {
      const data = await login(email, password);
      authContext.authenticate(data.token);
      // console.log(data.token + 'is the authenticated user');
    } catch (error) {
      Alert.alert('Login Failed', 'Could not login, verify credentials and try again');
      console.log(error.message);
    }

    setisAuthenticating(false);
  };

  if (isAuthenting) {
    return <LoadingOverlay message="logining User..." />;
  }
  return <AuthContent isLogin onAuthenticate={signInHandler} />;
}

export default LoginScreen;

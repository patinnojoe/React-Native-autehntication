import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../utils/auth';
import { LoadingOverlay } from '../components/ui';
import { Alert } from 'react-native';
import { AuthContext } from '../utils/store/auth-context';

function SignupScreen() {
  const [isAuthenting, setisAuthenticating] = useState(false);
  const authContext = useContext(AuthContext);
  const signUpHandler = async ({ email, password }) => {
    setisAuthenticating(true);
    try {
      const data = await createUser(email, password);
      console.log('Created user data:', JSON.stringify(data, null, 2));
      authContext.authenticate(data.token);
    } catch (error) {
      Alert.alert('Something went wrong', 'Unable to create User at this time, please try again');
    }

    setisAuthenticating(false);
  };

  if (isAuthenting) {
    return <LoadingOverlay message="Creating User..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;

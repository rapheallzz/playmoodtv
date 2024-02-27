import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import playmood from '/PLAYMOOD_DEF.png';
import { toast } from 'react-toastify';
import { login, reset } from '../features/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
   
    console.log('Redux State:', user);
  console.log('isError:', isError);
  console.log('isSuccess:', isSuccess);
  console.log('user.role:', user && user.role);

    if (isError) {
      toast.error(message);
    }

    if  (isSuccess && user && user.role) {
      
      console.log('Redirecting to /dashboard');
      navigate('/dashboard');
    }
    
    dispatch(reset());
 
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onClick = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      await dispatch(login(userData));
      // Redirecting to '/dashboard' is handled in the useEffect when isSuccess is true
    } catch (error) {
      // You can handle specific error cases here if needed
      toast.error('An error occurred during login.');
    }
  };

  return (
    <LoginContainer>
      <Logo src={playmood} alt="Playmood Logo" />
      <Form>
        <h2>Login</h2>
        <Input
          type="text"
          placeholder="Enter email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Enter password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onClick} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
        <ForgotPasswordLink onClick={() => navigate('/forgot-password')}>
          Forgot password?
        </ForgotPasswordLink>
        <CreateAccountButton onClick={() => navigate('/register')}>
          Create an account
        </CreateAccountButton>
      </Form>
    </LoginContainer>
  );
};


const LoginContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Logo = styled.img`
  height: 100px;
  width: auto;
  margin-bottom: 20px;
`;

const Form = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #541011;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ForgotPasswordLink = styled.span`
  color: #541011;
  cursor: pointer;
  text-decoration: underline;
  display: block;
  text-align: center;
  margin-top: 10px;
`;

const CreateAccountButton = styled.button`
  color: #fff;
  background-color: #808080; /* Grey background color */
  border: none;
  border-radius: 4px;
  padding: 10px;
  width: 60%; 
  cursor: pointer;
  margin-top: 10px;
  margin-left:80px; 
  margin-right: auto; 
`;

export default Login;
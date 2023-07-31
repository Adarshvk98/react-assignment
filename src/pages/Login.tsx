import * as React from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginState {
  userId?: string;
  password?: string;
  isLoading: boolean;
}
export default function Login() {
  const [state, setState] = React.useState<LoginState>({
    userId: '',
    password: '',
    isLoading: false,
  });
  const nav = useNavigate();

  const handleInputChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLoginClick = () => {
    const { userId, password } = state;
    setState((prevState) => ({ ...prevState, isLoading: true }));
    fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userId,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(({ token }) => {
        setState((prevState) => ({ ...prevState, isLoading: false }));
        if (token != null && typeof token !== 'undefined') {
          localStorage.setItem('token', token);
          nav('/dashboard');
        }
      })
      .catch((error) => {
        console.log('error in fetch - ', error);
        setState((prevState) => ({ ...prevState, isLoading: false }));
      });
  };
  const { userId, password, isLoading } = state;
  return (
    <>
      <h1>App Title</h1>
      <div>
        <label>UserName :</label>
        <input
          type="text"
          name="userId"
          value={userId}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
      </div>
      {isLoading ? (
        'Loading...'
      ) : (
        <button onClick={handleLoginClick}>Login</button>
      )}
    </>
  );
}

import React from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

function Login() {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const [state, setState] = React.useState('login'); // or 'register'
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password
      });

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAuth', true);
        setUser(data.user);
        navigate('/');
        setShowUserLogin(false);
        toast.success(
          state === 'login' ? 'Logged in successfully!' : 'Account created successfully!'
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Something went wrong');
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{' '}
          {state === 'login' ? 'Login' : 'Sign Up'}
        </p>

        {state === 'register' && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="example@gmail.com"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="#Abcd@123"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>

        {state === 'register' ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setState('login')}
              className="text-primary cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{' '}
            <span
              onClick={() => setState('register')}
              className="text-primary cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer"
        >
          {state === 'register' ? 'Create Account' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;

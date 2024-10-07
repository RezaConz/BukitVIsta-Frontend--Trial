import React from "react";

interface LoginFormProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  handleSubmit,
  error,
}:LoginFormProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6 flex items-center justify-center flex-col'
    >
      <div className='flex flex-col'>
        <label htmlFor='username'>Username:</label>
        <input
          className='border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring focus:ring-blue-400'
          type='text'
          id='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='password'>Password:</label>
        <input
          className='border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:ring focus:ring-blue-400'
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type='submit'
        className='bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-200'
      >
        Login
      </button>
      {error && <p className='text-red-500'>{error}</p>}
    </form>
  );
};

export default LoginForm;

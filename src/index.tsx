import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import { QueryClient , QueryClientProvider} from 'react-query';
import axios, { AxiosError, AxiosInstance } from 'axios'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

axios.interceptors.response.use(undefined, function (error: AxiosError) {
  (error as any).originalMessage = error.message;
  Object.defineProperty(error, "message", { get: function () {
      if (!error.response) {
          return (error as any).originalMessage;
      }
      return JSON.stringify(error.response.data);
  }});
  return Promise.reject(error);
})


const queryClient = new QueryClient()
root.render(
  // <React.StrictMode>

  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

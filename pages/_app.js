import '../styles/globals.css'
import { AuthContextProvider, useAuth } from '../context/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      
      <Component {...pageProps} />
      
    </AuthContextProvider>

    
  )
}

export default MyApp


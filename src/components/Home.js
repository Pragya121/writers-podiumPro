import React from 'react'
import "./Home.css"
function Home() {
  const isLoading = React.useState(false);
  // const signedIn = React.useState(false);
  const [token, setToken] = React.useState(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );
  return (
    <div>Home</div>
  )
}

export default Home
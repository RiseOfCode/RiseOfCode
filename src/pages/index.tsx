import React from 'react';
import SignIn from './SignIn';
import Logo from './UI/Logo';
import SignUp from './SignUp';
import Link from 'next/link';
const Home = () => {
  // const navigate = useNavigate();
  // const navigateToSignIn = (url: string) => {
  //   navigate(url, { replace: true });
  // };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
    console.log('sign out');
  };

  return (
    <div>
      <Logo />
      <button
        onClick={handleSignOut}
        style={{ position: 'absolute', top: 0, right: 0 }}
      >
        Log out
      </button>
      {/*<SignUp />*/}
      <SignIn />
      <Link href="/somepage">
        <a>Go to some page</a>
      </Link>
      {/*<SomePage></SomePage>*/}
      {/*<Router>*/}
      {/*<Route path="/" element={SignIn} />*/}
      {/*<Route path="/somepage" element={SomePage} />*/}
      {/*</Router>*/}
    </div>
  );
};

export default Home;

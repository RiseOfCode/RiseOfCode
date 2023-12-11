import NextApp, { AppProps } from 'next/app';
import { AppDataContext } from 'src/client/ssr/appData';
import { AppData } from 'src/shared/types/app-data';
import { initializeFetch } from 'src/shared/utils/fetch';
import './styles/globals.css';

class App extends NextApp<AppProps> {
  appData: AppData;
  // authData: any;

  constructor(props: AppProps) {
    super(props);

    this.appData = props.pageProps.appData || {};
    // this.authData = props.pageProps.authData || {};

    initializeFetch(this.appData.basePath);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppDataContext.Provider value={this.appData}>
        <Component {...pageProps} />
        {/*<Component {...pageProps} authData={this.authData} />*/}
      </AppDataContext.Provider>
    );
  }
}

// App.getInitialProps = async (appContext) => {
//   const appProps = await NextApp.getInitialProps(appContext);
//
//   const authData =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTk4ODQ5MjIsImV4cCI6MTY5OTkyMDkyMn0.faSFDh_Mjr3mVXeif5UApTDhOKAMu85QnQwihBeOgNw';
//
//   return { ...appProps, authData };
// };

export default App;

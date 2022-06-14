import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { light } from '@themes/themes';
import { RecoilRoot } from 'recoil';
const SignUp = loadable(() => import('@pages/SignUp'));
const SignIn = loadable(() => import('@pages/SignIn'));
const Workspace = loadable(() => import('@layouts/Workspace'));
// const Home = loadable(() => import('@pages/Home'));
const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={light}>
        <Switch>
          <Redirect exact path={'/'} to={'/sign_in'} />
          <Route path="/sign_up" component={SignUp} />
          <Route path="/sign_in" component={SignIn} />
          <Route path="/workspace/:workspace/channel/:channel" component={Workspace} />
          <Route path="/workspace/:workspace/dm/:id" component={Workspace} />
          <Route path="/workspace/:workspace" component={Workspace} />
        </Switch>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;

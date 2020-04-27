import React, { Suspense } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch 
} from 'react-router-dom';

import Auth from '../src/user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { AuthContext} from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const UserHomeUnread = React.lazy(() => import ('./user/pages/UserHomeUnread'));
const UserHomeUpcomingTrades = React.lazy(() => import ('./user/pages/UserHomeUpcomingTrades'));
const UserHomeTierOne = React.lazy(() => import ('./user/pages/UserHomeTierOne'));
const UserHomeTierTwo = React.lazy(() => import ('./user/pages/UserHomeTierTwo'));
const UserHomeArchives = React.lazy(() => import ('./user/pages/UserHomeArchives'));
const TranscriptHomeExchanges = React.lazy(() => import ('./transcripts/pages/TranscriptHomeExchanges'));
const TranscriptHomeOpeningStatements = React.lazy(() => import ('./transcripts/pages/TranscriptHomeOpeningStatements'));
const TranscriptHomeFullTranscript = React.lazy(() => import ('./transcripts/pages/TranscriptHomeFullTranscript'));
const TranscriptHomePrimaryEvidence = React.lazy(() => import ('./transcripts/pages/TranscriptHomePrimaryEvidence'));
const TranscriptHomeGuidanceVersusConsensus = React.lazy(() => import ('./transcripts/pages/TranscriptHomeGuidanceVersusConsensus'));
const TranscriptHomePastEvents = React.lazy(() => import ('./transcripts/pages/TranscriptHomePastEvents'));
const TranscriptHomeReactionEvaluation = React.lazy(() => import ('./transcripts/pages/TranscriptHomeReactionEvaluation'));
const TranscriptHomeSentiment = React.lazy(() => import ('./transcripts/pages/TranscriptHomeSentiment'));
const TranscriptHomeTendencies = React.lazy(() => import ('./transcripts/pages/TranscriptHomeTendencies'));
const TranscriptHomeTradeSubmission = React.lazy(() => import ('./transcripts/pages/TranscriptHomeTradeSubmission'));

const App = () => {
  const { token, login, logout, userId, username } = useAuth();
  
  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path={`/users/${username}/unread`} exact>
          <UserHomeUnread />
        </Route>
        <Route path={`/users/${username}/upcoming-trades`} exact>
          <UserHomeUpcomingTrades/>
        </Route>
        <Route path={`/users/${username}/tier-one`} exact>
          <UserHomeTierOne/>
        </Route>
        <Route path={`/users/${username}/tier-two`} exact>
          <UserHomeTierTwo/>
        </Route>
        <Route path={`/users/${username}/archives`} exact>
          <UserHomeArchives/>
        </Route>
        <Route path={`/users/${username}/transcripts/:transcriptId/exchanges`} exact>
          <TranscriptHomeExchanges />
        </Route>
        <Route path={`/users/${username}/transcripts/:transcriptId/opening-statements`} exact>
          <TranscriptHomeOpeningStatements />
        </Route>
        <Route path={`/users/${username}/transcripts/:transcriptId/full-transcript`} exact>
          <TranscriptHomeFullTranscript />
        </Route>
        <Route path={`/users/${username}/transcripts/:transcriptId/primary-evidence`} exact>
          <TranscriptHomePrimaryEvidence />
        </Route>
        <Route path={`/users/${username}/transcripts/:transcriptId/guidance-versus-consensus`} exact>
          <TranscriptHomeGuidanceVersusConsensus />
        </Route>
        <Route path={`/users/${username}/transcripts/:transcriptId/past-events`} exact>
          <TranscriptHomePastEvents />
        </Route>
        <Route path={`/users/${username}/transcripts/:transcriptId/reaction-evaluation`} exact>
          <TranscriptHomeReactionEvaluation />
        </Route>
        <Route path={`/users/${username}/transcripts/:transcriptId/sentiment`} exact>
          <TranscriptHomeSentiment />
        </Route>
        <Route path={`/users/${username}/transcripts/:transcriptId/tendencies`} exact>
          <TranscriptHomeTendencies />
        </Route>
        <Route path={`/users/${username}/transcripts/:transcriptId/trade-submission`} exact>
          <TranscriptHomeTradeSubmission />
        </Route>
        <Redirect to={`/users/${username}/unread`} exact />
      </Switch>

    );
  } else {
    routes = (
      <Switch>
        <Route path="/login" exact>
          <Auth />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider 
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        username: username,
        login: login, 
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense 
          fallback={
            <div className="center">
              <LoadingSpinner />
              </div>
            }
            >
              {routes}
              </Suspense>
            </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
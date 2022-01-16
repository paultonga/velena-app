/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './src/navigation/Navigator';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  concat,
  createHttpLink,
} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Types} from './src/redux/user/actions';

const API_URL = 'https://velena-graphql-api.herokuapp.com/graphql';

const httpLink = new createHttpLink({uri: API_URL});

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message, locations, path}) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const loggerLink = new ApolloLink((operation, forward) => {
  console.log(`GraphQL Request: ${operation.operationName}`);
  operation.setContext({start: new Date()});
  return forward(operation).map(response => {
    const responseTime = new Date() - operation.getContext().start;
    console.log(`GraphQL Response took: ${responseTime}`);
    if (responseTime >= 10000) {
      //show poor network notification
    }

    return response;
  });
});

const authMiddleware = new ApolloLink(async (operation, forward) => {
  const token = store.getState().account.sessionToken;
  operation.setContext(({headers = {}}) => ({
    headers: {
      ...headers,
      authorization: token,
    },
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink, loggerLink, errorLink),
  cache: new InMemoryCache(),
});

export const navigationRef = React.createRef();

PushNotification.configure({
  onNotification: function (notification) {
    PushNotification.setApplicationIconBadgeNumber(1);
    store.dispatch({
      type: Types.NOTIFICATION_RECEIVED,
      // payload: {
      //   isRead: false,
      //   message: notification.message,
      //   title: notification.title,
      // },
    });
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  popInitialNotification: true,
});

class App extends React.Component {
  componentDidMount() {
    PushNotificationIOS.addEventListener('notification', notification => {
      //console.log('{NOTIF RECEIVED::', notification);
    });

    PushNotificationIOS.addEventListener('register', notification => {
      //console.log('{NOTIF REG::', notification);
    });
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer ref={navigationRef}>
              <AppNavigator />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;

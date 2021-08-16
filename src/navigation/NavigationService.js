import {navigationRef} from '../../App';
import {StackActions} from '@react-navigation/native';

const navigate = (routeName, params) => {
  navigationRef.current?.navigate(routeName, params);
};

const replace = (routeName, params) => {
  navigationRef.current?.dispatch(StackActions.replace(routeName, params));
};

const pop = ({n = 1}) => {
  navigationRef.current?.dispatch(StackActions.pop({n}));
};

export default {
  navigate,
  replace,
  pop,
};

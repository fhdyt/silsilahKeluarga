import createDataContext from './createDataContext';
import serverApi from '../api/server';
import { navigate } from '../navigationRef';

const memberReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_member':
      return action.payload;
    default:
      return state;
  }
};

const add_member = dispatch => async ({ name, id }, callback) => {
  try {
    const response = await serverApi.post('/person', { name, pid: id});
    if (callback) {
      callback();
      navigate('DetailFamily');
    }
    navigate('DetailFamily');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong'
    });
  }
};

const fetchMember = dispatch => async ({id}) => {
  console.log(id);
  const response = await serverApi.get(`/family/${id}`);
  dispatch({ type: 'fetch_member', payload: response.data });
};

export const { Provider, Context } = createDataContext(
  memberReducer,
  { add_member, fetchMember },
  []
);

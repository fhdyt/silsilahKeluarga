import createDataContext from './createDataContext';
import serverApi from '../api/server';
import { navigate } from '../navigationRef';

const memberReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_family':
      return action.payload;
    default:
      return state;
  }
};

const add_member = dispatch => async ({ id, name, address, birthdate, gender, diedate, tags }, callback) => {
  if(tags === true){
    tags = 'assistant'
  }
  else{
    tags = ''
  }
  console.log({ id, name, address, birthdate, gender, diedate, tags })

  try {
    console.log("Simpan Context")
    const response = await serverApi.post('/person', { pid: id, name, address, birthdate, gender, diedate, tags });
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

const fetchFamily = dispatch => async () => {
  const response = await serverApi.get('/person');
  dispatch({ type: 'fetch_family', payload: response.data});
};

export const { Provider, Context } = createDataContext(
  memberReducer,
  { add_member, fetchFamily },[]
);

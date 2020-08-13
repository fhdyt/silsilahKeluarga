import createDataContext from './createDataContext';
import serverApi from '../api/server';
import { navigate } from '../navigationRef';

const memberReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_family':
      return action.payload;
    case 'deleteMember':
      return state.filter((p) => p._id !== action.payload);
    case 'add_member':
      return [...state, action.payload];
    case 'edit_member':
      return [...state, action.payload];
    default:
      return state;
  }
};

const fetchFamily = dispatch => async () => {
  console.log("ambil data")
  const response = await serverApi.get('/person');
  dispatch({ type: 'fetch_family', payload: response.data});
};

const add_member = dispatch => async ({ id, name, address, birthdate, gender, diedate, tags}, callback) => {
  if(tags === true){
    tags = 'assistant'
  }
  else{
    tags = ''
  }
  try {
    const response = await serverApi.post('/person', { pid: id, name, address, birthdate, gender, diedate, tags });
    dispatch({ type: 'add_member', payload: response.data});
    if(callback){
      callback()
    }
  } catch (err) {
    console.log(err)
  }
};

const edit_member = dispatch => async ({ _id, id, pid, name, address, birthdate, gender, diedate, tags}, callback) => {
  if(tags === true){
    tags = 'assistant'
  }
  else{
    tags = ''
  }
  try {
    console.log("edit")
    const response = await serverApi.put('/person', { _id, id, pid, name, address, birthdate, gender, diedate, tags });
    if(callback){
      callback()
    }
  } catch (err) {
    console.log(err)
  }
};

const deleteMember = dispatch => async (_id) => {
    const response = await serverApi.delete(`/person/${_id}`);
    dispatch({ type: 'deleteMember', payload: _id});
    navigate('DetailFamily');
};

export const { Provider, Context } = createDataContext(
  memberReducer,
  { add_member, edit_member, fetchFamily, deleteMember },[]
);

import createDataContext from './createDataContext';
import serverApi from '../api/server';
import { navigate } from '../navigationRef';

const memberReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_family':
      return {personData:action.payload};
    case 'deleteMember':
      return {
        ...state,
        personData: state.personData.filter(
          personData => personData._id !== action.payload
        )
      };
    case 'add_member':
      return {...state, personData:[...state.personData ,action.payload]};
    case 'edit_member':
      return {...state.personData.map(personD => {
        return personD._id === action.payload._id ? action.payload : personD;
      })}
    case 'info_family':
      return {...state, info:action.payload};
    default:
      return state;
  }
};

const fetchFamily = dispatch => async () => {
  console.log("ambil data")
  const response = await serverApi.get('/person');
  dispatch({ type: 'fetch_family', payload: response.data});
};

const infoFamily = dispatch => async () => {
  console.log("ambil data")
  const response = await serverApi.get('/info');
  dispatch({ type: 'info_family', payload: response.data});
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
    const _tags = [tags]
    const personUpdate = { _id, id, pid, name, address, birthdate, gender, diedate,_tags};
    const response = await serverApi.put('/person', { _id, id, pid, name, address, birthdate, gender, diedate, tags });
    //dispatch({ type: 'edit_member', payload: personUpdate});
    // if(callback){
    //   callback()
    // }
  } catch (err) {
    console.log(err)
  }
};

const deleteMember = dispatch => async (_id, callback) => {
    const response = await serverApi.delete(`/person/${_id}`);
    dispatch({ type: 'deleteMember', payload: _id});
    if(callback){
      callback()
    }
};

export const { Provider, Context } = createDataContext(
  memberReducer,
  { add_member, 
    edit_member, 
    fetchFamily, 
    deleteMember,
    infoFamily
   },{
     info:[],
     personData:[]
   }
);

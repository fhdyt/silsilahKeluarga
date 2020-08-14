import createDataContext from './createDataContext';
import serverApi from '../api/server';
import { navigate } from '../navigationRef';

const memberReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_family':
      return {personData:action.payload, info:action.info, errorBanner: false, loading:false};
    case 'errorBanner':
      return { ...state, errorBanner: action.payload };
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
      const updatePerson = action.payload;
      const updatePersons = state.personData.map(person => {
        if (person._id === updatePerson._id) {
          return updatePerson;
        }
        return person;
      });
        return {
          ...state,
          personData: updatePersons
        };
    default:
      return state;
  }
};

const fetchFamily = dispatch => async () => {
  console.log("FetchingData")
  try{
    const info_response = await serverApi.get('/info');
    const response = await serverApi.get('/person');
    dispatch({ type: 'fetch_family', payload: response.data, info:info_response.data});    
  } catch(err){
    dispatch({
      type: 'errorBanner',
      payload: true
    });
  }
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
    console.log("Edit Member")
    const _tags = [tags]
    const response = await serverApi.put('/person', { _id, id, pid, name, address, birthdate, gender, diedate, tags });
    dispatch({ type: 'edit_member', payload: { _id, id, pid, name, address, birthdate, gender, diedate, _tags}});
    if(callback){
      callback()
    }
  } catch (err) {
    console.log(err)
  }
};

const deleteMember = dispatch => async (_id, callback) => {
    console.log("Delete Member")
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
    deleteMember
   },{
     info:[],
     personData:[],
     errorBanner:false,
     loading:true
   }
);

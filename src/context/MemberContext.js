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
        ), errorBanner: false
      };
    case 'add_member':
      return {...state, personData:[...state.personData ,action.payload], errorBanner: false};
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
          personData: updatePersons , errorBanner: false
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
    dispatch({ type: 'errorBanner', payload: true });
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
    navigate('Home')
    dispatch({ type: 'errorBanner', payload: true });
  }
};

const edit_member = dispatch => async ({ _id, id, pid, name, address, birthdate, gender, diedate, tags_status}, callback) => {
  if(tags_status === true){
    tagss = 'assistant'
    tags_server = 'assistant'
  }
  else{
    tagss = ['']
    tags_server = ''
  }
  try {
    console.log("Edit Member")
    const tags = [tagss]
    console.log({ _id, id, pid, name, address, birthdate, gender, diedate, tags})
    const response = await serverApi.put('/person', { _id, id, pid, name, address, birthdate, gender, diedate, tags:tags_server });
    dispatch({ type: 'edit_member', payload: { _id, id, pid, name, address, birthdate, gender, diedate, tags}});
    if(callback){
      callback()
    }
  } catch (err) {
    navigate('Home')
    dispatch({ type: 'errorBanner', payload: true });
  }
};

const deleteMember = dispatch => async (_id, callback) => {
    console.log("Delete Member")
    try{
      const response = await serverApi.delete(`/person/${_id}`);
      dispatch({ type: 'deleteMember', payload: _id});
      if(callback){
        callback()
      }
    } catch(err){
      navigate('Home')
      dispatch({ type: 'errorBanner', payload: true });
    }
    
};

export const { Provider, Context } = createDataContext(
  memberReducer,
  { add_member, 
    edit_member, 
    fetchFamily, 
    deleteMember
   },{
     info:[{jumlah:0, pria:0, wanita:0, meninggal:0}],
     personData:[],
     errorBanner:false,
     loading:true
   }
);

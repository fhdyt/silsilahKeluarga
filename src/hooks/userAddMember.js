import { useContext } from 'react';
import { Context as MemberContext } from '../context/MemberContext';
import { navigate } from '../navigationRef';

export default () => {
  const { addMember } = useContext(MemberContext);
  const {
    state: { locations, name },
    reset
  } = useContext(LocationContext);

  const saveTrack = async () => {
    await addMember(name, locations);
    reset();
    navigate('DetailFamily');
  };

  return [saveTrack];
};

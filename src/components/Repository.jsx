import { useParams } from 'react-router-native';

import useRepository from '../hooks/useRepository';
import { RepositoryItemContainer } from "./RepositoryItem";

const Repository = () => {
  const id = useParams().id;
  const { repository } = useRepository(id);
 
  return (
    <RepositoryItemContainer item={repository} showUrl/>
  )
}

export default Repository;
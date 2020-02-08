import { preloadQuery } from 'react-relay/hooks';
import Environment from './Environment';

const prepareQuery = (query, variables = {}) => ({ query: preloadQuery(Environment, query, variables) });

export default prepareQuery;

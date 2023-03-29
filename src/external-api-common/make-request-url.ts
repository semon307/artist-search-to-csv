import { REQUEST_METHOD } from './request-method';
import { Entity } from './entity';
import { FORMAT_QUERY } from './format-query';
import { API_KEY_QUERY } from './api-key-query';

export const makeRequestUrl = (
  query: string,
  method: REQUEST_METHOD = REQUEST_METHOD.ARTIST_SEARCH,
  entity: Entity = Entity.Artist,
  apiKey: string = API_KEY_QUERY,
  format: FORMAT_QUERY = FORMAT_QUERY.JSON,
): string => `?method=${method}&${entity}=${query}&api_key=${apiKey}${format}`;

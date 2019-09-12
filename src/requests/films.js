const apiKey = '1977b733';
const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}`;

const defaultRequestOptions = {
  method: 'GET',
  headers: {
    "Accept": "application/json"
  },
};

const processRawResponse = rawResponse => {
  const {status, statusText} = rawResponse;
  return status && status === 200
      ? Promise.resolve(rawResponse.json())
      : Promise.reject(`${status} error: ${statusText}`)
};

const processResponse = response => response.Error
    ? Promise.reject(response.Error)
    : Promise.resolve(response);


const fetchOneById = id => fetch (
    `${baseUrl}&i=${id}`,
    defaultRequestOptions
)
    .then(processRawResponse)
    .then(processResponse);

const fetchFilmsByQuery = queryString => fetch(
    `${baseUrl}&${queryString}`,
    defaultRequestOptions
)
    .then(processRawResponse)
    .then(processResponse);

export const fetchFilms = fetchFilmsByQuery;
export const fetchById = fetchOneById;


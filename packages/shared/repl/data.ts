import faker from 'faker';
import retro from 'retro-game-names';
import axios from 'axios';
import fs from 'fs';

faker.locale = 'pt_BR';

const { name, address, company, commerce, random } = faker;

const PROPERTY_MAP = {
  name: 'nome do usuário',
  age: 'idade',
  city: 'cidade',
  state: 'estado',
  favoriteMovie: 'filme predileto',
  favoriteGame: 'jogo predileto',
  favoriteColor: 'cor predileta',
  company: 'empresa que trabalha',
  gender: 'gênero'
}

const createUser = async () => {
  const movieId = random.number({ min: 2155500, max: 2155529 }).toString();
  const { data } = await axios.get(`http://www.omdbapi.com/?i=tt${movieId}&apikey=84cc8330`);

  return {
    name: name.findName(),
    age: random.number({
      min: 15,
      max: 40
    }),
    city: address.city(),
    state: address.state(),
    company: company.companyName(),
    favoriteColor: commerce.color(),
    favoriteMovie: data.Title,
    favoriteGame: retro.random().title,
    gender: random.arrayElement(['Masculino', 'Feminino']),
  }
};

const formatRows = (data) => [...Object.entries(data).map(([key, value]) => `${PROPERTY_MAP[key]}: ${value}`), '\n'].join('\n');

const createdFormattedUser = async () => {
  const user = await createUser();
  const formattedUser = formatRows(user);
  await new Promise((resolve, reject) => {
    fs.appendFile('users.in', formattedUser, (err) => {
      if (err) reject(err);
      resolve();
    })
  })
}

const createAllUsers = async () => {
  for await (const i of new Array(900)){
    await createdFormattedUser();
  }
}

(async () => createAllUsers())();


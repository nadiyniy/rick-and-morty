import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
});

export const getCharacter = async (page: number) => {
    const { data } = await instance.get(`/character/?page=${page}`);
    return data;
};

export const getCharacterFilter = async (name = '', status = '', species = '', gender = '', page = 1) => {
    const { data } = await instance.get(
        `/character/?page=${page}&name=${name}&status=${status}&gender=${gender}&species=${species}`
    );
    return data;
};

import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
});

export const getCharacter = async () => {
    try {
        const { data } = await instance.get('/character');
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getCharacterFilter = async (
    name: any = '',
    status: any = '',
    species: any = '',
    gender: any = '',
    page: any = 1
) => {
    try {
        const { data } = await instance.get(
            // `/character/?page=${page}&name=${name}&status=${status}&gender=${gender}&species=${species}`
            `/character/?page=${page}&name=${name}&status=${status}&gender=${gender}&species=${species}`
        );
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

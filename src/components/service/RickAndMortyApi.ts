import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/',
});

export const getCharacter = async () => {
    try {
        const { data } = await instance.get('character');
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

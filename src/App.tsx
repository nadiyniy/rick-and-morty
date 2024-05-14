import { useState, useEffect } from 'react';

import { CharacterCard, CharacterModal, CustomSelect } from './components';

import { Character } from './types/types';
import { getCharacter, getCharacterFilter } from './service/RickAndMortyApi';
import { genderOptions, speciesOptions, statusOptions } from './data/rickAndMortyOptions';

const App = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [gender, setGender] = useState('');
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

    useEffect(() => {
        getCharacter(page).then((response) => {
            setCharacters(response.results);
            setCharacters(response.results);
        });
    }, [page]);

    const sortCharacters = (characters: Character[]) => {
        return characters.slice().sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (nameA > nameB) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page >= 2) setPage(page - 1);
    };

    const handleCharacterClick = (character: Character) => {
        setSelectedCharacter(character);
    };

    const handleCloseModal = () => {
        setSelectedCharacter(null);
    };

    const handleOnclickSearch = () => {
        setError('');
        getCharacterFilter(name, status, species, gender, page)
            .then((response) => {
                setFilteredCharacters(response.results);
            })
            .catch((error) => setError(error));
    };

    const handleSortChange = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const onStatusChange = (selectedOption: string) => {
        setPage(1);
        setStatus(selectedOption);
    };
    const onGenderChange = (selectedOption: string) => {
        setPage(1);
        setGender(selectedOption);
    };
    const onSpeciesChange = (selectedOption: string) => {
        setPage(1);
        setSpecies(selectedOption);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl text-center font-bold my-8">Rick and Morty Characters</h1>
            <div className="flex flex-wrap mb-8 justify-center items-center gap-0.5">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                    className="min-w-48 border border-gray-300 rounded-md px-4 py-2"
                />
                <CustomSelect nameOption={'status'} options={statusOptions} onSelect={onStatusChange} />
                <CustomSelect nameOption={'gender'} options={genderOptions} onSelect={onGenderChange} />
                <CustomSelect nameOption={'species'} options={speciesOptions} onSelect={onSpeciesChange} />
                <button
                    className="min-w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleOnclickSearch}
                >
                    Search
                </button>
                <button
                    className="min-w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSortChange}
                >
                    {`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                </button>
            </div>
            <div className="flex justify-between">
                <button
                    disabled={page === 1 || filteredCharacters.length !== 0}
                    className="min-w-48 bg-blue-500 disabled:bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handlePrevPage}
                >
                    Previous Page
                </button>
                <button
                    disabled={filteredCharacters.length !== 0}
                    className="min-w-48 bg-blue-500 disabled:bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNextPage}
                >
                    Next Page
                </button>
            </div>

            {error ? (
                <p className="text-center">Not found</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {(filteredCharacters.length ? sortCharacters(filteredCharacters) : sortCharacters(characters)).map(
                        (character: Character) => (
                            <CharacterCard
                                key={character.id}
                                character={character}
                                onClick={() => handleCharacterClick(character)}
                            />
                        )
                    )}
                </div>
            )}
            {selectedCharacter && <CharacterModal character={selectedCharacter} onClose={handleCloseModal} />}
        </div>
    );
};

export default App;

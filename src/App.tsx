import { useState, useEffect } from 'react';
import CharacterCard from './components/CharacterCard';
import CharacterModal from './components/CharacterModal';
import { getCharacter, getCharacterFilter } from './components/service/RickAndMortyApi';
import CustomSelect from './components/Select';

const statusOptions = [
    { value: '', label: 'All status' },
    { value: 'alive', label: 'Alive' },
    { value: 'dead', label: 'Dead' },
    { value: 'unknown', label: 'Unknown' },
];

const genderOptions = [
    { value: '', label: 'All gender' },
    { value: 'Female', label: 'Female' },
    { value: 'Male', label: 'Male' },
    { value: 'Genderless', label: 'Genderless' },
    { value: 'unknown', label: 'Unknown' },
];

const speciesOptions = [
    { value: '', label: 'All species' },
    { value: 'human', label: 'Human' },
    { value: 'alien', label: 'Alien' },
    { value: 'humanoid', label: 'Humanoid' },
    { value: 'poopybutthole', label: 'Poopybutthole' },
    { value: 'mythological', label: 'Mythological' },
    { value: 'unknown', label: 'Unknown' },
    { value: 'animal', label: 'Animal' },
    { value: 'disease', label: 'Disease' },
    { value: 'robot', label: 'Robot' },
    { value: 'cronenberg', label: 'Cronenberg' },
    { value: 'planet', label: 'Planet' },
];

const App = () => {
    const [characters, setCharacters] = useState([]);
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [gender, setGender] = useState('');
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState('');

    const [selectedCharacter, setSelectedCharacter] = useState(null);

    useEffect(() => {
        getCharacter().then((response) => {
            setCharacters(response.results);
        });
    }, []);
    useEffect(() => {}, []);

    const handleCharacterClick = (character: any) => {
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
                <CustomSelect
                    nameOption={'status'}
                    options={statusOptions}
                    onSelect={(selectedOption: any) => setStatus(selectedOption)}
                />
                <CustomSelect
                    nameOption={'gender'}
                    options={genderOptions}
                    onSelect={(selectedOption: any) => setGender(selectedOption)}
                />
                <CustomSelect
                    nameOption={'species'}
                    options={speciesOptions}
                    onSelect={(selectedOption: any) => setSpecies(selectedOption)}
                />
                <button
                    className="min-w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleOnclickSearch}
                >
                    Search
                </button>
            </div>
            {error ? (
                <p className="text-center">Not found</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {(filteredCharacters.length ? filteredCharacters : characters).map((character: any) => (
                        <CharacterCard
                            key={character.id}
                            character={character}
                            onClick={() => handleCharacterClick(character)}
                        />
                    ))}
                </div>
            )}
            {selectedCharacter && <CharacterModal character={selectedCharacter} onClose={handleCloseModal} />}
        </div>
    );
};

export default App;

import { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from './components/CharacterCard';
import CharacterModal from './components/CharacterModal';
import { getCharacter } from './components/service/RickAndMortyApi';

const App = () => {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    useEffect(() => {
        getCharacter().then((response) => {
            console.log('====================================');
            console.log(response);
            console.log('====================================');
            setCharacters(response.results);
        });
    }, []);

    const handleCharacterClick = (character: any) => {
        setSelectedCharacter(character);
    };

    const handleCloseModal = () => {
        setSelectedCharacter(null);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold my-8 еуче">Rick and Morty Characters</h1>
            <div className="grid grid-cols-3 gap-4">
                {characters.map((character: any) => (
                    <CharacterCard
                        key={character.id}
                        character={character}
                        onClick={() => handleCharacterClick(character)}
                    />
                ))}
            </div>
            {selectedCharacter && <CharacterModal character={selectedCharacter} onClose={handleCloseModal} />}
        </div>
    );
};

export default App;

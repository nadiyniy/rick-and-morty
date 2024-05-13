const CharacterCard = ({ character, onClick }: any) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg cursor-pointer" onClick={onClick}>
            <img src={character.image} alt={character.name} className="w-full h-auto mb-2" />
            <div className="text-lg font-bold">{character.name}</div>
            <div>Status: {character.status}</div>
            <div>Species: {character.species}</div>
            <div>Gender: {character.gender}</div>
        </div>
    );
};

export default CharacterCard;

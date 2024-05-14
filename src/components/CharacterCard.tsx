import { CharacterCardProps } from '../types/types';

const CharacterCard = ({ character, onClick }: CharacterCardProps) => {
    return (
        <div className="relative first-line:relative bg-gray-100 p-4  rounded-lg cursor-pointer" onClick={onClick}>
            <div
                className={`absolute top-2 right-2 ${character.status === 'Alive' ? 'bg-green-500' : character.status === 'Dead' ? 'bg-red-500' : 'bg-yellow-500'} py-1 px-1.5 rounded`}
            >
                {character.status}
            </div>
            <img width={160} height={160} src={character.image} alt={character.name} className="w-full h-auto mb-2" />
            <div className="text-lg text-center font-bold">{character.name}</div>
        </div>
    );
};

export default CharacterCard;

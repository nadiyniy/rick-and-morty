import { useEffect } from 'react';

const CharacterModal = ({ character, onClose }: any) => {
    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.body.classList.add('modal-open');
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.classList.remove('modal-open');
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleBackdropClick = (event: any) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50"
            onClick={(e) => handleBackdropClick(e)}
        >
            <div className="bg-white p-8 rounded-lg max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{character.name}</h2>
                    <button onClick={onClose}>&times;</button>
                </div>
                <img src={character.image} alt={character.name} className="w-full h-auto mb-4" />
                <div>Status: {character.status}</div>
                <div>Species: {character.species}</div>
                <div>Gender: {character.gender}</div>
            </div>
        </div>
    );
};

export default CharacterModal;

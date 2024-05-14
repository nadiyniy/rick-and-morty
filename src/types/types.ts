export type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
};

export type CharacterCardProps = { character: Character; onClick: () => void };

export type CharacterModalProps = { character: Character; onClose: () => void };

export type Option = { value: string; label: string };

export type CustomSelectProps = { options: Option[]; onSelect: (value: string) => void; nameOption: string };

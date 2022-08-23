import { useState } from 'react';
import Items, { Item } from '../types/Item.type';
import Metadata from '../types/Metadata.type';
import TraitFilters from '../types/Trait.type';

export default function useItems<T extends Item>(
    items: Items<T>,
    traits: TraitFilters,
): [Items<T>, (trait_type: string, value: string) => void, () => void] {
    const [_, setMetadata] = useState<Metadata<T>>(new Metadata(items, traits));
    const [filteredItems, setItems] = useState<Items<T>>(items);

    const toggleTrait = (trait_type: string, value: string) =>
        setMetadata((md) => {
            const [newMd, newItems] = md.toggleTrait(trait_type, value).next();
            setItems(newItems);
            return newMd;
        });

    const next = () =>
        setMetadata((md) => {
            const [newMd, newItems] = md.next();
            setItems((items) => items.concat(newItems) as Items<T>);
            return newMd;
        });

    return [filteredItems, toggleTrait, next];
}

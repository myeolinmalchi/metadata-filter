import TraitFilters from './Trait.type';
import Items, { Item } from './Item.type';

export default class Metadata<T extends Item> {
    private items: Items<T>;
    private traits: TraitFilters;
    private lastIndex: number;

    constructor(items: Items<T>, traits: TraitFilters, lastIndex?: number) {
        (this.items = items),
            (this.traits = traits),
            (this.lastIndex = lastIndex ? lastIndex : 0);
    }

    next(size: number = 3): [Metadata<T>, Items<T>] {
        const [lastIndex, items] = this.items.getFilteredItems(
            this.lastIndex,
            size,
            this.traits,
        );
        return [new Metadata(this.items, this.traits, lastIndex), items];
    }

    toggleTrait(trait_type: string, value: string): Metadata<T> {
        return new Metadata(
            this.items,
            this.traits.toggleTrait(trait_type, value),
        );
    }
}

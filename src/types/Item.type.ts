import TraitFilters from './Trait.type';

export interface Item {
    attributes: Array<ItemAttribute>;
    properties: ItemProperties;
}

export interface ItemProperties {}

export interface ItemAttribute {
    trait_type: string;
    value: string;
}

export default class Items<T extends Item> extends Array<T> {
    constructor(...items: T[]) {
        super(...items);
    }

    getFilteredItems(
        lastIndex: number,
        size: number,
        filters: TraitFilters,
    ): [number, Items<T>] {
        return this.slice(lastIndex).reduce<[number, Items<T>]>(
            ([_, acc], item, index, arr) => {
                const test = item.attributes.reduce<boolean>(
                    (acc, { trait_type, value }) =>
                        (acc &&
                            filters
                                ?.find(
                                    (filter) =>
                                        filter.trait_type === trait_type,
                                )
                                ?.test?.({ value })) ??
                        true,
                    true,
                );
                if (test) {
                    const newAcc = acc.concat(item);
                    if (newAcc.length >= size) {
                        arr.splice(1);
                    }
                    return [lastIndex + index + 1, <Items<T>>newAcc];
                } else {
                    return [index, <Items<T>>acc];
                }
            },
            [0, new Items<T>()],
        );
    }
}

import { writeFileSync } from 'fs';
import { Filter, TraitValue } from './types/Trait.type';
import { Item } from './types/Item.type';

const items: Array<Item> = require('./resources/metadata.json');

type Filters = Array<Filter<TraitValue>>;

const traits = items.reduce<Filters>(
    (acc1, item) =>
        item.attributes.reduce<Filters>(
            (acc2, { trait_type, value }) =>
                acc2.map((trait) =>
                    trait.trait_type === trait_type
                        ? trait.values?.find((v) => v.value === value)
                            ? trait
                            : {
                                  ...trait,
                                  values: trait.values?.concat({
                                      value,
                                      selected: false,
                                  }),
                              }
                        : trait,
                ),
            acc1,
        ),
    items[0].attributes.map(
        ({ trait_type }) =>
            ({
                trait_type,
                values: [],
            } as Filter<TraitValue>),
    ),
);
writeFileSync('src/resources/traits.json', JSON.stringify(traits));

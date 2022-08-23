export interface TraitValue {
    value: string;
    selected?: boolean;
}

export interface Filter<V extends TraitValue | string = string> {
    trait_type: string;
    values?: Array<V>;
    test?: (v: V) => boolean;
}

export default class TraitFilters extends Array<Filter<TraitValue>> {
    constructor(...filters: Filter<TraitValue>[]) {
        super(...filters);
    }

    initFilter(): TraitFilters {
        return <TraitFilters>this.map(({ trait_type, values }) => {
            const selected = values?.filter((v) => v.selected);
            return <Filter<TraitValue>>{
                trait_type,
                values,
                test:
                    !selected || selected?.length === 0
                        ? () => true
                        : selected?.reduce<(v: TraitValue) => boolean>(
                              (acc, c) => (v: TraitValue) =>
                                  acc(v) || c.value === v.value,
                              () => false,
                          ),
            };
        });
    }
    toggleTrait(trait_type: string, value: string): TraitFilters {
        return (<TraitFilters>this.map(
            (trait) =>
                <Filter<TraitValue>>{
                    ...trait,
                    values:
                        trait.trait_type === trait_type
                            ? trait.values?.map((v) => ({
                                  ...v,
                                  selected:
                                      v.value === value
                                          ? !v.selected
                                          : v.selected,
                              }))
                            : trait.values,
                },
        )).initFilter();
    }
}

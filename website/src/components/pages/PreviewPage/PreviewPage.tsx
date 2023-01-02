import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import Button from "@/components/Button";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useMemo, useState } from "react";
import useSwr from "swr";
import type { Metadata } from "@tenk/engine";

type Filters = Map<string, string[] | undefined>;

const PreviewPage = () => {
  const {
    data: metadata = [],
    error,
    isLoading,
  } = useSwr<Metadata[]>(
    "https://racers-dev-2.s3.us-east-1.amazonaws.com/2/metadata.json",
    (url) => fetch(url).then((res) => res.json())
  );

  const attributeRecord = metadata.reduce<Record<string, string[]>>(
    (acc, next) => {
      next.attributes.forEach((attribute) => {
        const key = attribute.trait_type || attribute.value;
        acc[key] = Array.from(
          new Set([...(acc[key] || []), attribute.value])
        ).sort();
      });
      return acc;
    },
    {}
  );

  const attributeNames = Object.keys(attributeRecord).sort();
  const [filters, setFilters] = useState<Filters>(new Map());

  const setFilterValue = (key: string, value: string[] | undefined) => {
    if (!value) {
      setFilters((f) => {
        const n = new Map(f);
        n.delete(key);
        return n;
      });
    } else {
      setFilters((f) => new Map(f).set(key, value));
    }
  };

  const onTraitValueClick = (trait: string, value: string) => {
    const wasChecked = filters.get(trait)?.includes(String(value));
    const current = filters.get(trait) || [];

    if (wasChecked) {
      const next = current.filter((x) => x !== value);
      setFilterValue(trait, next.length ? next : undefined);
    } else {
      setFilterValue(trait, Array.from(new Set([...current, String(value)])));
    }
  };

  const filterKeys = useMemo(
    () => Array.from(filters.keys()).filter((key) => filters.get(key)?.length),
    [filters]
  );

  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <div className="sticky top-0 overflow-auto h-screen p-2">
            {attributeNames.map((key) => (
              <Disclosure key={key}>
                {({ open }) => {
                  const Icon = open ? ChevronUpIcon : ChevronDownIcon;
                  const elements = attributeRecord[key];
                  return (
                    <>
                      <Disclosure.Button
                        as={Button}
                        className="w-full flex items-center justify-between normal-case"
                      >
                        {key}
                        <div className="flex items-center space-x-2">
                          <div className="font-light text-sm text-gray-500">
                            {elements.length}
                          </div>
                          <Icon className="h-4 w-4" />
                        </div>
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-3">
                        {elements.map((value) => (
                          <div key={value}>
                            <input
                              type="checkbox"
                              id={value}
                              name={value}
                              value={value}
                              onClick={() => onTraitValueClick(key, value)}
                            />
                            <label htmlFor={value}>{value}</label>
                          </div>
                        ))}
                      </Disclosure.Panel>
                    </>
                  );
                }}
              </Disclosure>
            ))}
          </div>
        </div>
        <div className="col-span-8">
          <div className="grid grid-cols-6">
            {metadata
              .filter((token) => {
                return filterKeys.every((filterKey) => {
                  const attribute = token.attributes.find(
                    ({ trait_type, value }) => {
                      return (trait_type || value) === filterKey;
                    }
                  );
                  return filters.get(filterKey)?.includes(attribute?.value!);
                });
              })
              .map(({ name }) => (
                <div key={name}>
                  <Image
                    src={`https://racers-dev-2.s3.us-east-1.amazonaws.com/2/png/${name}.png`}
                    alt=""
                    width="480"
                    height="480"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PreviewPage;

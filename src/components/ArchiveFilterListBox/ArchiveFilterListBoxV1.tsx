import React, { FC, useEffect } from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { ListBoxItemType } from "components/NcListBox/NcListBox";
import ButtonDropdown from "components/ButtonDropdown/ButtonDropdown";

export interface DropDownListItem {
  id: string;
  name: string;
  color: string;
  count: number;
  href: string;
  type: string;
  thumbnail: string;
  categoryId:number;
}

export interface ArchiveFilterListBoxProps {
  className?: string;
  lists: DropDownListItem[];
  getAlert: (item: DropDownListItem) => void;
}

const ArchiveFilterListBoxV1: FC<ArchiveFilterListBoxProps> = ({
  className = "",
  lists,
  getAlert,
}) => {
  const [selected, setSelected] = useState(lists[0]);
  useEffect(() => {
    getAlert(selected);
  },[selected])

  return (
    <div
      className={`nc-ArchiveFilterListBox ${className}`}
      data-nc-id="ArchiveFilterListBox"
    >
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative md:min-w-[200px]">
          <Listbox.Button as={"div"}>
            <ButtonDropdown>{selected.name}</ButtonDropdown>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute right-0 z-20 w-52 py-1 mt-1 overflow-auto text-sm text-neutral-900 dark:text-neutral-200 bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 dark:ring-neutral-700">
              {lists.map((item: DropDownListItem, index: number) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `${
                      active
                        ? "text-primary-700 dark:text-neutral-200 bg-primary-50 dark:bg-neutral-700"
                        : ""
                    } cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span className="text-primary-700 absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-200">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default ArchiveFilterListBoxV1;

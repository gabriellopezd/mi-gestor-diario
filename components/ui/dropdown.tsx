'use client';

import {
  Menu as HeadlessMenu,
  MenuButton as HeadlessMenuButton,
  MenuItem as HeadlessMenuItem,
  MenuItems as HeadlessMenuItems,
  Transition
} from '@headlessui/react';
import { Fragment } from 'react';

// Componente Menu (wrapper)
export const Menu = HeadlessMenu;

// Componente MenuButton estilizado y accesible
export const MenuButton = ({ className = '', ...props }) => (
  <HeadlessMenuButton
    className={`inline-flex items-center justify-center text-sm font-medium rounded-full px-4 py-2 shadow-md
                bg-white/90 text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600
                transition-all duration-200 ${className}`}
    {...props}
  />
);

// Componente MenuItems con animación y centrado en la pantalla
export const MenuItems = ({ className = '', ...props }) => (
  <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <HeadlessMenuItems
      className={`absolute left-1/2 transform -translate-x-1/2 mt-3 w-48 origin-top bg-white dark:bg-gray-800 border
                  border-gray-200 dark:border-gray-700 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50
                  ${className}`}
      {...props}
    />
  </Transition>
);

// Componente MenuItem estilizado con feedback visual
export const MenuItem = ({ children, className = '', ...props }) => (
  <HeadlessMenuItem {...props}>
    {({ active }) => (
      <button
        className={`w-full text-left px-4 py-2 text-sm rounded-md
                    ${active
          ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
          : 'text-gray-700 dark:text-gray-300'}
                    ${className}`}
      >
        {children}
      </button>
    )}
  </HeadlessMenuItem>
);

'use client';

import {
  Menu as HeadlessMenu,
  MenuButton as HeadlessMenuButton,
  MenuItem as HeadlessMenuItem,
  MenuItems as HeadlessMenuItems,
  Transition
} from '@headlessui/react';
import { Fragment, ReactNode, ButtonHTMLAttributes } from 'react';

// Interface para MenuButton y MenuItems props
interface BaseProps {
  className?: string;
  [key: string]: any;
}

// Interface para MenuItem con tipado de children
interface MenuItemProps extends BaseProps {
  children: ReactNode;
}

// Wrapper principal del Menu
export const Menu = HeadlessMenu;

// MenuButton con estilos y props
export const MenuButton = ({ className = '', ...props }: BaseProps) => (
  <HeadlessMenuButton
    className={`inline-flex items-center justify-center text-sm font-medium rounded-full px-4 py-2 shadow-md
      bg-white/90 text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600
      transition-all duration-200 ${className}`}
    {...props}
  />
);

// MenuItems con animación, centrado y accesibilidad
export const MenuItems = ({ className = '', ...props }: BaseProps) => (
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

// MenuItem con feedback visual
export const MenuItem = ({ children, className = '', ...props }: MenuItemProps) => (
  <HeadlessMenuItem {...props}>
    {({ active }: { active: boolean }) => (
      <button
        type="button"
        className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors
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
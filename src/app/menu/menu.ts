import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: 'dashboard',
    title: 'Dashboard',
    translate: 'MENU.TITLES.DASHBOARD',
    type: 'item',
    // role: ['Admin'], //? To hide collapsible based on user role
    icon: 'home',
    url: 'dashboard'
  },
  {
    id: 'notifications',
    title: 'Notifications',
    translate: 'MENU.TITLES.NOTIFICATIONS',
    type: 'item',
    // role: ['Admin'], //? To hide collapsible based on user role
    icon: 'message-square',
    url: 'notifications'
  },
  // Apps & Pages
  {
    id: 'apps',
    type: 'section',
    title: 'Secciones',
    translate: 'MENU.TITLES.SECTIONS',
    icon: 'package',
    children: [
      {
        id: 'users',
        title: 'Users',
        translate: 'MENU.TITLES.USERS',
        type: 'item',
        icon: 'user-plus',
        url: 'users'
      },
      {
        id: 'clients',
        title: 'Clients',
        translate: 'MENU.TITLES.CLIENTS',
        type: 'item',
        icon: 'user',
        url: 'clients'
      },
      {
        id: 'fractions',
        title: 'Grupo de Clientes',
        translate: 'MENU.TITLES.FRACTIONS',
        type: 'item',
        icon: 'users',
        url: 'fractions'
      },
      {
        id: 'myData',
        title: 'MyData',
        translate: 'MENU.TITLES.MYDATA',
        type: 'item',
        icon: 'file-text',
        url: 'myData'
      },
      {
        id: 'paydesks',
        title: 'Paydesks',
        translate: 'MENU.TITLES.PAYDESK',
        type: 'item',
        icon: 'shopping-cart',
        url: 'paydesks'
      },
      {
        id: 'diary-schedules',
        title: 'Diary schedules',
        translate: 'MENU.TITLES.DIARY_SCHEDULES',
        type: 'item',
        icon: 'grid',
        url: 'schedules'
      }
    ]
  },
  {
    id: 'stock_management',
    type: 'section',
    title: 'Stock Management',
    translate: 'MENU.TITLES.STOCK_MANAGEMENT',
    icon: 'package',
    children: [
      {
        id: 'products',
        title: 'Productos',
        translate: 'MENU.TITLES.PRODUCTS',
        type: 'item',
        icon: 'package',
        url: 'products'
      },
      {
        id: 'stores',
        title: 'Stores',
        translate: 'MENU.TITLES.STORES',
        type: 'item',
        icon: 'check-square',
        url: 'stores'
      },
      {
        id: 'stock',
        title: 'Stock',
        translate: 'MENU.TITLES.STOCK',
        type: 'item',
        icon: 'layers',
        url: 'stock'
      }
    ]
  },
  {
    id: 'events_management',
    type: 'section',
    title: 'Events Management',
    translate: 'MENU.TITLES.EVENTS_MANAGEMENT',
    icon: 'package',
    children: [
      {
        id: 'saloons',
        title: 'Saloons',
        translate: 'MENU.TITLES.SALOONS',
        type: 'item',
        icon: 'home',
        url: 'saloons'
      },
      {
        id: 'event-types',
        title: 'Event types',
        translate: 'MENU.TITLES.EVENT_TYPES',
        type: 'item',
        icon: 'clipboard',
        url: 'event-types'
      },
      {
        id: 'budgets',
        title: 'Budgets',
        translate: 'MENU.TITLES.BUDGETS',
        type: 'item',
        icon: 'file-text',
        url: 'budgets'
      },
      {
        id: 'calendar',
        title: 'Calendar',
        translate: 'MENU.TITLES.CALENDAR',
        type: 'item',
        icon: 'calendar',
        url: 'calendar'
      }
    ]
  }
];

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
        id: 'myData',
        title: 'myData',
        translate: 'MENU.TITLES.MYDATA',
        type: 'item',
        icon: 'data',
        url: 'myData'
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
        id: 'stores',
        title: 'Stores',
        translate: 'MENU.TITLES.STORES',
        type: 'item',
        icon: 'check-square',
        url: 'stores'
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

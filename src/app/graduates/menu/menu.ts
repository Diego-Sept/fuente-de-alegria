import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: 'dashboard',
    title: 'Dashboard',
    translate: 'MENU.TITLES.DASHBOARD',
    type: 'item',
    // role: ['Graduate'], //? To hide collapsible based on user role
    icon: 'home',
    url: 'dashboard'
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
        id: 'myData',
        title: 'MyData',
        translate: 'MENU.TITLES.MyData',
        type: 'item',
        icon: 'user',
        url: 'myData'
      },
      {
        id: 'dues',
        title: 'Dues',
        translate: 'MENU.TITLES.DUES',
        type: 'item',
        icon: 'user',
        url: 'file-text'
      }
    ]
  }
];

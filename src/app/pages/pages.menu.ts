export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'idea',
        data: {
          menu: {
            title: 'Ideas',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 0,
          }
        },
        children: [
          {
            path: 'postIdea',
            data: {
              menu: {
                title: 'Post a Idea',
              }
            }
          }
        ]
      }
      ]
  }
];

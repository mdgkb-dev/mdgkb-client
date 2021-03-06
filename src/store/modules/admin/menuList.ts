import IAdminMenu from '@/interfaces/IAdminMenu';

const menuList: IAdminMenu[] = [
  {
    title: 'Новости и реклама',
    to: '/',
    icon: 'el-icon-info',
    children: [
      {
        title: 'Новости',
        to: '/admin/news',
        icon: 'el-icon-tickets',
      },
      {
        title: 'События',
        to: '/admin/events',
        icon: 'el-icon-tickets',
      },
      {
        title: 'Слайдер новостей',
        to: '/admin/news-slides',
        icon: 'el-icon-film',
      },
      {
        title: 'Рекламные баннеры',
        to: '/admin/banners',
        icon: 'el-icon-film',
      },
    ],
  },
  {
    title: 'Вакансии, вопросы, комментарии, заявки',
    to: '/',
    icon: 'el-icon-info',
    children: [
      {
        title: 'Редактор вакансий',
        to: '/admin/vacancies',
        icon: 'el-icon-suitcase-1',
      },
      {
        title: 'Отклики на вакансии',
        to: '/admin/vacancy-responses',
        icon: 'el-icon-suitcase-1',
        tableName: 'vacancy_responses',
      },
      {
        title: 'Вопросы',
        to: '/admin/questions',
        icon: 'el-icon-question',
      },
      {
        title: 'Комментарии',
        to: '/admin/comments',
        tableName: 'comments',
      },
      {
        title: 'Заявки на посещение',
        to: '/admin/visits-applications',
        icon: 'el-icon-guide',
        tableName: 'visits_applications',
      },
    ],
  },
  {
    title: 'Здания, отделения, входы',
    to: '/',
    icon: 'el-icon-question',
    children: [
      {
        title: 'Здания',
        to: '/admin/buildings',
      },
      {
        title: 'Входы',
        to: '/admin/gates',
      },
      {
        title: 'Отделения',
        to: '/admin/divisions',
      },
    ],
  },
  {
    title: 'Руководители и врачи',
    to: '/',
    icon: 'el-icon-question',
    children: [
      {
        title: 'Руководители',
        to: '/admin/heads',
        icon: 'el-icon-first-aid-kit',
      },
      {
        title: 'Врачи',
        to: '/admin/doctors',
        icon: 'el-icon-first-aid-kit',
      },
    ],
  },
  {
    title: 'Документы',
    to: '/',
    icon: 'el-icon-document',
    children: [
      {
        title: 'Сертификаты',
        to: '/admin/certificates',
      },
      {
        title: 'Раздел документы',
        to: '/admin/public-document-types',
        icon: 'el-icon-document',
      },
    ],
  },
  {
    title: 'Проекты, партнеры, профили, организации',
    to: '/',
    icon: 'el-icon-collection',
    children: [
      {
        title: 'Наши партнеры',
        to: '/admin/partners',
      },
      {
        title: 'Наши проекты',
        to: '/admin/projects',
      },
      {
        title: 'Медицинские профили',
        to: '/admin/medical-profiles',
      },
      {
        title: 'Организации здравоохранения',
        to: '/admin/side-organizations',
      },
    ],
  },
  {
    title: 'Образование',
    to: '/',
    icon: 'el-icon-school',
    children: [
      {
        title: 'Сведения об образовательной организации',
        to: '/admin/educational-organization',
      },
      {
        title: 'Ординатура',
        to: '/admin/residency',
      },
      {
        title: 'Аспирантура',
        to: '/admin/postgraduate',
      },
      {
        title: 'Кандидатские экзамены',
        to: '/admin/candidate',
      },
      {
        title: 'Дополнительное профессиональное образование',
        to: '/admin/dpo',
      },
      {
        title: 'Приёмная комиссия',
        to: '/admin/admission-committee',
      },
      {
        title: 'Программы ДПО',
        to: '/admin/dpo/courses',
      },
      {
        title: 'Программы НМО',
        to: '/admin/nmo/courses',
      },
      {
        title: 'Программы аспирантуры',
        to: '/admin/postgraduate-courses',
      },
      {
        title: 'Программы ординатуры',
        to: '/admin/residency/courses',
      },
      {
        title: 'Заявки ДПО',
        to: '/admin/dpo/applications',
        tableName: 'dpo_applications',
      },
      {
        title: 'Заявки НМО',
        to: '/admin/nmo/applications',
        tableName: 'nmo_applications',
      },
      {
        title: 'Заявки на обучение в аспирантуре',
        to: '/admin/postgraduate-applications',
        tableName: 'postgraduate_applications',
      },
      {
        title: 'Заявки на сдачу кандидатского экзамена',
        to: '/admin/candidate-applications',
      },
      {
        title: 'Заявки ординатуры',
        to: '/admin/residency-applications',
        tableName: 'residency_applications',
      },
    ],
  },
  {
    title: 'FAQ, правила, исследования, донорство',
    to: '/',
    icon: 'el-icon-user',
    children: [
      {
        title: 'Общие правила посещения',
        to: '/admin/common-visiting-rules',
      },
      {
        title: 'Подготовка к исследованиям',
        to: '/admin/preparations',
      },
      {
        title: 'FAQ',
        to: '/admin/faqs',
      },
      {
        title: 'Правила для доноров',
        to: '/admin/donor-rules',
        icon: 'el-icon-plus',
      },
    ],
  },
  {
    title: 'Администрирование',
    to: '/',
    icon: 'el-icon-data-board',
    children: [
      {
        title: 'Меню',
        to: '/admin/menus',
      },
      {
        title: 'Страницы',
        to: '/admin/pages',
      },
      {
        title: 'Роли',
        to: '/admin/roles',
        icon: 'el-icon-user',
      },
      {
        title: 'Пользователи',
        to: '/admin/users',
        icon: 'el-icon-user',
      },
      {
        title: 'Клиентские доступы',
        to: '/admin/path-permissions',
        icon: 'el-icon-user',
      },
      {
        title: 'Шаблоны графика работы',
        to: '/admin/timetable-patterns',
        icon: 'el-icon-time',
      },
      {
        title: 'Шаблоны форм для заявок',
        to: '/admin/form-patterns',
      },
      {
        title: 'Специальности',
        to: '/admin/educational/specializations',
      },
      {
        title: 'Группы статусов заявок',
        to: '/admin/form-status-groups',
        icon: 'el-icon-user',
      },
    ],
  },
  {
    title: 'В разработке',
    to: '/',
    icon: 'el-icon-warning',
    children: [
      {
        title: 'Создать слоты для записи',
        to: '/admin/appointments/constructor',
      },
      {
        title: 'Список записей',
        to: '/admin/appointments/list',
      },
      {
        title: 'Платные услуги',
        to: '/admin/paid-programs-groups',
        icon: 'el-icon-money',
      },
      // {
      //   title: 'Статусы заявок',
      //   to: '/admin/form-statuses',
      //   icon: 'el-icon-user',
      // },
    ],
  },
];

export default menuList;

import IHospitalizationType from '@/interfaces/IHospitalizationType';
import { PolicyTypes } from '@/interfaces/PolicyTypes';
import { ReferralTypes } from '@/interfaces/ReferralTypes';
import { StayTypes } from '@/interfaces/StayTypes';
import { TreatmentTypes } from '@/interfaces/TreatmentTypes';

const hospitalizations: IHospitalizationType[] = [
  {
    policyType: PolicyTypes.OMS,
    treatmentType: TreatmentTypes.Conservative,
    stayType: StayTypes.AllDay,
    referralType: ReferralTypes.Moscow,
    hospitalizationAnalyzes: [
      {
        name: 'Клинический анализ крови',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Общий анализ мочи',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на яйца глистов и протозоозы, соскоб на энтеробиоз',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на кишечные инфекции (детям до 2-х лет) ',
        children: true,
        durationDays: 14,
      },
      {
        name: 'ЭКГ с описанием',
        children: true,
        durationDays: 30,
      },
      {
        name: 'Флюорография с возраста 15 лет',
        children: true,
        durationDays: 365,
      },
      {
        name:
          'При плановом поступлении на стационарное лечение пациенты на\n' +
          'догоспитальном этапе подлежат профилактическому обследованию на\n' +
          'туберкулез',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на кишечные инфекции (для родителей детей до 2 лет)',
        children: false,
        durationDays: 14,
      },
      {
        name: 'Флюорография или рентгенография органов грудной клетки',
        children: false,
        durationDays: 365,
      },
      {
        name: 'Анализ кала на кишечные инфекции (для родителей детей до 2 лет)',
        children: false,
        durationDays: 14,
      },
      {
        name: 'Флюорография или рентгенография органов грудной клетки',
        children: false,
        durationDays: 365,
      },
    ],
    hospitalizationDocuments: [
      {
        name: 'Свидетельство о рождении ребенка (с 14 лет и его паспорт), страховой полис обязательного медицинского страхования ребенка (оригиналы и их ксерокопии)',
        children: true,
      },
      {
        name: 'Направление на госпитализацию (Форма 057/у-04) из медицинской организации, работающей в системе ОМС (действительно на одну госпитализацию)',
        children: true,
      },
      {
        name:
          'Выписка из медицинской документации (Форма 027/у) с результатами\n' +
          'проведённых лабораторных, инструментальных и других видов\n' +
          'исследования по профилю заболевания пациента',
        children: true,
      },
      {
        name: 'Медицинская справка о вакцинации ребенка (карта профпрививок- Форма\n' + '063/у).',
        children: true,
      },
      {
        name:
          'Справка об отсутствии контактов с инфекционными больными по месту\n' +
          'жительства в течение последних 21 дней из государственной поликлиники\n' +
          'по месту фактического пребывания (действительна 3 суток)',
        children: true,
      },
      {
        name:
          'Справка об отсутствии контактов с инфекционными больными по месту\n' +
          'обучения (ясли, детский сад, школа, учреждение среднего\n' +
          'профессионального образования, ВУЗ) в течение последних 21 дней\n' +
          '(действительна 3 суток)',
        children: true,
      },
      {
        name: 'Справка об отсутствии контактов с инфекционными больными по месту жительства за последние 21 день из государственной поликлиники по месту жительства (действительна 3 суток).',
        children: false,
      },
      {
        name: 'Паспорт и страховой полис (оригиналы и их ксерокопии).',
        children: false,
      },
      {
        name: 'СНИЛС (при необходимости получения листка нетрудоспособности).)',
        children: false,
      },
    ],
    hospitalizationStages: [
      {
        name: 'Обратиться в поликлинику по месту жительства',
        hospitalizationStageComments: [{ name: 'Комментарий1' }, { name: 'Комментарий2' }, { name: 'Комментарий3' }],
      },
      {
        name: 'Взять необходимсые вещи',
        hospitalizationStageComments: [{ name: 'Комментарий1' }, { name: 'Комментарий2' }, { name: 'Комментарий3' }],
      },
      {
        name: 'Пройти лечение',
        hospitalizationStageComments: [{ name: 'Комментарий1' }, { name: 'Комментарий2' }, { name: 'Комментарий3' }],
      },
    ],
  },
  {
    policyType: PolicyTypes.OMS,
    treatmentType: TreatmentTypes.Conservative,
    stayType: StayTypes.AllDay,
    referralType: ReferralTypes.Region,
    hospitalizationAnalyzes: [
      {
        name: 'Клинический анализ крови',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Общий анализ мочи',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на яйца глистов и протозоозы, соскоб на энтеробиоз',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на кишечные инфекции (детям до 2-х лет) ',
        children: true,
        durationDays: 14,
      },
      {
        name: 'ЭКГ с описанием',
        children: true,
        durationDays: 30,
      },
      {
        name: 'Флюорография с возраста 15 лет',
        children: true,
        durationDays: 365,
      },
      {
        name:
          'При плановом поступлении на стационарное лечение пациенты на\n' +
          'догоспитальном этапе подлежат профилактическому обследованию на\n' +
          'туберкулез',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на кишечные инфекции (для родителей детей до 2 лет)',
        children: false,
        durationDays: 14,
      },
      {
        name: 'Флюорография или рентгенография органов грудной клетки',
        children: false,
        durationDays: 365,
      },
    ],
    hospitalizationDocuments: [
      {
        name: 'Свидетельство о рождении ребенка (с 14 лет и его паспорт), страховой полис обязательного медицинского страхования ребенка (оригиналы и их ксерокопии)',
        children: true,
      },
      {
        name: 'Направление на госпитализацию (Форма 057/у-04) из медицинской организации, работающей в системе ОМС (действительно на одну госпитализацию)',
        children: true,
      },
      {
        name:
          'Выписка из медицинской документации (Форма 027/у) с результатами\n' +
          'проведённых лабораторных, инструментальных и других видов\n' +
          'исследования по профилю заболевания пациента',
        children: true,
      },
      {
        name: 'Медицинская справка о вакцинации ребенка (карта профпрививок- Форма\n' + '063/у).',
        children: true,
      },
      {
        name:
          'Справка об отсутствии контактов с инфекционными больными по месту\n' +
          'жительства в течение последних 21 дней из государственной поликлиники\n' +
          'по месту фактического пребывания (действительна 3 суток)',
        children: true,
      },
      {
        name:
          'Справка об отсутствии контактов с инфекционными больными по месту\n' +
          'обучения (ясли, детский сад, школа, учреждение среднего\n' +
          'профессионального образования, ВУЗ) в течение последних 21 дней\n' +
          '(действительна 3 суток)',
        children: true,
      },
      {
        name: 'Справка об отсутствии контактов с инфекционными больными по месту жительства за последние 21 день из государственной поликлиники по месту жительства (действительна 3 суток).',
        children: false,
      },
      {
        name: 'Паспорт и страховой полис (оригиналы и их ксерокопии).',
        children: false,
      },
      {
        name: 'СНИЛС (при необходимости получения листка нетрудоспособности).)',
        children: false,
      },
    ],
    hospitalizationStages: [
      {
        name: 'Обратиться в поликлинику по месту жительства',
        hospitalizationStageComments: [{ name: 'Комментарий1' }, { name: 'Комментарий2' }, { name: 'Комментарий3' }],
      },
      {
        name: 'Взять необходимсые вещи',
        hospitalizationStageComments: [{ name: 'Комментарий1' }, { name: 'Комментарий2' }, { name: 'Комментарий3' }],
      },
      {
        name: 'Пройти лечение',
        hospitalizationStageComments: [{ name: 'Комментарий1' }, { name: 'Комментарий2' }, { name: 'Комментарий3' }],
      },
    ],
  },
  {
    policyType: PolicyTypes.OMS,
    treatmentType: TreatmentTypes.Operative,
    stayType: StayTypes.AllDay,
    referralType: ReferralTypes.Moscow,
    hospitalizationAnalyzes: [
      {
        name: 'Клинический анализ крови',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Общий анализ мочи',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на яйца глистов и протозоозы, соскоб на энтеробиоз',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на кишечные инфекции (детям до 2-х лет) ',
        children: true,
        durationDays: 14,
      },
      {
        name: 'ЭКГ с описанием',
        children: true,
        durationDays: 30,
      },
      {
        name: 'Флюорография с возраста 15 лет',
        children: true,
        durationDays: 365,
      },
      {
        name:
          'При плановом поступлении на стационарное лечение пациенты на\n' +
          'догоспитальном этапе подлежат профилактическому обследованию на\n' +
          'туберкулез',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на кишечные инфекции (для родителей детей до 2 лет)',
        children: false,
        durationDays: 14,
      },
      {
        name: 'Флюорография или рентгенография органов грудной клетки',
        children: false,
        durationDays: 365,
      },
    ],
    hospitalizationDocuments: [
      {
        name: 'Свидетельство о рождении ребенка (с 14 лет и его паспорт), страховой полис обязательного медицинского страхования ребенка (оригиналы и их ксерокопии)',
        children: true,
      },
      {
        name: 'Направление на госпитализацию (Форма 057/у-04) из медицинской организации, работающей в системе ОМС (действительно на одну госпитализацию)',
        children: true,
      },
      {
        name:
          'Выписка из медицинской документации (Форма 027/у) с результатами\n' +
          'проведённых лабораторных, инструментальных и других видов\n' +
          'исследования по профилю заболевания пациента',
        children: true,
      },
      {
        name: 'Медицинская справка о вакцинации ребенка (карта профпрививок- Форма\n' + '063/у).',
        children: true,
      },
      {
        name:
          'Справка об отсутствии контактов с инфекционными больными по месту\n' +
          'жительства в течение последних 21 дней из государственной поликлиники\n' +
          'по месту фактического пребывания (действительна 3 суток)',
        children: true,
      },
      {
        name:
          'Справка об отсутствии контактов с инфекционными больными по месту\n' +
          'обучения (ясли, детский сад, школа, учреждение среднего\n' +
          'профессионального образования, ВУЗ) в течение последних 21 дней\n' +
          '(действительна 3 суток)',
        children: true,
      },

      {
        name: 'Справка об отсутствии контактов с инфекционными больными по месту жительства за последние 21 день из государственной поликлиники по месту жительства (действительна 3 суток).',
        children: false,
      },
      {
        name: 'Паспорт и страховой полис (оригиналы и их ксерокопии).',
        children: false,
      },
      {
        name: 'СНИЛС (при необходимости получения листка нетрудоспособности).)',
        children: false,
      },
    ],
    hospitalizationStages: [
      {
        name: 'Обратиться в поликлинику по месту жительства',
      },
      {
        name: 'Взять необходимсые вещи',
      },
      {
        name: 'Пройти лечение',
      },
    ],
  },
  {
    policyType: PolicyTypes.OMS,
    treatmentType: TreatmentTypes.Operative,
    stayType: StayTypes.AllDay,
    referralType: ReferralTypes.Region,
    hospitalizationAnalyzes: [
      {
        name: 'Клинический анализ крови',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Общий анализ мочи',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на яйца глистов и протозоозы, соскоб на энтеробиоз',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на кишечные инфекции (детям до 2-х лет) ',
        children: true,
        durationDays: 14,
      },
      {
        name: 'ЭКГ с описанием',
        children: true,
        durationDays: 30,
      },
      {
        name: 'Флюорография с возраста 15 лет',
        children: true,
        durationDays: 365,
      },
      {
        name:
          'При плановом поступлении на стационарное лечение пациенты на\n' +
          'догоспитальном этапе подлежат профилактическому обследованию на\n' +
          'туберкулез',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на кишечные инфекции (для родителей детей до 2 лет)',
        children: false,
        durationDays: 14,
      },
      {
        name: 'Флюорография или рентгенография органов грудной клетки',
        children: false,
        durationDays: 365,
      },
    ],
    hospitalizationDocuments: [
      {
        name: 'Свидетельство о рождении ребенка (с 14 лет и его паспорт), страховой полис обязательного медицинского страхования ребенка (оригиналы и их ксерокопии)',
        children: true,
      },
      {
        name: 'Направление на госпитализацию (Форма 057/у-04) из медицинской организации, работающей в системе ОМС (действительно на одну госпитализацию)',
        children: true,
      },
      {
        name:
          'Выписка из медицинской документации (Форма 027/у) с результатами\n' +
          'проведённых лабораторных, инструментальных и других видов\n' +
          'исследования по профилю заболевания пациента',
        children: true,
      },
      {
        name: 'Медицинская справка о вакцинации ребенка (карта профпрививок- Форма\n' + '063/у).',
        children: true,
      },
      {
        name:
          'Справка об отсутствии контактов с инфекционными больными по месту\n' +
          'жительства в течение последних 21 дней из государственной поликлиники\n' +
          'по месту фактического пребывания (действительна 3 суток)',
        children: true,
      },
      {
        name:
          'Справка об отсутствии контактов с инфекционными больными по месту\n' +
          'обучения (ясли, детский сад, школа, учреждение среднего\n' +
          'профессионального образования, ВУЗ) в течение последних 21 дней\n' +
          '(действительна 3 суток)',
        children: true,
      },
      {
        name: 'Справка об отсутствии контактов с инфекционными больными по месту жительства за последние 21 день из государственной поликлиники по месту жительства (действительна 3 суток).',
        children: false,
      },
      {
        name: 'Паспорт и страховой полис (оригиналы и их ксерокопии).',
        children: false,
      },
      {
        name: 'СНИЛС (при необходимости получения листка нетрудоспособности).)',
        children: false,
      },
    ],
    hospitalizationStages: [
      {
        name: 'Обратиться в поликлинику по месту жительства',
        hospitalizationStageComments: [{ name: 'Комментарий1' }, { name: 'Комментарий2' }, { name: 'Комментарий3' }],
      },
      {
        name: 'Взять необходимсые вещи',
        hospitalizationStageComments: [{ name: 'Комментарий1' }, { name: 'Комментарий2' }, { name: 'Комментарий3' }],
      },
      {
        name: 'Пройти лечение',
        hospitalizationStageComments: [{ name: 'Комментарий1' }, { name: 'Комментарий2' }, { name: 'Комментарий3' }],
      },
    ],
  },
  {
    policyType: PolicyTypes.OMS,
    treatmentType: TreatmentTypes.Operative,
    stayType: StayTypes.ShortDay,
    referralType: ReferralTypes.Moscow,
    hospitalizationAnalyzes: [
      {
        name: 'Клинический анализ крови',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Общий анализ мочи',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на яйца глистов и протозоозы, соскоб на энтеробиоз',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на кишечные инфекции (детям до 2-х лет) ',
        children: true,
        durationDays: 14,
      },
      {
        name: 'ЭКГ с описанием',
        children: true,
        durationDays: 30,
      },
      {
        name: 'Флюорография с возраста 15 лет',
        children: true,
        durationDays: 365,
      },
      {
        name:
          'При плановом поступлении на стационарное лечение пациенты на\n' +
          'догоспитальном этапе подлежат профилактическому обследованию на\n' +
          'туберкулез',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на кишечные инфекции (для родителей детей до 2 лет)',
        children: false,
        durationDays: 14,
      },
      {
        name: 'Флюорография или рентгенография органов грудной клетки',
        children: false,
        durationDays: 365,
      },
    ],
    hospitalizationDocuments: [
      {
        name: 'Свидетельство о рождении ребенка (с 14 лет и его паспорт), страховой полис обязательного медицинского страхования ребенка (оригиналы и их ксерокопии)',
        children: true,
      },
      {
        name: 'Направление на госпитализацию (Форма 057/у-04) из медицинской организации, работающей в системе ОМС (действительно на одну госпитализацию)',
        children: true,
      },
      {
        name:
          'Выписка из медицинской документации (Форма 027/у) с результатами\n' +
          'проведённых лабораторных, инструментальных и других видов\n' +
          'исследования по профилю заболевания пациента',
        children: true,
      },
      {
        name: 'Медицинская справка о вакцинации ребенка (карта профпрививок- Форма\n' + '063/у).',
        children: true,
      },
      {
        name:
          'Справка об отсутствии контактов с инфекционными больными по месту\n' +
          'жительства в течение последних 21 дней из государственной поликлиники\n' +
          'по месту фактического пребывания (действительна 3 суток)',
        children: true,
      },
      {
        name:
          'Справка об отсутствии контактов с инфекционными больными по месту\n' +
          'обучения (ясли, детский сад, школа, учреждение среднего\n' +
          'профессионального образования, ВУЗ) в течение последних 21 дней\n' +
          '(действительна 3 суток)',
        children: true,
      },
      {
        name: 'Справка об отсутствии контактов с инфекционными больными по месту жительства за последние 21 день из государственной поликлиники по месту жительства (действительна 3 суток).',
        children: false,
      },
      {
        name: 'Паспорт и страховой полис (оригиналы и их ксерокопии).',
        children: false,
      },
      {
        name: 'СНИЛС (при необходимости получения листка нетрудоспособности).)',
        children: false,
      },
    ],
    hospitalizationStages: [
      {
        name: 'Обратиться в поликлинику по месту жительства',
        hospitalizationStageComments: [{ name: 'Комментарий1' }, { name: 'Комментарий2' }, { name: 'Комментарий3' }],
      },
      {
        name: 'Взять необходимсые вещи',
        hospitalizationStageComments: [{ name: 'Комментарий1' }, { name: 'Комментарий2' }, { name: 'Комментарий3' }],
      },
      {
        name: 'Пройти лечение',
        hospitalizationStageComments: [{ name: 'Комментарий1' }, { name: 'Комментарий2' }, { name: 'Комментарий3' }],
      },
    ],
  },
  {
    policyType: PolicyTypes.DMS,
    treatmentType: TreatmentTypes.Conservative,
    stayType: StayTypes.AllDay,
    referralType: ReferralTypes.Moscow,
    hospitalizationAnalyzes: [
      {
        name: 'Клинический анализ крови',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Общий анализ мочи',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на яйца глистов и протозоозы, соскоб на энтеробиоз',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на кишечные инфекции (детям до 2-х лет) ',
        children: true,
        durationDays: 14,
      },
      {
        name: 'ЭКГ с описанием',
        children: true,
        durationDays: 30,
      },
      {
        name: 'Флюорография с возраста 15 лет',
        children: true,
        durationDays: 365,
      },
      {
        name:
          'При плановом поступлении на стационарное лечение пациенты на\n' +
          'догоспитальном этапе подлежат профилактическому обследованию на\n' +
          'туберкулез',
        children: true,
        durationDays: 20,
      },
      {
        name: 'Анализ кала на кишечные инфекции (для родителей детей до 2 лет)',
        children: false,
        durationDays: 14,
      },
      {
        name: 'Флюорография или рентгенография органов грудной клетки',
        children: false,
        durationDays: 365,
      },
    ],
    hospitalizationDocuments: [
      {
        name: 'Свидетельство о рождении ребенка (с 14 лет и его паспорт), страховой полис обязательного медицинского страхования ребенка (оригиналы и их ксерокопии)',
        children: true,
      },
      {
        name: 'Направление на госпитализацию (Форма 057/у-04) из медицинской организации, работающей в системе ОМС (действительно на одну госпитализацию)',
        children: true,
      },
      {
        name:
          'Выписка из медицинской документации (Форма 027/у) с результатами\n' +
          'проведённых лабораторных, инструментальных и других видов\n' +
          'исследования по профилю заболевания пациента',
        children: true,
      },
      {
        name: 'Медицинская справка о вакцинации ребенка (карта профпрививок- Форма\n' + '063/у).',
        children: true,
      },
      {
        name:
          'Справка об отсутствии контактов с инфекционными больными по месту\n' +
          'жительства в течение последних 21 дней из государственной поликлиники\n' +
          'по месту фактического пребывания (действительна 3 суток)',
        children: true,
      },
      {
        name:
          'Справка об отсутствии контактов с инфекционными больными по месту\n' +
          'обучения (ясли, детский сад, школа, учреждение среднего\n' +
          'профессионального образования, ВУЗ) в течение последних 21 дней\n' +
          '(действительна 3 суток)',
        children: true,
      },
      {
        name: 'Справка об отсутствии контактов с инфекционными больными по месту жительства за последние 21 день из государственной поликлиники по месту жительства (действительна 3 суток).',
        children: false,
      },
      {
        name: 'Паспорт и страховой полис (оригиналы и их ксерокопии).',
        children: false,
      },
      {
        name: 'СНИЛС (при необходимости получения листка нетрудоспособности).)',
        children: false,
      },
    ],
    hospitalizationStages: [
      {
        name: 'Обратиться в поликлинику по месту жительства',
        hospitalizationStageComments: [{ name: 'Комментарий1' }, { name: 'Комментарий2' }, { name: 'Комментарий3' }],
      },
      {
        name: 'Взять необходимсые вещи',
        hospitalizationStageComments: [{ name: 'Комментарий1' }, { name: 'Комментарий2' }, { name: 'Комментарий3' }],
      },
      {
        name: 'Пройти лечение',
        hospitalizationStageComments: [{ name: 'Комментарий1' }, { name: 'Комментарий2' }, { name: 'Комментарий3' }],
      },
    ],
  },
];
export default hospitalizations;

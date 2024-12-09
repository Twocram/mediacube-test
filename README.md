# mediacube-test

## Project Setup

```sh
npm install
```

### Environment Setup

Create `.env` file from `.env.example`

### Run JSON Server

```sh
npx json-server db.json
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run Unit Tests for Components

```
npm run test:component
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Format with [Prettier]('https://prettier.io/')

```sh
npm run format
```

## Итог

### Что удалось реализовать:

- [x] Использование тёмной темы
- [x] Адаптив
- [x] Тесты для util и composable функций, а также для компонентов
- [x] Использование Pinia
- [x] Верстка в соответствии с макетом, но не Pixel Perfect
- [x] Сохранение данных без перезагрузки страницы за счет использования json-server в качестве REST API
- [x] Изменение задач местами, но без обновления на сервере
- [x] Функционал в соответствии с ТЗ

### Что не удалось реализовать:

- [ ] Изменение задач местами с обновлением на сервере. Не нашёл публичный REST API, где можно сделать PUT запрос сразу для нескольких элементов
- [ ] Не прям Pixel Perfect верстка

### Что можно улучшить:

- [ ] Определить кейсы для компонентов и дописать для них тесты + сделать конфиг с моками и т.п. для тестов
- [ ] Если учитывать, что проект будет расти, то определить архитектуру и код стайл. Также можно использовать StoryBook для более удобной работы с компонентами
- [ ] Добавить нотификации для обработки ошибок с сервера
- [ ] Добавить анимацию при изменении задач местами

### Затраченное время на реализацию

10-12 часов

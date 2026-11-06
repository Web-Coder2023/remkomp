/* РемКонтур — общий скрипт сайта. Vanilla JS, без зависимостей. */
(() => {
'use strict';

/* ================= Настройки ================= */
const C = {
  brand: 'РемКонтур',
  phone: '+7 (3022) 55-01-01',
  phoneRaw: '+73022550101',
  email: 'info@remkontur-chita.example',
  address: 'г. Чита, ул. Амурская, 24 (вымышленный адрес)',
  hours: 'Пн–Сб 9:00–19:00, Вс 10:00–16:00',
  // Укажите URL вашего обработчика заявок. Пока пусто — режим демо:
  // заявка сохраняется в localStorage браузера и показывается success-состояние.
  endpoint: ''
};

const NAV = [
  ['index.html', 'Главная'], ['prices.html', 'Цены'], ['about.html', 'О компании'],
  ['reviews.html', 'Отзывы'], ['faq.html', 'FAQ'], ['contacts.html', 'Контакты']
];
const SERVICES = [
  ['tv.html', 'Телевизоры'], ['computers.html', 'Компьютеры'],
  ['laptops.html', 'Ноутбуки'], ['appliances.html', 'Бытовая техника']
];
const CATS = {
  tv: { name: 'Телевизоры', url: 'tv.html', dev: 'tv' },
  pc: { name: 'Компьютеры', url: 'computers.html', dev: 'pc' },
  laptop: { name: 'Ноутбуки', url: 'laptops.html', dev: 'laptop' },
  appliance: { name: 'Бытовая техника', url: 'appliances.html', dev: 'appliance' }
};
const DEVICES = { tv: 'Телевизор', pc: 'Компьютер', laptop: 'Ноутбук', appliance: 'Бытовая техника', other: 'Другое / не знаю' };

/* Каталог неисправностей — единственный источник для каталога, цен, поиска и калькулятора.
   n — название, d — частая причина, min/max — ориентировочная цена работ в ₽, t — срок, k — слова для поиска */
const CATALOG = {
  tv: [
    { n: 'Нет изображения, звук есть', d: 'Подсветка или блок питания матрицы', min: 2500, max: 6500, t: '1–3 дня', k: 'чёрный экран темный не показывает подсветка' },
    { n: 'Не включается, мигает индикатор', d: 'Блок питания или main-плата', min: 2000, max: 5500, t: '1–3 дня', k: 'не включается не загорается красная лампочка мигает' },
    { n: 'Полосы, пятна или трещины на экране', d: 'Шлейфы матрицы или сама матрица', min: 3500, max: 14000, t: '2–7 дней', k: 'полосы пятна треснул разбит матрица экран' },
    { n: 'Нет звука', d: 'Динамики, усилитель или настройки', min: 1500, max: 4000, t: '1–2 дня', k: 'звук тихо хрипит' },
    { n: 'Не видит HDMI, Wi-Fi, приставку', d: 'Порты, модуль связи, прошивка', min: 1200, max: 3500, t: '1–2 дня', k: 'hdmi вайфай интернет приставка антенна смарт' },
    { n: 'Зависает, перезагружается', d: 'Прошивка или память', min: 1500, max: 4500, t: '1–3 дня', k: 'виснет зависает заставка циклическая перезагрузка' }
  ],
  pc: [
    { n: 'Не включается', d: 'Блок питания или материнская плата', min: 1500, max: 5000, t: '1–2 дня', k: 'не запускается нет реакции кнопка' },
    { n: 'Тормозит, долго загружается', d: 'Нужна чистка, SSD или оптимизация', min: 1200, max: 3500, t: '1 день', k: 'медленно тормоза виснет долго грузится ssd' },
    { n: 'Синий экран, ошибки Windows', d: 'Система, диск или оперативная память', min: 1500, max: 3000, t: '1–2 дня', k: 'винда виндовс windows ошибка синий экран не загружается' },
    { n: 'Вирусы, баннеры, реклама', d: 'Удаление вредоносных программ', min: 1500, max: 2500, t: '1 день', k: 'вирус баннер реклама блокировка' },
    { n: 'Шумит и перегревается', d: 'Чистка от пыли, замена термопасты', min: 1200, max: 2200, t: '1 день', k: 'шум гудит жарко перегрев кулер вентилятор' },
    { n: 'Нет изображения на мониторе', d: 'Видеокарта, память, кабель', min: 1500, max: 4500, t: '1–2 дня', k: 'чёрный экран монитор нет сигнала' }
  ],
  laptop: [
    { n: 'Не включается или не заряжается', d: 'Зарядное, разъём, плата питания', min: 1800, max: 5500, t: '1–3 дня', k: 'не заряжается батарея зарядка разъём не включается' },
    { n: 'Разбит экран', d: 'Замена матрицы', min: 3500, max: 12000, t: '2–5 дней', k: 'треснул экран разбит матрица полосы' },
    { n: 'Греется и выключается', d: 'Чистка системы охлаждения, термопаста', min: 1800, max: 3200, t: '1 день', k: 'перегрев жарко шумит выключается кулер' },
    { n: 'Залит жидкостью', d: 'Срочная чистка платы', min: 2500, max: 9000, t: '2–5 дней', k: 'залил чай кофе вода жидкость' },
    { n: 'Не работает клавиатура или тачпад', d: 'Шлейф, замена клавиатуры', min: 1500, max: 4500, t: '1–3 дня', k: 'клавиши кнопки тачпад мышь' },
    { n: 'Быстро садится батарея', d: 'Замена аккумулятора', min: 2200, max: 5500, t: '1–2 дня', k: 'аккумулятор батарея разряжается' },
    { n: 'Медленно работает', d: 'Замена HDD на SSD, чистка системы', min: 1800, max: 4000, t: '1 день', k: 'тормозит медленно долго грузится ssd' }
  ],
  appliance: [
    { n: 'Стиральная машина не сливает воду или не отжимает', d: 'Насос, фильтр, датчик', min: 1800, max: 4500, t: '1 день', k: 'стиралка стиральная не сливает отжим вода' },
    { n: 'Стиральная машина течёт или шумит', d: 'Манжета, подшипники', min: 3000, max: 7500, t: '1–3 дня', k: 'стиралка протекает подшипник гремит' },
    { n: 'Холодильник не морозит', d: 'Датчик, компрессор, утечка', min: 2500, max: 8500, t: '1–3 дня', k: 'холодильник не холодит тёплый компрессор' },
    { n: 'Холодильник шумит, намерзает лёд', d: 'Вентилятор, система разморозки', min: 2000, max: 6000, t: '1–3 дня', k: 'холодильник наледь шум гудит стучит' },
    { n: 'Микроволновка не греет', d: 'Магнетрон, диод, предохранитель', min: 1500, max: 3800, t: '1–2 дня', k: 'микроволновка свч не греет искрит' },
    { n: 'Посудомоечная не набирает воду или не сушит', d: 'Клапан, нагреватель, датчики', min: 2000, max: 5500, t: '1–3 дня', k: 'посудомойка посудомоечная вода сушка' },
    { n: 'Плита или духовка не греет', d: 'ТЭН, термостат, переключатель', min: 1800, max: 4800, t: '1–2 дня', k: 'духовка плита конфорка тэн электроплита' },
    { n: 'Пылесос или мелкая техника', d: 'Двигатель, плата, шнур', min: 1000, max: 3000, t: '1–3 дня', k: 'пылесос утюг блендер чайник мясорубка' }
  ]
};

const FAQ = [
  { q: 'Сколько стоит диагностика?', a: 'Если вы ремонтируете технику у нас — диагностика бесплатна. Если после диагностики отказываетесь от ремонта, берём 500 ₽ за работу мастера. Об этом говорим заранее.', tags: ['all'] },
  { q: 'Когда я узнаю окончательную цену?', a: 'После диагностики и до начала ремонта. Мастер называет сумму и срок, вы решаете, соглашаться ли. Без вашего согласия ничего не меняем и не заменяем.', tags: ['all'] },
  { q: 'Нужна ли предоплата?', a: 'За ремонт — нет. Платите после работы, когда проверили, что техника включается и работает. Предоплата возможна только если для вашей модели нужно заказывать дорогую деталь — тогда мы объясняем это заранее.', tags: ['all'] },
  { q: 'Вы выезжаете на дом?', a: 'Да, по Чите. Выезд мастера — 700 ₽, входит в стоимость, если ремонт выполнен на месте. Телевизоры и крупную технику чаще проще осмотреть дома, компьютеры и ноутбуки — в сервисе.', tags: ['all', 'tv', 'appliance'] },
  { q: 'Какая гарантия на ремонт?', a: 'На работы и установленные детали даём гарантию от 30 до 180 дней в зависимости от вида ремонта. Срок и условия записываем в акте выполненных работ.', tags: ['all'] },
  { q: 'Что, если ремонт невыгоден?', a: 'Так и скажем. Если стоимость ремонта близка к цене новой техники или нужной детали нет, мастер объяснит варианты. Решение всегда за вами.', tags: ['all', 'tv', 'appliance'] },
  { q: 'Сохранятся ли мои данные на компьютере или ноутбуке?', a: 'Мы не удаляем данные без вашего согласия. Если для ремонта нужна переустановка системы, сначала предупредим и по возможности сохраним файлы. Важные данные лучше скопировать заранее.', tags: ['pc', 'laptop'] },
  { q: 'Что делать, если ноутбук залит жидкостью?', a: 'Сразу выключите, отключите зарядку, не включайте повторно и привезите как можно быстрее. Чем меньше времени прошло, тем выше шанс обойтись чисткой.', tags: ['laptop'] },
  { q: 'Как оплатить?', a: 'Наличными или картой после ремонта. Выдаём акт выполненных работ.', tags: ['all'] },
  { q: 'Сколько занимает ремонт?', a: 'Простые неисправности — в тот же или следующий день. Если нужна деталь под заказ — сообщим срок после диагностики. Ориентиры по каждой поломке указаны в каталоге неисправностей.', tags: ['all', 'tv', 'pc', 'laptop', 'appliance'] }
];

const REVIEWS_DEMO = [
  { n: 'Имя клиента', t: 'Здесь будет отзыв реального клиента: что сломалось, как быстро позвонили, совпала ли итоговая цена с названной.' },
  { n: 'Имя клиента', t: 'Шаблон для второго отзыва. Заменяйте текстом клиента только с его разрешения.' },
  { n: 'Имя клиента', t: 'Шаблон для третьего отзыва. Хорошо, если в отзыве есть тип техники и примерная дата ремонта.' }
];

/* ================= Утилиты ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = (n) => Math.round(n).toLocaleString('ru-RU').replace(/\u00a0/g, ' ') + '\u00a0₽';
const store = {
  get(k, s) { try { return (s ? sessionStorage : localStorage).getItem(k); } catch (e) { return null; } },
  set(k, v, s) { try { (s ? sessionStorage : localStorage).setItem(k, v); } catch (e) { /* ignore */ } }
};
const file = (location.pathname.split('/').pop() || 'index.html');
const minOf = (cat) => Math.min(...CATALOG[cat].map((x) => x.min));
const ICON = {
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  x: 'M6 6l12 12M18 6L6 18',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-4-4',
  menu: 'M4 7h16M4 12h16M4 17h16',
  chev: 'M6 9l6 6 6-6',
  alert: 'M12 8v5m0 3.5v.01M10.3 4.2 2.7 17.5A2 2 0 0 0 4.4 20.5h15.2a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z'
};
const icon = (n, c = 'h-5 w-5') => `<svg class="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ICON[n]}"/></svg>`;
const logo = `<span class="grid h-9 w-9 place-items-center rounded-lg border border-white/30"><svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M9 20h6M12 16v4"/></svg></span>`;

/* ================= Шапка и подвал ================= */
function renderHeader() {
  const host = $('#site-header');
  if (!host) return;
  const link = (h, t, cls = '') => `<a href="${h}" class="nav-link ${cls} ${file === h ? 'is-active' : ''}" ${file === h ? 'aria-current="page"' : ''}>${t}</a>`;
  const svcActive = SERVICES.some((s) => s[0] === file);
  host.innerHTML = `
  <header class="sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-white backdrop-blur">
    <div class="hidden border-b border-white/10 text-sm text-mist/80 lg:block">
      <div class="wrap flex items-center justify-between py-2"><span>${C.address}</span><span>${C.hours}</span></div>
    </div>
    <div class="wrap flex h-16 items-center justify-between gap-4">
      <a href="index.html" class="flex items-center gap-3 text-lg font-semibold tracking-tight" aria-label="${C.brand} — на главную">${logo}${C.brand}</a>
      <nav class="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
        ${link('index.html', 'Главная')}
        <div class="group relative">
          <button type="button" class="nav-link ${svcActive ? 'is-active' : ''} inline-flex items-center gap-1" aria-haspopup="true">Услуги ${icon('chev', 'h-4 w-4')}</button>
          <div class="invisible absolute left-0 top-full w-56 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
            <div class="rounded-xl border border-white/10 bg-graphite p-2 shadow-2xl">${SERVICES.map((s) => link(s[0], s[1], 'block')).join('')}</div>
          </div>
        </div>
        ${NAV.slice(1).map((n) => link(n[0], n[1])).join('')}
      </nav>
      <div class="flex items-center gap-3">
        <a href="tel:${C.phoneRaw}" class="hidden text-right leading-tight xl:block"><span class="block text-lg font-semibold">${C.phone}</span><span class="text-xs text-mist/70">Звонок по Чите и области</span></a>
        <button type="button" data-open="request" class="btn btn-light hidden sm:inline-flex">Заявка на ремонт</button>
        <button type="button" id="burger" class="grid h-11 w-11 place-items-center rounded-lg border border-white/20 lg:hidden" aria-label="Открыть меню" aria-expanded="false" aria-controls="mobile-menu">${icon('menu', 'h-6 w-6')}</button>
      </div>
    </div>
    <div id="mobile-menu" class="fixed inset-x-0 bottom-0 top-16 hidden overflow-y-auto bg-ink lg:hidden">
      <nav class="wrap flex flex-col gap-1 py-6" aria-label="Мобильная навигация">
        ${link('index.html', 'Главная', 'm-link')}
        <p class="mt-4 px-3 text-sm text-mist/60">Что ремонтируем</p>
        ${SERVICES.map((s) => link(s[0], s[1], 'm-link')).join('')}
        <p class="mt-4 px-3 text-sm text-mist/60">О сервисе</p>
        ${NAV.slice(1).map((n) => link(n[0], n[1], 'm-link')).join('')}
        <a href="tel:${C.phoneRaw}" class="btn btn-light mt-6 w-full">${icon('phone')} Позвонить ${C.phone}</a>
        <button type="button" data-open="request" class="btn btn-ghost mt-3 w-full">Оставить заявку</button>
      </nav>
    </div>
  </header>`;
  const burger = $('#burger'), menu = $('#mobile-menu');
  const toggle = (open) => {
    menu.classList.toggle('hidden', !open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    burger.innerHTML = icon(open ? 'x' : 'menu', 'h-6 w-6');
    document.body.classList.toggle('overflow-hidden', open);
  };
  burger.addEventListener('click', () => toggle(menu.classList.contains('hidden')));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => toggle(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.classList.contains('hidden')) toggle(false); });
  matchMedia('(min-width:1024px)').addEventListener('change', (e) => { if (e.matches) toggle(false); });
}

function renderFooter() {
  const host = $('#site-footer');
  if (!host) return;
  host.innerHTML = `
  <footer class="bg-ink pb-28 pt-16 text-mist lg:pb-12">
    <div class="wrap grid gap-10 md:grid-cols-4">
      <div class="md:col-span-1">
        <a href="index.html" class="flex items-center gap-3 text-lg font-semibold text-white">${logo}${C.brand}</a>
        <p class="mt-4 text-sm text-mist/70">Ремонт телевизоров, компьютеров, ноутбуков и бытовой техники в Чите.</p>
      </div>
      <div><p class="font-semibold text-white">Услуги</p><ul class="mt-4 space-y-2 text-sm">${SERVICES.map((s) => `<li><a class="hover:text-white" href="${s[0]}">${s[1]}</a></li>`).join('')}</ul></div>
      <div><p class="font-semibold text-white">Сервис</p><ul class="mt-4 space-y-2 text-sm">${NAV.slice(1).map((n) => `<li><a class="hover:text-white" href="${n[0]}">${n[1]}</a></li>`).join('')}</ul></div>
      <div><p class="font-semibold text-white">Связаться</p>
        <a href="tel:${C.phoneRaw}" class="mt-4 block text-xl font-semibold text-white">${C.phone}</a>
        <p class="mt-2 text-sm">${C.hours}</p><p class="mt-1 text-sm">${C.address}</p>
        <a class="mt-1 block text-sm underline" href="mailto:${C.email}">${C.email}</a></div>
    </div>
    <div class="wrap mt-12 border-t border-white/10 pt-6 text-xs text-mist/60">
      <p>Демонстрационный сайт вымышленной компании. Все названия, адреса, телефоны и цены — учебные; цены ориентировочные и не являются публичной офертой.</p>
      <p class="mt-2">© ${new Date().getFullYear()} ${C.brand}. <a class="underline" href="contacts.html#privacy">Обработка персональных данных</a></p>
    </div>
  </footer>
  <div class="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-px border-t border-white/10 bg-white/10 lg:hidden">
    <a href="tel:${C.phoneRaw}" class="flex h-14 items-center justify-center gap-2 bg-white font-semibold text-ink">${icon('phone')} Позвонить</a>
    <button type="button" data-open="request" class="h-14 bg-ink font-semibold text-white">Заявка</button>
  </div>
  <a href="tel:${C.phoneRaw}" class="fixed bottom-6 right-6 z-30 hidden h-14 w-14 place-items-center rounded-full bg-white text-ink shadow-2xl ring-1 ring-black/10 transition hover:scale-105 lg:grid" aria-label="Позвонить: ${C.phone}" title="${C.phone}">${icon('phone', 'h-6 w-6')}</a>`;
}

/* ================= Модальные окна ================= */
let lastFocus = null;
const modals = {};
function buildModal(id, title, lead, body) {
  const el = document.createElement('div');
  el.id = 'modal-' + id;
  el.className = 'fixed inset-0 z-50 hidden items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6';
  el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-labelledby', 'mt-' + id);
  el.innerHTML = `<div class="modal-card relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 text-ink shadow-2xl sm:rounded-2xl sm:p-8">
    <button type="button" data-close class="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-lg text-steel hover:bg-mist" aria-label="Закрыть">${icon('x')}</button>
    <h2 id="mt-${id}" class="pr-10 text-2xl font-semibold tracking-tight">${title}</h2>
    <p class="mt-2 text-steel">${lead}</p><div class="mt-6">${body}</div></div>`;
  el.addEventListener('mousedown', (e) => { if (e.target === el) closeModal(id); });
  $$('[data-close]', el).forEach((b) => b.addEventListener('click', () => closeModal(id)));
  document.body.appendChild(el);
  modals[id] = el;
}
function openModal(id, pre = {}) {
  const el = modals[id]; if (!el) return;
  Object.values(modals).forEach((m) => m !== el && m.classList.contains('flex') && closeModal(m.id.slice(6), true));
  lastFocus = document.activeElement;
  const form = $('form', el);
  if (form) {
    resetForm(form);
    if (pre.device && form.device) form.device.value = pre.device;
    if (pre.problem && form.problem) form.problem.value = pre.problem;
  }
  el.classList.remove('hidden'); el.classList.add('flex');
  document.body.classList.add('overflow-hidden');
  requestAnimationFrame(() => el.classList.add('is-open'));
  const first = $('input:not([type=hidden]):not(.hidden), select, textarea, button[data-close]', el);
  setTimeout(() => first && first.focus(), 60);
}
function closeModal(id, keepFocus) {
  const el = modals[id]; if (!el) return;
  el.classList.remove('is-open', 'flex'); el.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  if (!keepFocus && lastFocus && lastFocus.focus) lastFocus.focus();
}
function setupModals() {
  buildModal('request', 'Заявка на ремонт', 'Оставьте номер — перезвоним в рабочее время, уточним неисправность и подскажем стоимость.', leadForm({ source: 'modal-request' }));
  buildModal('callback', 'Подсказать по вашей поломке?', 'Оставьте номер телефона — перезвоним и ответим на вопросы. Это ни к чему не обязывает.', leadForm({ short: true, source: 'popup-callback' }));
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-open]');
    if (t) { e.preventDefault(); openModal(t.dataset.open, { device: t.dataset.device, problem: t.dataset.problem }); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') Object.keys(modals).forEach((k) => modals[k].classList.contains('flex') && closeModal(k));
    if (e.key === 'Tab') { // удерживаем фокус внутри открытого окна
      const open = Object.values(modals).find((m) => m.classList.contains('flex'));
      if (!open) return;
      const f = $$('a[href],button:not([disabled]),input:not(.hidden):not([type=hidden]),select,textarea', open).filter((x) => x.offsetParent !== null);
      if (!f.length) return;
      const a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });
}

/* Автоматический popup: один раз за сессию — через 35 секунд или при попытке уйти со страницы (десктоп) */
function setupAutoPopup() {
  if (file === 'contacts.html' || store.get('rk_popup', true)) return;
  const show = () => {
    if (store.get('rk_popup', true) || Object.values(modals).some((m) => m.classList.contains('flex'))) return;
    store.set('rk_popup', '1', true);
    openModal('callback');
  };
  setTimeout(show, 35000);
  document.addEventListener('mouseleave', (e) => { if (e.clientY <= 0 && matchMedia('(hover:hover)').matches) show(); });
}

/* ================= Cookie ================= */
function setupCookie() {
  if (store.get('rk_cookie')) return;
  const b = document.createElement('div');
  b.className = 'fixed bottom-20 left-4 right-4 z-40 max-w-md rounded-xl border border-white/10 bg-graphite p-5 text-sm text-mist shadow-2xl sm:left-6 lg:bottom-6';
  b.setAttribute('role', 'region'); b.setAttribute('aria-label', 'Уведомление о cookie');
  b.innerHTML = `<p>Сайт использует cookie, чтобы работали формы и запоминался ваш выбор. Продолжая пользоваться сайтом, вы соглашаетесь с этим.</p>
    <div class="mt-4 flex gap-3"><button type="button" class="btn btn-light !min-h-[44px] flex-1" data-ok>Понятно</button><a class="btn btn-ghost !min-h-[44px]" href="contacts.html#privacy">Подробнее</a></div>`;
  $('[data-ok]', b).addEventListener('click', () => { store.set('rk_cookie', '1'); b.remove(); });
  document.body.appendChild(b);
}

/* ================= Формы ================= */
function leadForm(o = {}) {
  return `<form class="lead-form space-y-4" novalidate data-source="${esc(o.source || 'page')}">
    <div class="grid gap-4 ${o.short ? '' : 'sm:grid-cols-2'}">
      <label class="block"><span class="lbl">Имя</span><input name="name" autocomplete="name" class="input" placeholder="Например, Сергей"><em class="err" data-err="name"></em></label>
      <label class="block"><span class="lbl">Телефон <b class="font-semibold">*</b></span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" class="input" placeholder="+7 (___) ___-__-__"><em class="err" data-err="phone"></em></label>
    </div>
    ${o.short ? '' : `
    <label class="block"><span class="lbl">Что отремонтировать</span><select name="device" class="input">${Object.entries(DEVICES).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select></label>
    <label class="block"><span class="lbl">Что случилось</span><textarea name="problem" rows="3" class="input" placeholder="Например: телевизор Samsung включается и сразу гаснет"></textarea></label>`}
    <div><label class="flex items-start gap-3 text-sm text-steel"><input type="checkbox" name="consent" class="mt-0.5 h-5 w-5 shrink-0 accent-ink"><span>Согласен на обработку персональных данных для обратной связи. <a class="underline" href="contacts.html#privacy">Подробнее</a></span></label><em class="err" data-err="consent"></em></div>
    <input type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true">
    <button class="btn btn-dark w-full" type="submit"><span data-label>Отправить заявку</span></button>
    <div class="status" role="status" aria-live="polite"></div>
  </form>`;
}
function reviewForm() {
  return `<form class="lead-form space-y-4" novalidate data-source="review" data-kind="review">
    <label class="block"><span class="lbl">Имя</span><input name="name" class="input" placeholder="Как к вам обращаться"><em class="err" data-err="name"></em></label>
    <label class="block"><span class="lbl">Оценка</span><select name="rating" class="input"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select></label>
    <label class="block"><span class="lbl">Ваш отзыв</span><textarea name="text" rows="4" class="input" placeholder="Что ремонтировали, что понравилось, что можно улучшить"></textarea><em class="err" data-err="text"></em></label>
    <label class="flex items-start gap-3 text-sm text-steel"><input type="checkbox" name="consent" class="mt-0.5 h-5 w-5 shrink-0 accent-ink"><span>Согласен на публикацию отзыва после проверки.</span></label><em class="err" data-err="consent"></em>
    <input type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true">
    <button class="btn btn-dark w-full" type="submit"><span data-label>Отправить отзыв</span></button>
    <div class="status" role="status" aria-live="polite"></div>
  </form>`;
}
function maskPhone(v) {
  let d = v.replace(/\D/g, '');
  if (d[0] === '8') d = '7' + d.slice(1);
  if (d[0] !== '7') d = '7' + d;
  d = d.slice(0, 11);
  let r = '+7';
  if (d.length > 1) r += ' (' + d.slice(1, 4);
  if (d.length >= 5) r += ') ' + d.slice(4, 7);
  if (d.length >= 8) r += '-' + d.slice(7, 9);
  if (d.length >= 10) r += '-' + d.slice(9, 11);
  return r;
}
function resetForm(f) {
  const stash = f.parentElement && f.parentElement.querySelector('.success-box');
  if (stash) { stash.remove(); f.classList.remove('hidden'); }
  f.reset();
  $$('.err', f).forEach((e) => { e.textContent = ''; });
  $$('.input', f).forEach((i) => i.classList.remove('invalid'));
  const s = $('.status', f); if (s) { s.className = 'status'; s.innerHTML = ''; }
  setBusy(f, false);
}
function setBusy(f, busy) {
  const b = $('button[type=submit]', f); if (!b) return;
  b.disabled = busy;
  $('[data-label]', b).textContent = busy ? 'Отправляем…' : (f.dataset.kind === 'review' ? 'Отправить отзыв' : 'Отправить заявку');
}
function showErr(f, name, msg) {
  const e = $(`[data-err="${name}"]`, f); if (e) e.textContent = msg;
  const i = f.elements[name]; if (i && i.classList) i.classList.add('invalid');
}
function validate(f) {
  $$('.err', f).forEach((e) => { e.textContent = ''; });
  $$('.input', f).forEach((i) => i.classList.remove('invalid'));
  let ok = true, first = null;
  const bad = (n, m) => { showErr(f, n, m); ok = false; if (!first) first = f.elements[n]; };
  const review = f.dataset.kind === 'review';
  if (review) {
    if (f.name.value.trim().length < 2) bad('name', 'Укажите имя');
    if (f.text.value.trim().length < 15) bad('text', 'Напишите хотя бы пару предложений (от 15 символов)');
  } else if (f.phone.value.replace(/\D/g, '').length !== 11) bad('phone', 'Введите номер полностью: 11 цифр, например +7 (924) 123-45-67');
  if (!f.consent.checked) bad('consent', 'Поставьте галочку, иначе мы не можем принять заявку');
  if (first) first.focus();
  return ok;
}
async function send(payload) {
  if (!navigator.onLine) throw new Error('offline');
  if (C.endpoint) {
    const r = await fetch(C.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!r.ok) throw new Error('http ' + r.status);
    return;
  }
  await new Promise((r) => setTimeout(r, 800)); // демо-режим
  try {
    const list = JSON.parse(store.get('rk_leads') || '[]'); list.push(payload); store.set('rk_leads', JSON.stringify(list));
  } catch (e) { /* ignore */ }
}
function setupForms() {
  $$('[data-lead-form]').forEach((h) => { h.innerHTML = leadForm({ source: h.dataset.leadForm || 'page' }); const f = $('form', h); if (h.dataset.device) f.device.value = h.dataset.device; });
  $$('[data-review-form]').forEach((h) => { h.innerHTML = reviewForm(); });
  document.addEventListener('input', (e) => {
    if (e.target.name === 'phone') {
      const v = e.target.value, del = (e.inputType || '').startsWith('delete');
      e.target.value = (!v.replace(/\D/g, '') || (del && v.replace(/\D/g, '').length <= 1)) ? '' : maskPhone(v);
    }
    if (e.target.classList && e.target.classList.contains('invalid')) e.target.classList.remove('invalid');
  });
  document.addEventListener('submit', async (e) => {
    const f = e.target.closest('.lead-form'); if (!f) return;
    e.preventDefault();
    if (f.website && f.website.value) return; // антиспам-ловушка
    if (!validate(f)) return;
    const review = f.dataset.kind === 'review';
    const payload = review
      ? { type: 'review', name: f.name.value.trim(), rating: f.rating.value, text: f.text.value.trim(), at: new Date().toISOString() }
      : { type: 'lead', source: f.dataset.source, name: f.name.value.trim(), phone: f.phone.value, device: f.device ? f.device.value : '', problem: f.problem ? f.problem.value.trim() : '', page: file, at: new Date().toISOString() };
    const status = $('.status', f);
    setBusy(f, true); status.className = 'status'; status.innerHTML = '';
    try {
      await send(payload);
      const box = document.createElement('div');
      box.className = 'success-box rounded-xl border border-ink/15 bg-paper p-6 text-center';
      box.innerHTML = `<span class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ink text-white">${icon('check', 'h-7 w-7')}</span>
        <p class="mt-4 text-xl font-semibold">${review ? 'Спасибо за отзыв' : 'Заявка принята'}</p>
        <p class="mt-2 text-steel">${review ? 'Он появится на сайте после проверки.' : `Перезвоним на ${esc(payload.phone)} в рабочее время (${C.hours}). Если срочно — позвоните: <a class="font-semibold underline" href="tel:${C.phoneRaw}">${C.phone}</a>.`}</p>
        <button type="button" class="btn btn-outline mt-5" data-again>${review ? 'Написать ещё' : 'Отправить другую заявку'}</button>`;
      f.classList.add('hidden'); f.parentElement.appendChild(box);
      $('[data-again]', box).addEventListener('click', () => resetForm(f));
      setBusy(f, false);
    } catch (err) {
      setBusy(f, false);
      status.className = 'status status-error';
      status.innerHTML = `${icon('alert', 'mt-0.5 h-5 w-5 shrink-0')}<span>Заявка не отправилась${navigator.onLine ? '' : ': нет подключения к интернету'}. Проверьте связь и попробуйте ещё раз или позвоните: <a class="font-semibold underline" href="tel:${C.phoneRaw}">${C.phone}</a>.</span>`;
    }
  });
}

/* ================= Поиск услуги ================= */
function setupSearch() {
  $$('[data-search]').forEach((host, idx) => {
    const flat = Object.entries(CATALOG).flatMap(([c, arr]) => arr.map((x) => ({ ...x, c })));
    const id = 'sr' + idx;
    host.innerHTML = `<label for="${id}-i" class="lbl-dark">Опишите, что случилось</label>
      <div class="relative mt-2"><span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mat">${icon('search')}</span>
      <input id="${id}-i" type="search" autocomplete="off" class="input input-dark !pl-12" placeholder="Например: не включается, нет звука, течёт" aria-controls="${id}-l"></div>
      <ul id="${id}-l" class="mt-3 space-y-2" aria-live="polite"></ul>
      <div class="mt-4 flex flex-wrap gap-2">${['не включается', 'нет изображения', 'не сливает воду', 'тормозит', 'греется'].map((q) => `<button type="button" class="chip" data-q="${q}">${q}</button>`).join('')}</div>`;
    const input = $('input', host), list = $('ul', host);
    const run = () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { list.innerHTML = ''; return; }
      const words = q.split(/\s+/);
      const res = flat.map((x) => {
        const hay = (x.n + ' ' + x.d + ' ' + x.k + ' ' + CATS[x.c].name).toLowerCase();
        const score = words.reduce((s, w) => s + (hay.includes(w.slice(0, Math.max(3, w.length - 2))) ? 1 : 0), 0);
        return { x, score };
      }).filter((r) => r.score > 0).sort((a, b) => b.score - a.score).slice(0, 4);
      list.innerHTML = res.length ? res.map(({ x }) => `<li><a href="${CATS[x.c].url}#faults" class="result"><span><span class="block font-medium text-white">${esc(x.n)}</span><span class="text-sm text-mist/70">${CATS[x.c].name} · от ${money(x.min)} · ${x.t}</span></span><span class="text-mist/70">Открыть</span></a></li>`).join('')
        : `<li class="rounded-lg border border-white/15 p-4 text-mist">Точного совпадения нет — это нормально. <button type="button" class="font-semibold text-white underline" data-open="request" data-problem="${esc(input.value)}">Опишите проблему в заявке</button>, мастер подскажет по телефону.</li>`;
    };
    input.addEventListener('input', run);
    host.addEventListener('click', (e) => { const b = e.target.closest('[data-q]'); if (b) { input.value = b.dataset.q; run(); input.focus(); } });
  });
}

/* ================= Каталог неисправностей ================= */
function setupCatalog() {
  $$('[data-catalog]').forEach((host) => {
    let cat = host.dataset.catalog;
    const tabs = cat === 'all';
    if (tabs) cat = 'tv';
    host.innerHTML = `${tabs ? `<div class="flex flex-wrap gap-2" role="tablist" aria-label="Тип техники">${Object.entries(CATS).map(([k, v]) => `<button type="button" role="tab" class="tab" data-tab="${k}" aria-selected="${k === cat}">${v.name}</button>`).join('')}</div>` : ''}
      <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3" data-grid></div>`;
    const grid = $('[data-grid]', host);
    const draw = () => {
      grid.innerHTML = CATALOG[cat].map((x) => `<article class="fault">
        <h3 class="text-lg font-semibold leading-snug">${esc(x.n)}</h3>
        <p class="mt-2 text-steel">Частая причина: ${esc(x.d.charAt(0).toLowerCase() + x.d.slice(1))}</p>
        <dl class="mt-4 flex gap-8 text-sm"><div><dt class="text-mat">Работы</dt><dd class="text-base font-semibold">${money(x.min)} – ${money(x.max)}</dd></div><div><dt class="text-mat">Срок</dt><dd class="text-base font-semibold">${x.t}</dd></div></dl>
        <button type="button" class="btn btn-outline mt-5 w-full" data-open="request" data-device="${CATS[cat].dev}" data-problem="${esc(x.n)}">Узнать точную цену</button></article>`).join('');
    };
    host.addEventListener('click', (e) => {
      const t = e.target.closest('[data-tab]'); if (!t) return;
      cat = t.dataset.tab; $$('[data-tab]', host).forEach((b) => b.setAttribute('aria-selected', String(b === t))); draw();
    });
    draw();
  });
  $$('[data-from]').forEach((el) => { el.textContent = 'от ' + money(minOf(el.dataset.from)); });
}

/* ================= Цены ================= */
function setupPrices() {
  $$('[data-prices]').forEach((host) => {
    const keys = host.dataset.prices === 'all' ? Object.keys(CATS) : [host.dataset.prices];
    host.innerHTML = keys.map((k) => `<section class="${keys.length > 1 ? 'mt-12 first:mt-0' : ''}">
      ${keys.length > 1 ? `<h3 class="text-2xl font-semibold tracking-tight"><a class="hover:underline" href="${CATS[k].url}">${CATS[k].name}</a></h3>` : ''}
      <div class="mt-4 overflow-x-auto rounded-xl border border-ink/10 bg-white"><table class="w-full min-w-[560px] text-left">
        <thead class="bg-paper text-sm text-steel"><tr><th class="p-4 font-medium">Неисправность</th><th class="p-4 font-medium">Работы, ₽</th><th class="p-4 font-medium">Срок</th></tr></thead>
        <tbody>${CATALOG[k].map((x) => `<tr class="border-t border-ink/10"><td class="p-4 font-medium">${esc(x.n)}</td><td class="p-4 whitespace-nowrap">${money(x.min)} – ${money(x.max)}</td><td class="p-4 whitespace-nowrap text-steel">${x.t}</td></tr>`).join('')}</tbody>
      </table></div></section>`).join('');
  });
}

/* ================= Калькулятор ================= */
function setupCalc() {
  $$('[data-calc]').forEach((host, i) => {
    const pre = host.dataset.calc;
    const opt = (arr) => arr.map(([v, t]) => `<option value="${v}">${t}</option>`).join('');
    host.innerHTML = `<div class="grid gap-4 sm:grid-cols-2">
      <label class="block"><span class="lbl">Техника</span><select class="input" data-c="cat">${opt(Object.entries(CATS).map(([k, v]) => [k, v.name]))}</select></label>
      <label class="block"><span class="lbl">Что случилось</span><select class="input" data-c="fault"></select></label>
      <label class="block"><span class="lbl">Срочность</span><select class="input" data-c="urgent"><option value="0">Обычная</option><option value="1">Срочно (в первую очередь)</option></select></label>
      <label class="block"><span class="lbl">Где ремонтировать</span><select class="input" data-c="visit"><option value="0">Привезу в сервис</option><option value="1">Нужен выезд мастера по Чите</option></select></label>
    </div>
    <div class="mt-6 rounded-xl bg-ink p-5 text-white" aria-live="polite"><p class="text-sm text-mist/70">Ориентировочная стоимость</p>
      <p class="mt-1 text-3xl font-semibold tracking-tight" data-out>—</p><p class="mt-2 text-sm text-mist/70" data-note></p></div>
    <p class="mt-3 text-sm text-steel">Это предварительная оценка. Точную цену мастер назовёт после диагностики и до начала ремонта.</p>
    <button type="button" class="btn btn-dark mt-4 w-full" data-send>Оставить заявку с этой оценкой</button>`;
    const g = (n) => $(`[data-c="${n}"]`, host);
    if (pre && CATS[pre]) g('cat').value = pre;
    const fill = () => {
      g('fault').innerHTML = `<option value="-1">Не знаю — нужна диагностика</option>` + CATALOG[g('cat').value].map((x, j) => `<option value="${j}">${esc(x.n)}</option>`).join('');
    };
    const calc = () => {
      const arr = CATALOG[g('cat').value], j = +g('fault').value;
      let lo = j < 0 ? Math.min(...arr.map((x) => x.min)) : arr[j].min;
      let hi = j < 0 ? Math.max(...arr.map((x) => x.max)) : arr[j].max;
      if (g('urgent').value === '1') { lo *= 1.2; hi *= 1.2; }
      const visit = g('visit').value === '1' ? 700 : 0;
      const r = (n) => Math.round(n / 50) * 50;
      $('[data-out]', host).textContent = `${money(r(lo + visit))} – ${money(r(hi + visit))}`;
      $('[data-note]', host).textContent = (j < 0 ? 'Диапазон по всем типовым поломкам — после диагностики он сузится. ' : '') + (g('urgent').value === '1' ? 'Срочный ремонт +20%. ' : '') + (visit ? 'Выезд мастера 700 ₽ включён.' : 'Диагностика при ремонте бесплатна.');
    };
    host.addEventListener('change', (e) => { if (e.target === g('cat')) fill(); calc(); });
    $('[data-send]', host).addEventListener('click', () => {
      const j = +g('fault').value, arr = CATALOG[g('cat').value];
      openModal('request', { device: CATS[g('cat').value].dev, problem: (j < 0 ? 'Нужна диагностика' : arr[j].n) + ' (оценка с сайта: ' + $('[data-out]', host).textContent + ')' });
    });
    fill(); calc();
  });
}

/* ================= FAQ и отзывы ================= */
function setupFaq() {
  $$('[data-faq]').forEach((host) => {
    const tag = host.dataset.faq, lim = +host.dataset.limit || 99;
    const items = FAQ.filter((f) => tag === 'all' || f.tags.includes(tag) || f.tags.includes('all')).slice(0, lim);
    host.innerHTML = items.map((f) => `<details class="faq"><summary>${esc(f.q)}${icon('chev', 'faq-i h-5 w-5 shrink-0')}</summary><p>${esc(f.a)}</p></details>`).join('');
    host.addEventListener('toggle', (e) => { if (e.target.open) $$('details', host).forEach((d) => d !== e.target && (d.open = false)); }, true);
  });
}
function setupReviews() {
  $$('[data-reviews]').forEach((host) => {
    host.innerHTML = REVIEWS_DEMO.map((r) => `<article class="rounded-xl border border-dashed border-ink/25 bg-white p-6"><p class="inline-block rounded-md bg-mist px-2 py-1 text-xs text-steel">Макет: заменить реальным отзывом</p><p class="mt-4 text-lg leading-relaxed">${esc(r.t)}</p><p class="mt-4 font-semibold">${esc(r.n)}</p></article>`).join('');
  });
}

/* ================= Анимации ================= */
function setupReveal() {
  const els = $$('.reveal');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach((e) => e.classList.add('in')); return; }
  const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: 0.12 });
  els.forEach((e) => io.observe(e));
}

/* ================= Запуск ================= */
function init() {
  renderHeader(); renderFooter();
  setupModals(); setupForms(); setupSearch(); setupCatalog(); setupPrices(); setupCalc(); setupFaq(); setupReviews();
  setupReveal(); setupCookie(); setupAutoPopup();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

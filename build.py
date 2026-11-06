# -*- coding: utf-8 -*-
# Генерирует статические HTML-файлы. Результат — обычные самостоятельные .html.
import os
OUT = os.path.dirname(os.path.abspath(__file__))

HEAD = '''<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>__TITLE__</title>
<meta name="description" content="__DESC__">
<meta name="theme-color" content="#0E0F11">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%230E0F11'/%3E%3Crect x='7' y='9' width='18' height='11' rx='2' fill='none' stroke='white' stroke-width='2'/%3E%3Cpath d='M12 24h8' stroke='white' stroke-width='2'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config = { theme: { extend: {
  colors: { ink:'#0E0F11', graphite:'#191B1E', coal:'#24272B', steel:'#4A4F57', mat:'#8A9099', mist:'#E4E5E7', paper:'#F4F4F2' },
  fontFamily: { sans: ['"Golos Text"','system-ui','-apple-system','"Segoe UI"','Roboto','Arial','sans-serif'] }
} } };
</script>
<style type="text/tailwindcss">
@layer base {
  html { scroll-behavior: smooth; font-size: 17px; }
  body { @apply bg-paper font-sans text-ink antialiased; }
  :focus-visible { outline: 3px solid #8A9099; outline-offset: 2px; }
  .bg-ink :focus-visible, .on-dark :focus-visible { outline-color: #fff; }
  h1, h2 { text-wrap: balance; }
}
@layer components {
  .wrap { @apply mx-auto w-full max-w-7xl px-5 sm:px-8; }
  .btn { @apply inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg px-6 text-base font-semibold transition disabled:cursor-wait disabled:opacity-60; }
  .btn-light { @apply bg-white text-ink hover:bg-mist; }
  .btn-dark { @apply bg-ink text-white hover:bg-coal; }
  .btn-ghost { @apply border border-white/30 text-white hover:bg-white/10; }
  .btn-outline { @apply border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white; }
  .nav-link { @apply rounded-lg px-3 py-2 text-[15px] text-mist/80 transition hover:bg-white/10 hover:text-white; }
  .nav-link.is-active { @apply bg-white/10 text-white; }
  .m-link { @apply block px-3 py-3 text-lg; }
  .input { @apply block min-h-[52px] w-full rounded-lg border border-ink/20 bg-white px-4 py-3 text-base text-ink placeholder:text-mat focus:border-ink; }
  .input.invalid { @apply border-red-700 bg-red-50; }
  .input-dark { @apply border-white/20 bg-coal text-white placeholder:text-mat focus:border-white; }
  .lbl { @apply mb-1.5 block text-sm font-medium text-steel; }
  .lbl-dark { @apply text-lg font-semibold; }
  .err { @apply mt-1.5 block text-sm not-italic text-red-700; }
  .status:empty { display: none; }
  .status-error { @apply flex gap-3 rounded-lg border border-red-700/30 bg-red-50 p-4 text-sm text-red-900; }
  .chip { @apply rounded-full border border-white/20 px-4 py-2 text-sm text-mist transition hover:border-white hover:text-white; }
  .result { @apply flex items-center justify-between gap-4 rounded-lg border border-white/15 bg-coal p-4 transition hover:border-white/60; }
  .tab { @apply min-h-[48px] rounded-lg border border-ink/20 bg-white px-5 font-medium transition hover:border-ink; }
  .tab[aria-selected="true"] { @apply border-ink bg-ink text-white; }
  .fault { @apply flex flex-col rounded-xl border border-ink/10 bg-white p-6; }
  .fault > button { margin-top: auto; }
  .faq { @apply rounded-xl border border-ink/10 bg-white; }
  .faq summary { @apply flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-lg font-semibold; }
  .faq summary::-webkit-details-marker { display: none; }
  .faq[open] .faq-i { transform: rotate(180deg); }
  .faq-i { transition: transform .2s; }
  .faq p { @apply px-5 pb-5 text-steel; animation: fadeIn .25s ease; }
  .sec { @apply py-16 md:py-24; }
  .h2 { @apply text-3xl font-semibold tracking-tight md:text-4xl; }
}
/* Анимация: одно появление при загрузке главного блока + ответ на действия пользователя */
.hero-in > * { animation: rise .7s cubic-bezier(.2,.7,.2,1) both; }
.hero-in > *:nth-child(2) { animation-delay: .08s; } .hero-in > *:nth-child(3) { animation-delay: .16s; } .hero-in > *:nth-child(4) { animation-delay: .24s; }
.reveal { opacity: 0; transform: translateY(14px); transition: opacity .6s ease, transform .6s ease; }
.reveal.in { opacity: 1; transform: none; }
.modal-card { transform: translateY(16px); opacity: 0; transition: transform .25s ease, opacity .25s ease; }
.is-open .modal-card { transform: none; opacity: 1; }
@keyframes rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } .reveal { opacity: 1; transform: none; } html { scroll-behavior: auto; } }
</style>
</head>
<body>
<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3">Перейти к содержанию</a>
<div id="site-header"></div>
<main id="main">
'''
TAIL = '''
</main>
<div id="site-footer"></div>
<noscript><p style="padding:16px;text-align:center">Для работы форм и калькулятора включите JavaScript. Позвоните нам: +7 (3022) 55-01-01</p></noscript>
<script src="js/main.js" defer></script>
</body>
</html>
'''

def page(fname, title, desc, body):
    html = HEAD.replace('__TITLE__', title).replace('__DESC__', desc) + body + TAIL
    with open(os.path.join(OUT, fname), 'w', encoding='utf-8') as f:
        f.write(html)

CALL = '<a href="tel:+73022550101" class="btn btn-light">Позвонить +7 (3022) 55-01-01</a>'
REQ = '<button type="button" data-open="request" class="btn btn-ghost">Оставить заявку</button>'

def hero(h1, lead, crumb=None, extra=''):
    c = ''
    if crumb:
        c = '<nav class="mb-6 text-sm text-mist/60" aria-label="Хлебные крошки"><a class="hover:text-white" href="index.html">Главная</a> / <span>%s</span></nav>' % crumb
    return '''<section class="bg-ink text-white on-dark"><div class="wrap py-14 md:py-20"><div class="hero-in max-w-3xl">
%s<h1 class="text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">%s</h1>
<p class="mt-5 text-lg text-mist/80 md:text-xl">%s</p>
<div class="mt-8 flex flex-col gap-3 sm:flex-row">%s%s</div>%s</div></div></section>''' % (c, h1, lead, CALL, REQ, extra)

def cta(title='Не уверены, что сломалось? Опишите — подскажем'):
    return '''<section class="sec bg-ink text-white on-dark"><div class="wrap grid items-start gap-10 lg:grid-cols-2">
<div class="reveal"><h2 class="h2">%s</h2>
<p class="mt-4 text-lg text-mist/80">Позвоните или оставьте заявку. Мастер уточнит симптомы, назовёт примерную цену и подскажет, везти технику или вызвать мастера.</p>
<a href="tel:+73022550101" class="mt-6 block text-3xl font-semibold tracking-tight md:text-4xl">+7 (3022) 55-01-01</a>
<p class="mt-2 text-mist/70">Пн–Сб 9:00–19:00, Вс 10:00–16:00</p>
<p class="mt-1 text-mist/70">г. Чита, ул. Амурская, 24 (вымышленный адрес)</p></div>
<div class="reveal rounded-2xl bg-white p-6 text-ink sm:p-8"><h3 class="mb-5 text-2xl font-semibold">Заявка на ремонт</h3><div data-lead-form="cta-block"></div></div></div></section>''' % title

def steps(items):
    return '<ol class="grid gap-4 md:grid-cols-%d">' % len(items) + ''.join(
        '<li class="reveal rounded-xl border border-ink/10 bg-white p-6"><span class="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-semibold text-white">%d</span><h3 class="mt-4 text-lg font-semibold">%s</h3><p class="mt-2 text-steel">%s</p></li>' % (i + 1, t, d)
        for i, (t, d) in enumerate(items)) + '</ol>'

PROCESS = [
    ('Звонок или заявка', 'Расскажите, что случилось. Подскажем, везти технику или вызвать мастера.'),
    ('Диагностика', 'Находим причину. Если ремонтируете у нас — диагностика бесплатна.'),
    ('Согласование цены', 'Называем сумму и срок до начала работ. Нет согласия — ничего не трогаем.'),
    ('Ремонт и гарантия', 'Чиним, проверяем вместе с вами, выдаём акт с гарантией. Платите после результата.'),
]

# ---------- ГЛАВНАЯ ----------
def home():
    terms = [('Диагностика бесплатна', 'если вы ремонтируете у нас'),
             ('Цена до ремонта', 'называем и записываем в акт'),
             ('Без предоплаты', 'платите после проверки работы'),
             ('Гарантия письменно', 'от 30 до 180 дней в акте')]
    body = '''<section class="bg-ink text-white on-dark"><div class="wrap grid items-center gap-10 py-14 md:py-20 lg:grid-cols-12">
<div class="hero-in lg:col-span-7">
<p class="text-mist/70">Сервисный центр в Чите</p>
<h1 class="mt-3 text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">Починим телевизор, компьютер, ноутбук или бытовую технику</h1>
<p class="mt-6 max-w-2xl text-lg text-mist/80 md:text-xl">Назовём цену до начала ремонта. Платить заранее не нужно. Если ремонт невыгоден, скажем об этом прямо.</p>
<div class="mt-8 flex flex-col gap-3 sm:flex-row">''' + CALL + REQ + '''</div>
<a href="tel:+73022550101" class="mt-8 block text-3xl font-semibold tracking-tight md:text-5xl">+7 (3022) 55-01-01</a>
<p class="mt-2 text-mist/70">Пн–Сб 9:00–19:00, Вс 10:00–16:00. Выезд мастера по Чите</p>
</div>
<div class="reveal rounded-2xl border border-white/10 bg-graphite p-6 sm:p-8 lg:col-span-5"><div data-search></div></div>
</div>
<div class="border-t border-white/10"><ul class="wrap grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">''' + ''.join(
        '<li class="bg-ink py-5 pr-4"><p class="font-semibold">%s</p><p class="text-sm text-mist/70">%s</p></li>' % t for t in terms) + '''</ul></div></section>

<section class="sec"><div class="wrap"><h2 class="h2 reveal">Что ремонтируете?</h2><p class="mt-3 max-w-2xl text-lg text-steel reveal">Выберите технику — покажем частые поломки, цены и сроки.</p>
<div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
<a href="tv.html" class="reveal group rounded-xl border border-ink/10 bg-white p-6 transition hover:border-ink"><h3 class="text-xl font-semibold">Телевизоры</h3><p class="mt-2 text-steel">Нет изображения, не включается, полосы на экране</p><p class="mt-6 font-semibold" data-from="tv"></p></a>
<a href="computers.html" class="reveal group rounded-xl border border-ink/10 bg-white p-6 transition hover:border-ink"><h3 class="text-xl font-semibold">Компьютеры</h3><p class="mt-2 text-steel">Тормозит, не запускается, вирусы, шум</p><p class="mt-6 font-semibold" data-from="pc"></p></a>
<a href="laptops.html" class="reveal group rounded-xl border border-ink/10 bg-white p-6 transition hover:border-ink"><h3 class="text-xl font-semibold">Ноутбуки</h3><p class="mt-2 text-steel">Не заряжается, греется, разбит экран, залит</p><p class="mt-6 font-semibold" data-from="laptop"></p></a>
<a href="appliances.html" class="reveal group rounded-xl border border-ink/10 bg-white p-6 transition hover:border-ink"><h3 class="text-xl font-semibold">Бытовая техника</h3><p class="mt-2 text-steel">Стиральные машины, холодильники, микроволновки</p><p class="mt-6 font-semibold" data-from="appliance"></p></a>
</div></div></section>

<section class="sec bg-white" id="faults"><div class="wrap"><h2 class="h2 reveal">Каталог неисправностей</h2><p class="mt-3 max-w-2xl text-lg text-steel reveal">Найдите свою проблему: покажем возможную причину, диапазон цены на работы и срок.</p><div class="mt-8" data-catalog="all"></div></div></section>

<section class="sec"><div class="wrap"><h2 class="h2 reveal">Как проходит ремонт</h2><div class="mt-10">''' + steps(PROCESS) + '''</div></div></section>

<section class="sec bg-ink text-white on-dark" id="calc"><div class="wrap grid items-start gap-10 lg:grid-cols-2">
<div class="reveal"><h2 class="h2">Узнайте примерную стоимость за минуту</h2><p class="mt-4 text-lg text-mist/80">Выберите технику и поломку — калькулятор покажет диапазон цены на работы. Детали, если нужны, мастер назовёт отдельно после диагностики.</p></div>
<div class="reveal rounded-2xl bg-white p-6 text-ink sm:p-8"><div data-calc></div></div></div></section>

<section class="sec"><div class="wrap"><h2 class="h2 reveal">Что мы фиксируем в акте</h2><p class="mt-3 max-w-2xl text-lg text-steel reveal">Не обещания в рекламе, а условия, которые вы получаете на бумаге.</p>
<div class="mt-10 grid gap-4 md:grid-cols-2">
<div class="reveal rounded-xl border border-ink/10 bg-white p-6"><h3 class="text-xl font-semibold">Цена и срок</h3><p class="mt-2 text-steel">Сумма работ и срок указаны до начала ремонта. Если в ходе работы выясняется что-то новое, мы сначала звоним вам.</p></div>
<div class="reveal rounded-xl border border-ink/10 bg-white p-6"><h3 class="text-xl font-semibold">Гарантия</h3><p class="mt-2 text-steel">От 30 до 180 дней на работы и установленные детали. Срок зависит от вида ремонта и записан в акте.</p></div>
<div class="reveal rounded-xl border border-ink/10 bg-white p-6"><h3 class="text-xl font-semibold">Замены только с вашего согласия</h3><p class="mt-2 text-steel">Не меняем детали «на всякий случай». Старые детали можно забрать.</p></div>
<div class="reveal rounded-xl border border-ink/10 bg-white p-6"><h3 class="text-xl font-semibold">Честно об отказе</h3><p class="mt-2 text-steel">Если ремонт нецелесообразен, объясним почему. Откажетесь после диагностики — заплатите 500 ₽ за работу мастера.</p></div>
</div></div></section>

<section class="bg-white py-12"><div class="wrap flex flex-col items-start justify-between gap-5 md:flex-row md:items-center"><div><h2 class="text-2xl font-semibold tracking-tight">Уже ремонтировали у нас?</h2><p class="mt-1 text-steel">Расскажите, как всё прошло — это помогает другим читинцам выбрать сервис.</p></div><a href="reviews.html" class="btn btn-outline">Оставить отзыв</a></div></section>

<section class="sec"><div class="wrap grid gap-10 lg:grid-cols-3"><div class="reveal"><h2 class="h2">Частые вопросы</h2><p class="mt-4 text-steel">Не нашли ответ? Позвоните — подскажем.</p><a href="faq.html" class="btn btn-outline mt-6">Все вопросы</a></div><div class="lg:col-span-2" data-faq="all" data-limit="5"></div></div></section>
''' + cta()
    page('index.html', 'РемКонтур — ремонт телевизоров, компьютеров, ноутбуков и бытовой техники в Чите',
         'Ремонт техники в Чите: диагностика бесплатна при ремонте, цена до начала работ, без предоплаты, гарантия в акте. Позвоните +7 (3022) 55-01-01.', body)

# ---------- КАТЕГОРИИ ----------
def category(fname, key, title, h1, lead, desc, when, note, faqtag):
    body = hero(h1, lead, title) + '''
<section class="sec" id="faults"><div class="wrap"><h2 class="h2 reveal">Частые поломки и цены</h2><p class="mt-3 max-w-2xl text-lg text-steel reveal">Цена указана за работы. Стоимость деталей мастер назовёт после диагностики.</p><div class="mt-8" data-catalog="%s"></div></div></section>

<section class="sec bg-white"><div class="wrap grid gap-10 lg:grid-cols-2">
<div class="reveal"><h2 class="h2">Когда стоит звонить сразу</h2><ul class="mt-6 space-y-3 text-lg">%s</ul></div>
<div class="reveal rounded-xl border border-ink/10 bg-paper p-6"><h3 class="text-xl font-semibold">Когда ремонт может быть невыгоден</h3><p class="mt-3 text-steel">%s</p><button type="button" data-open="request" data-device="%s" class="btn btn-dark mt-6">Спросить мастера</button></div>
</div></section>

<section class="sec"><div class="wrap"><h2 class="h2 reveal">Как проходит ремонт</h2><div class="mt-10">%s</div></div></section>

<section class="sec bg-ink text-white on-dark" id="calc"><div class="wrap grid items-start gap-10 lg:grid-cols-2">
<div class="reveal"><h2 class="h2">Предварительная оценка</h2><p class="mt-4 text-lg text-mist/80">Выберите поломку — получите диапазон цены. Точную сумму назовёт мастер до начала работ.</p></div>
<div class="reveal rounded-2xl bg-white p-6 text-ink sm:p-8"><div data-calc="%s"></div></div></div></section>

<section class="sec"><div class="wrap grid gap-10 lg:grid-cols-3"><div class="reveal"><h2 class="h2">Вопросы</h2><a href="prices.html" class="btn btn-outline mt-6">Все цены</a></div><div class="lg:col-span-2" data-faq="%s" data-limit="5"></div></div></section>
''' % (key, ''.join('<li class="flex gap-3"><span class="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-ink"></span>%s</li>' % w for w in when), note, CATKEY[key], steps(PROCESS), key, faqtag) + cta()
    page(fname, title + ' в Чите — РемКонтур', desc, body)

CATKEY = {'tv': 'tv', 'pc': 'pc', 'laptop': 'laptop', 'appliance': 'appliance'}

def pages():
    home()
    category('tv.html', 'tv', 'Ремонт телевизоров', 'Ремонт телевизоров в Чите',
             'Нет изображения, не включается, полосы на экране. Диагностика бесплатна, если вы ремонтируете у нас. Выезд на дом по Чите.',
             'Ремонт телевизоров в Чите: диагностика бесплатна при ремонте, цена до начала работ, выезд мастера на дом.',
             ['Экран тёмный, а звук есть', 'Телевизор мигает индикатором и не включается', 'На экране появились полосы после удара или скачка напряжения', 'Пахнет горелым — сразу отключите от розетки'],
             'Если матрица разбита, а модель старая, замена может стоить почти как новый телевизор. Мастер посчитает оба варианта и скажет, что разумнее.', 'tv')
    category('computers.html', 'pc', 'Ремонт компьютеров', 'Ремонт компьютеров в Чите',
             'Тормозит, шумит, не запускается или поймал вирус. Разберёмся с причиной и назовём цену до начала ремонта.',
             'Ремонт компьютеров в Чите: чистка, замена SSD, лечение вирусов, ремонт системных блоков. Цена до начала работ.',
             ['Компьютер не реагирует на кнопку включения', 'Появился синий экран или система не загружается', 'Нужно сохранить файлы — не пытайтесь переустанавливать Windows сами', 'Системный блок сильно шумит и греется'],
             'Для очень старых компьютеров апгрейд иногда дороже новой сборки. Мастер предложит варианты: от недорогой замены диска до покупки нового.', 'pc')
    category('laptops.html', 'laptop', 'Ремонт ноутбуков', 'Ремонт ноутбуков в Чите',
             'Не заряжается, греется, разбит экран или залит чаем. Если залили — выключите и привезите как можно быстрее.',
             'Ремонт ноутбуков в Чите: замена экрана, батареи, клавиатуры, чистка от пыли, ремонт после залития.',
             ['Ноутбук залит жидкостью: выключите, отключите зарядку, не включайте повторно', 'Не заряжается или выключается при отключении от сети', 'Сильно греется, шумит и перезагружается', 'Разбит экран или не работает клавиатура'],
             'Если ноутбук старый и сильно залит, ремонт платы может не окупиться. Скажем честно и поможем хотя бы сохранить данные, если это возможно.', 'laptop')
    category('appliances.html', 'appliance', 'Ремонт бытовой техники', 'Ремонт бытовой техники в Чите',
             'Стиральные машины, холодильники, микроволновки, посудомоечные машины и плиты. Мастер приедет домой, осмотрит и назовёт цену.',
             'Ремонт бытовой техники в Чите: стиральные машины, холодильники, микроволновки, посудомойки. Выезд мастера.',
             ['Из стиральной машины течёт вода — перекройте кран и отключите её от сети', 'Холодильник перестал морозить, продукты портятся', 'Техника выбивает автомат или пахнет горелым', 'Посудомойка или стиралка выдаёт ошибку и не запускается'],
             'Для техники старше 10–12 лет и дорогих узлов (компрессор, модуль управления) мастер сравнит стоимость ремонта с покупкой новой.', 'appliance')

    # ---------- ЦЕНЫ ----------
    body = hero('Цены на ремонт техники в Чите', 'Диапазоны цен на работы. Точную сумму называем после диагностики и до начала ремонта.', 'Цены') + '''
<section class="sec"><div class="wrap"><div class="grid gap-4 md:grid-cols-3">
<div class="rounded-xl border border-ink/10 bg-white p-6"><p class="text-steel">Диагностика</p><p class="mt-1 text-2xl font-semibold">0 ₽ при ремонте</p><p class="mt-2 text-sm text-steel">500 ₽, если вы отказались от ремонта после диагностики</p></div>
<div class="rounded-xl border border-ink/10 bg-white p-6"><p class="text-steel">Выезд мастера по Чите</p><p class="mt-1 text-2xl font-semibold">700 ₽</p><p class="mt-2 text-sm text-steel">Входит в стоимость, если ремонт сделан на месте</p></div>
<div class="rounded-xl border border-ink/10 bg-white p-6"><p class="text-steel">Срочный ремонт</p><p class="mt-1 text-2xl font-semibold">+20%</p><p class="mt-2 text-sm text-steel">Берём в работу в первую очередь</p></div></div>
<p class="mt-6 max-w-3xl text-steel">В цену входят работы. Детали оплачиваются отдельно — их стоимость мастер называет после диагностики, вы решаете, заказывать ли их.</p>
<div class="mt-12" data-prices="all"></div></div></section>
<section class="sec bg-ink text-white on-dark"><div class="wrap grid items-start gap-10 lg:grid-cols-2"><div><h2 class="h2">Посчитать свой случай</h2><p class="mt-4 text-lg text-mist/80">Калькулятор учтёт срочность и выезд.</p></div><div class="rounded-2xl bg-white p-6 text-ink sm:p-8"><div data-calc></div></div></div></section>
''' + cta('Цена зависит от модели — уточним по телефону')
    page('prices.html', 'Цены на ремонт техники в Чите — РемКонтур', 'Цены на ремонт телевизоров, компьютеров, ноутбуков и бытовой техники в Чите. Диагностика бесплатна при ремонте.', body)

    # ---------- О КОМПАНИИ ----------
    body = hero('О сервисе «РемКонтур»', 'Небольшой сервисный центр в Чите. Мы не обещаем невозможного: называем цену, чиним то, что чинится, и честно говорим, если не стоит.', 'О компании') + '''
<section class="sec"><div class="wrap"><h2 class="h2 reveal">Принципы работы</h2><div class="mt-10 grid gap-4 md:grid-cols-2">
<div class="reveal rounded-xl border border-ink/10 bg-white p-6"><h3 class="text-xl font-semibold">Сначала цена, потом ремонт</h3><p class="mt-2 text-steel">Мастер называет стоимость и срок после диагностики. Без вашего «да» ремонт не начинается.</p></div>
<div class="reveal rounded-xl border border-ink/10 bg-white p-6"><h3 class="text-xl font-semibold">Только нужные замены</h3><p class="mt-2 text-steel">Если можно починить, не меняем. Если нужна деталь — объясняем зачем и показываем старую.</p></div>
<div class="reveal rounded-xl border border-ink/10 bg-white p-6"><h3 class="text-xl font-semibold">Оплата после результата</h3><p class="mt-2 text-steel">Вы проверяете, что техника работает, и только потом платите. Исключение — деталь под заказ, о ней предупреждаем заранее.</p></div>
<div class="reveal rounded-xl border border-ink/10 bg-white p-6"><h3 class="text-xl font-semibold">Понятный язык</h3><p class="mt-2 text-steel">Объясняем поломку без жаргона, чтобы вы могли принять решение сами.</p></div></div></div></section>
<section class="sec bg-white"><div class="wrap grid gap-10 lg:grid-cols-2"><div class="reveal"><h2 class="h2">Что мы не делаем</h2><ul class="mt-6 space-y-3 text-lg"><li class="flex gap-3"><span class="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-ink"></span>Не берём деньги вперёд за обычный ремонт</li><li class="flex gap-3"><span class="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-ink"></span>Не добавляем работы без вашего согласия</li><li class="flex gap-3"><span class="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-ink"></span>Не обещаем «ремонт за 15 минут» там, где нужна деталь</li><li class="flex gap-3"><span class="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-ink"></span>Не удаляем ваши данные без предупреждения</li></ul></div>
<div class="reveal rounded-xl border border-dashed border-ink/30 bg-paper p-6"><h3 class="text-xl font-semibold">Реквизиты (заполнить перед запуском)</h3><p class="mt-3 text-steel">Полное наименование организации или ИП, ОГРН/ОГРНИП, ИНН, юридический адрес, график работы. Реальные данные повышают доверие и требуются по закону.</p></div></div></section>
''' + cta('Расскажите, что случилось с техникой')
    page('about.html', 'О компании РемКонтур — сервис ремонта техники в Чите', 'РемКонтур — сервис по ремонту техники в Чите. Принципы работы: цена до ремонта, оплата после результата, гарантия в акте.', body)

    # ---------- ОТЗЫВЫ ----------
    body = hero('Отзывы клиентов', 'Здесь будут отзывы реальных клиентов. Мы не придумываем отзывы и не накручиваем оценки.', 'Отзывы') + '''
<section class="sec"><div class="wrap"><div class="rounded-xl border border-ink/15 bg-white p-6"><p class="font-semibold">Заметка для владельца сайта</p><p class="mt-2 max-w-3xl text-steel">Карточки ниже — макеты. Перед запуском замените их настоящими отзывами с разрешения клиентов или подключите отзывы с карт и агрегаторов. Форма справа в демо-режиме сохраняет отзыв только в браузере.</p></div>
<div class="mt-10 grid gap-10 lg:grid-cols-3"><div class="grid gap-4 lg:col-span-2" data-reviews></div>
<div class="reveal h-fit rounded-2xl bg-white p-6 sm:p-8 border border-ink/10"><h2 class="text-2xl font-semibold">Оставить отзыв</h2><div class="mt-5" data-review-form></div></div></div></div></section>
''' + cta('Остались вопросы? Позвоните')
    page('reviews.html', 'Отзывы о ремонте техники в Чите — РемКонтур', 'Отзывы клиентов сервиса РемКонтур в Чите. Оставьте свой отзыв о ремонте.', body)

    # ---------- FAQ ----------
    body = hero('Частые вопросы', 'Про цену, сроки, гарантию и выезд мастера. Не нашли своё — позвоните.', 'FAQ') + '''
<section class="sec"><div class="wrap max-w-4xl"><div class="space-y-3" data-faq="all"></div></div></section>
''' + cta('Не нашли ответ? Спросите мастера')
    page('faq.html', 'Вопросы и ответы — ремонт техники в Чите | РемКонтур', 'Ответы на частые вопросы о ремонте техники в Чите: диагностика, цены, гарантия, предоплата, выезд мастера.', body)

    # ---------- КОНТАКТЫ ----------
    body = hero('Контакты', 'Позвоните, напишите или оставьте заявку. В рабочее время перезвоним.', 'Контакты') + '''
<section class="sec"><div class="wrap grid gap-10 lg:grid-cols-2">
<div class="space-y-4">
<div class="rounded-xl border border-ink/10 bg-white p-6"><p class="text-steel">Телефон</p><a href="tel:+73022550101" class="mt-1 block text-3xl font-semibold tracking-tight">+7 (3022) 55-01-01</a></div>
<div class="rounded-xl border border-ink/10 bg-white p-6"><p class="text-steel">Адрес</p><p class="mt-1 text-xl font-semibold">г. Чита, ул. Амурская, 24</p><p class="mt-1 text-sm text-steel">Вымышленный адрес для демонстрации. Укажите реальный и добавьте, как найти вход.</p></div>
<div class="rounded-xl border border-ink/10 bg-white p-6"><p class="text-steel">Часы работы</p><p class="mt-1 text-xl font-semibold">Пн–Сб 9:00–19:00, Вс 10:00–16:00</p></div>
<div class="rounded-xl border border-ink/10 bg-white p-6"><p class="text-steel">Выезд мастера</p><p class="mt-1 text-xl font-semibold">Центральный, Железнодорожный, Ингодинский и Черновский районы Читы</p><p class="mt-1 text-sm text-steel">Выезд 700 ₽, входит в стоимость при ремонте на месте. Другие районы — уточняйте по телефону.</p></div>
<div class="rounded-xl border border-ink/10 bg-white p-6"><p class="text-steel">Почта</p><a class="mt-1 block text-xl font-semibold underline" href="mailto:info@remkontur-chita.example">info@remkontur-chita.example</a></div></div>
<div class="h-fit rounded-2xl border border-ink/10 bg-white p-6 sm:p-8"><h2 class="text-2xl font-semibold">Заявка на ремонт</h2><div class="mt-5" data-lead-form="contacts"></div></div></div></section>
<section class="sec bg-white" id="privacy"><div class="wrap max-w-3xl"><h2 class="h2">Обработка персональных данных</h2>
<p class="mt-4 text-steel">Имя и телефон из формы используются только для связи по вашей заявке. Мы не передаём их третьим лицам и не отправляем рекламу без вашего согласия. Вы можете попросить удалить ваши данные, позвонив по телефону сервиса.</p>
<p class="mt-3 text-sm text-steel">Текст шаблонный. Перед запуском замените его политикой конфиденциальности, составленной по требованиям закона № 152-ФЗ.</p></div></section>
'''
    page('contacts.html', 'Контакты — РемКонтур, ремонт техники в Чите', 'Телефон, адрес и график работы сервиса РемКонтур в Чите. Заявка на ремонт онлайн.', body)

pages()
print('ok')

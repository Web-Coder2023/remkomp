# РемКонтур — сайт сервиса ремонта техники (Чита, вымышленная компания)

Стек: HTML5 + Tailwind CSS (Play CDN) + Vanilla JS. Без фреймворков.

## Запуск
Откройте index.html в браузере (нужен интернет: Tailwind CDN и шрифт Golos Text).
Для продакшена замените CDN на собранный Tailwind CLI.

## Файлы
index, tv, computers, laptops, appliances, prices, about, reviews, faq, contacts (.html), js/main.js.
build.py — необязательный генератор страниц (python3 build.py). Можно править .html напрямую.

## Что настроить перед запуском
1. js/main.js, объект C: телефон, адрес, часы, e-mail, endpoint.
2. endpoint: URL вашего обработчика заявок (POST, JSON). Пока пусто — демо-режим:
   заявки сохраняются в localStorage (ключ rk_leads), показывается success-состояние.
3. Цены, сроки, FAQ, каталог неисправностей — объекты CATALOG и FAQ в js/main.js.
4. Отзывы: заменить макеты реальными (REVIEWS_DEMO); реквизиты на about.html; политика ПДн на contacts.html.
5. Телефон в build.py/HTML (tel:+73022550101) — заменить на реальный во всех файлах.

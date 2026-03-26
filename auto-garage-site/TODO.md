# EPO Commercials — TODO

Сайт запущен: https://www.epocommercials.ie/

---

## P0 — Google индексация (сайт не виден в поиске!)

### Код (готово, нужно задеплоить)
- [ ] Закоммитить и замержить SEO ветку в main (structured data, meta tags, sitemap lastmod, manifest)
- [ ] Redeploy на Vercel после мержа

### Google Search Console (нужен Gmail клиента)
- [ ] Зайти на https://search.google.com/search-console
- [ ] Добавить property `epocommercials.ie`
- [ ] Верификация через DNS — добавить TXT запись в Blacknight
- [ ] Отправить sitemap: `https://www.epocommercials.ie/sitemap.xml`
- [ ] Запросить индексацию главной страницы через "URL Inspection"

### Google Business Profile (критично для локального поиска)
- [ ] Создать профиль на https://business.google.com
- [ ] Название: EPO Commercials
- [ ] Категория: Commercial Vehicle Repair / Truck Repair
- [ ] Адрес: Oldmill Industrial Estate, Co. Kildare
- [ ] Телефон: +353 87 721 0448
- [ ] Сайт: https://www.epocommercials.ie
- [ ] Часы работы: Пн-Пт 08:00-18:00, Сб 08:00-14:00
- [ ] Пройти верификацию (открытка или звонок Google)

### Google Analytics
- [ ] Создать GA4 property под Gmail клиента
- [ ] Получить Measurement ID (G-XXXXXXXXXX)
- [ ] Добавить в index.html и задеплоить

---

## P1 — Supabase миграция на аккаунт клиента

- [ ] Создать Supabase проект под Gmail клиента
- [ ] Запустить SQL миграции (parts + contact_messages)
- [ ] Создать storage bucket `parts-images` (public)
- [ ] Деплой edge function `send-contact-email`
- [ ] Установить secrets (RESEND_API_KEY, NOTIFY_EMAIL)
- [ ] Создать auth user для админ панели
- [ ] Обновить env vars в Vercel → redeploy

---

## P2 — Клиентская работа (допы)

### Визитки
- [x] Дизайн тёмной визитки (HTML + PDF)
- [ ] Клиент утвердил финальный вариант
- [ ] Заказать печать

### Стикеры на окна машин
- [x] Дизайн стикера (HTML + PDF, 2 варианта)
- [ ] Клиент утвердил финальный вариант
- [ ] Заказать печать

---

## P3 — Nice to have

- [ ] Error tracking (Sentry)
- [ ] Конвертировать фото в WebP
- [ ] Google Ads кампания (если клиент захочет)

---

## Завершено

### Сайт
- [x] Все страницы: Hero, About, Services, WhyChoose, OurCommitment, WorkingHours, Parts, Contact
- [x] Страницы: /parts, /contact, /privacy, /404
- [x] Админ панель (parts CRUD, messages, bulk actions)
- [x] Contact form + edge function email notifications
- [x] Favicon, Cookie Consent, Privacy Policy
- [x] SEO: robots.txt, sitemap.xml, OG tags, Twitter Card, canonical
- [x] SEO: Schema.org AutoRepair JSON-LD (geo, full address)
- [x] SEO: page-specific meta tags (useDocumentMeta hook)
- [x] SEO: manifest.json, apple-touch-icon, theme-color
- [x] Accessibility: skip-to-main, aria-labels, lazy loading
- [x] Performance: image compression, Error Boundary
- [x] Google Maps link + mini map
- [x] Alignment service card
- [x] Deploy на Vercel, DNS, SSL

### Дизайн
- [x] Визитка тёмная (дизайн + PDF)
- [x] Стикеры на окна (дизайн + PDF, 2 варианта)

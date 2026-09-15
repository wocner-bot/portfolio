# Portfolio — передача в Codex

## Текущая задача
Продолжить работу над готовым портфолио Александра Гренкова и опубликовать его на Render.
Целевой GitHub: https://github.com/wocner-bot/portfolio
Сайт на Render пока НЕ опубликован. Попытки загрузки через GitHub-плагин вернули 403 Resource not accessible by integration. Репозиторий был пуст при последней проверке.

## Запуск
Это готовый многостраничный статический сайт без npm и серверных зависимостей.
Из корня проекта: python3 -m http.server 8000 --directory dist
Открыть http://localhost:8000

## Файлы
- dist/index.html — главная
- dist/style.css — основные стили
- dist/devices.css и device_markup.py — оформление устройств
- dist/case.css — оформление кейсов
- dist/hero-video.js — autoplay и пауза видео
- dist/work/*/index.html — шесть страниц кейсов
- dist/assets/ — все изображения и видео
- build-cases.py — генератор кейсов; после изменения шаблонов запускать python3 build-cases.py и сохранять результат dist
- templates/atom-details.html — подробный контент ATOM
- content-sources.md — источники контента
- render.yaml и RENDER.md — конфигурация и инструкции Render

## Сохранить дизайн и требования
- Тёмный фон, крупный лаймовый слоган Making complex feel simple.
- ALEKSANDR GRENKOV, Lead Product Designer. и Digital products. Human experiences. сгруппированы под главным заголовком.
- Не возвращать PRODUCT DESIGN / UX STRATEGY и PORTFOLIO — 2026.
- Видео на главной: muted, autoplay, loop, playsinline; оставить кнопку паузы.
- AI — автомобильный ассистент, управляющий функциями машины. Фон карточки — интерьер ATOM.
- Отдельные страницы: ATOM, Beeline B2B, National Parking, Beeline Marketing, Beeline Pricing, Cargo Monitoring.
- Телефонные рамки только в парковках и Beeline Pricing (A clearer choice). Телефоны перекрываются.
- Остальные приложения показывать красивыми скриншотами без рамок телефонов. Автомобильные экраны ATOM сохранить.
- Контент уже основан на CV пользователя и указанных им источниках. Не придумывать новые достижения или метрики.
- Исходное CV не включено: необходимые сведения уже перенесены в сайт.

## Публикация
1. Проверить доступ к целевому GitHub и содержимое репозитория. Не затирать появившиеся чужие изменения.
2. Загрузить весь проект, включая dist и render.yaml, в main.
3. Render Static Site: buildCommand = test -f dist/index.html; publishPath = dist; branch = main.
4. Не добавлять SPA rewrite: это несколько физических HTML-страниц.
5. Не создавать платный сервер, базу данных или переменные окружения — для этого сайта они не нужны.
6. У Render найден workspace «Ронни's workspace», id tea-d85e333eo5us73et6ti0. Пользователь пока не подтвердил выбор; если инструмент требует, запросить подтверждение перед использованием.
7. До создания сервиса проверить существующие, чтобы не создать дубликат.
8. Дождаться live и проверить главную, все 6 кейсов, изображения и видео.
9. Перенос домена wocnerg.su отдельно не выполнен; не менять DNS без соответствующей задачи.

## Перенос через GitHub Desktop
Если загрузка из Codex недоступна, клонировать wocner-bot/portfolio в GitHub Desktop, скопировать в папку клона содержимое этого проекта, выполнить Commit и Push origin. После этого репозиторий можно выбрать в Codex cloud.

## Начальный запрос для Codex
Прочитай CODEX_HANDOFF.md. Это готовый сайт: сохрани текущий дизайн и контент. Проверь проект, загрузи его в wocner-bot/portfolio и продолжи публикацию на Render. Учитывай зафиксированные ограничения доступа и не выдавай подготовку за успешную публикацию.

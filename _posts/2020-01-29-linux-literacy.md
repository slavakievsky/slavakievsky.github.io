---
layout: post
title: Методичка линуксоида. Ликбез по GNU/Linux.
description: Здесь я попытался собрать и систематизировать все свои знания о системах GNU/Linux в невероятно сжатом виде. Получилась вот такая методичка начинающего линуксоида.
tags: [linux, guide]
---

Частенько бывает, что интеллектуальная беседа со знакомым, коллегой, лучшим другом там или ещё с кем (ну вы поняли) заходит в тупик из-за недостатка осведомлённости собеседника по мат-части. Встречается такое и у меня, когда дело доходит до Linux. И не так страшно, когда я начинаю путать SystemD с незабудками, как когда выясняется, что друган не в теме за POSIX ACL и вообще "хватит ругаться иностранным матом".

Именно поэтому представляю вcеобщему вниманию данную методичку. Пригодится статья тем начинающим линуксоидам, кто хочет выжить в разговоре с разъярёнными после обновления Arch'а красноглазиками. (Я с вами, ребята, вы лучшие!)
<!--more-->

><a href="/blog/linux-literacy-p2">Часть вторая, про файлы</a>\\
><a href="/blog/linux-literacy-p3">Часть третья, про загрузку ОС</a>

Полный курс приёма Linux от доброго доктора разбит на три блока интенсивной терапии:
* Теоретический блок
    * UNIX, GNU, Linux, GNU/Linux
    * Дистрибутивы Linux
    * Распространение ПО в Linux и почему **нельзя** "качать проги с инета"
* Блок ~~обсидиана~~ начинающего сисадмина
    * Файловая структура
    * Процесс загрузки системы GNU/Linux
    * Разграничение доступа, пользователи и группы
    * Драйверы
    * Сети и Интернет
* Доза графики
    * Отрисовка картинки на экран (_Xorg vs Wayland: Holy War III_)
    * Qt, GTK, EFL
    * DE, WM

Каждый блок я буду выкладывать отдельной статейкой, да ещё и с интригой в конце чтоб. Вдруг опыт Шарехезады как-то позитивно скажется... ну хотябы на чём-то? :D

## Блок теоретический
Как известно, существует _плохо исчислимое_ множество ОС: современныз и не очень; популярных и забвенных, но активно развиваемых. Семейное древо ОС -- еще более интересная для изучения штука -- что откуда происходит и как идеи переходят от одних систем к другим --, но на сегодня это будет слишком.

Отобрал список самых интересных, на мой взгляд, ОСей (постарался ранжировать по степени древности):
* UNIX (v1-v10) _(1971-1988)_
* Семейство BSD _(с 1978)_
* IBM PC DOS _(1981-2000)_
* MS DOS _(1981-2000)_
* Minix _(1987-2017)_
* Linux _(с 1991)_
* Семейство Windows NT _(с 1993)_
* BeOS _(1995-2005)_
* Menuet, Colibri _(2000-2009)_
* Mac OS = OS X _(с 2001)_
* Haiku _(с 2002)_

Предмет нашего рассмотрения -- лишь одна из многочисленных операционных систем.

### Unix, GNU, Linux, GNU/Linux

**UNIX** -- семейство переносимых, многозадачных и многопользовательских операционных систем. Родоначальником оного является проект AT&T Unix, разработанный в 1970-х годах в исследовательском центре Bell Labs Кеном Томпсоном и Деннисом Ритчи с командой. После выхода седьмой версии, ради коммерциализации UNIX, компания AT&T передала систему в некоторые университеты (там интересная история с правительством США), что привело к появлению таких систем, как BSD Unix.

**POSIX**(**P**ortable **O**perating **S**ystem **I**nterface) -- набор стандартов, описывающих интерфейсы между операционной системой и прикладной программой (системный API), библиотеку языка C и набор приложений и их интерфейсов. Стандарт создан для обеспечения совместимости различных UNIX-подобных операционных систем и переносимости прикладных программ на уровне исходного кода, но может быть использован и для не-Unix систем.

**GNU**(**G**nu's **N**ot **U**NIX) -- ~~очередной рекурсивный акроним~~  свободная Unix-подобная операционная система, разрабатываемая "Проектом GNU". К сожалению для GNU и к счастью для Linux, проект так и не обзавёлся хоть в какой бы то ни было мере адекватным ядром (на бумажке Оно есть. И Оно идеально. И имя Ему -- GNU Hurd). А так, по сути, Проект GNU, основателем которого является богоподобный Ричард Столлман (забавная фамилия, правда?), предоставляет миру неимоверное количество программных компонентов, библиотек, огромных проектов -- и всё под лицензией GPL!

**Linux**(не путать с **Linus** Torvalds) -- ядро операционной системы, соответствующее стандартам POSIX, составляющее основу операционных систем семейства Linux. Разработка кода ядра была начата не менее богоподобным финским студентом Линусом Торвальдсом в 1991 году.

**GNU/Linux** -- (добрались!) -- семейство Unix-подобных операционных систем на базе ядра Linux, включающих экий-некий набор утилит и программ проекта GNU, и, возможно, другие компоненты. Как и ядро Linux, системы на его основе как правило создаются и распространяются в соответствии с моделью разработки и распространений свободного и открытого программного обеспечения (Linux не всегда бесплатен. Пример тому -- дистрибутив RedHat Enterprise). Linux-системы распространяются в основном бесплатно в виде различных дистрибутивов.

### Дистрибутивы GNU/Linux

Проекты Linux и GNU развиваются независимо. Более того, что ядро Linux, что наработки GNU распространяются в виде исходных кодов.

В давние времена, когда трава была зеленее, чтобы установить Linux, нужно было скомпилировать себе ядро из исходников, чтобы потом скомпилировать себе компилятор Си, чтобы потом компилировать себе программы и обновления ядра.
Но и это еще не все: эти самые исходники нужно было где-то достать...

Сегодня набор программного обечпечения вкупе с ядром называется дистрибутивом.

**Дистрибутив** -- это форма распространения программного обеспечения. 

**Дистрибутив GNU/Linux** -- набор программного обеспечения GNU, компилятора Си и ядра Linux, сопровождаемый компанией и/или свободным сообществом. Часто в дистрибутив включаются собственные разработки компании, не входящие в проект GNU, а так же разработки других проектов, ориентированных на использование в системах GNU/Linux.

Каждый уважающий себя дистрибутив содержит репозиторий, в котором хранятся программы, доступные для установки.

**Репозиторий** -- этакое хранилище, место, где хранятся и поддерживаются какие-либо данные. Чаще всего данные в репозитории хранятся в виде файлов, доступных для дальнейшего распространения по сети.

Программное обеспечение представляется в виде особых "пакетов" -- архивов содержащих помимо программного обеспечения набор метаданных, которые могут включать в себя полное имя пакета, номер версии, описание пакета, имя разработчика, контрольную сумму, отношения с другими пакетами. Метаданные сохраняются в системной базе данных пакетов. 

Для работы с репозиторием пакетов программного обеспечения в дистрибутиве GNU/Linux используется своя система управления пакетами, интерфейс которой принято называть "пакетным менеджером"

**Система управления пакетами** -- набор программного обеспечения, позволяющего управлять процессом установки, удаления, настройки и обновления различных компонентов программного обеспечения.

**Базовые функции современной системы управления пакетами:**
* Поиск в базе данных пакетов ПО, скачивание и установка программ.
* Удовлетворение зависимостей: для каждой программы в системе должны присутствовать необходимые для её функционирования библиотеки и программные компоненты.
* Отслеживание состояния актуальности ПО: так как программы в репозитории постоянно обновляются, необходимо синхронизировать локальную базу данных с базой данных репозитория и проверять наличие обновлений программ и библиотек.
* Удаления файлов из системы: при удалении программы все файлы, созданные в момент установки должны быть удалены из файловой структуры системы.

Итак, дистрибутив **Linux = ядро + набор ПО**

Нас будут интересовать современные дистрибутивы GNU/Linux, набор ПО в которых в большинстве пакетов представлен дистрибутивами программ проекты GNU.

На сегодняшний день я выделил семь "течений" в дистрибуции GNU/Linux, представленных пятью дистрибутивами & двумя видами дистрибутивов:
* **Debian** (дистрибутив) -- один из самых объёмных по размерам пакетной базы дистрибутивов. Очень стабилен, используется на серверах и десктопах. Разработчики придерживаются правила: "обновим тогда, когда будет готово", что сопровождается устаревшими версиями ПО в стабильной ветке дистрибутива, однако для любителей "посвежее" имеются "тестовая" и "нестабильная" ветки, которые, однако, так же отличаются высокой стабильностью :)
* **Slackware** (дистрибутив) -- самый старый из доживших до наших дней. Разрабатывается и поддерживается, фактически, одним человеком. Считается самым UNIX-овым. Невероятно стабилен и легковесен за счет отсутствия функционала автоматического разрешения зависимостей в системе управления пакетами. Если вы учите RedHat, то вы узнаете RedHat; если вы учите Slackware — вы узнаете Linux.
* **RedHat Linux** (дистрибутив) -- коммерческий дистрибутив, развиваемый и сопровождаемый компанией RadHat.
* **ArchLinux** (дистрибутив) -- дистрибутив, выделяющийся среди прочих наличием **AUR**(**A**rch **U**ser **R**epository -- открытый для всех репозиторий, куда любой пользователь может выложить свой собственный пакет) и моделью непрерывного обновления ПО. Тогда как большинство других дистрибутивов выходят "выпусками" с фиксированными версиями ПО, получая в будущем лишь обновления безопасности, ArchLinux представляет собой систему, все программы в которой находятся в актуальном состоянии. Не имеет программы установщика и устанавливается только по сети путём скачивания пакетов.
* **Gentoo** (дистрибутив) -- дистрибутив, программы в котором распространяются через репозиторий в виде исходных кодов. Если большинство дистрибутивов предоставляют пользователю заранее скомпилированные для его платформы программы, то Gentoo распространяет исходные коды, компилируемые непосредственно на целевой системе. Это позволяет настраивать систему невероятно тонко... Но какой ценой...
* **Android** (вид) -- внезапно, тоже Linux. Выделил в вид, так как существует много версий и модификаций. Одна из самых распространённых и популярных мобильных ОС (на планшетах как-то не зашла).
* **From Scratch** (вид) -- любой дистрибутив, не основанный ни на чём, кроме  исходников проекта GNU и фантазии пользователя. Не имеет базового репозитория. Собирается руками из исходных кодов. _А вы любите извращения? Представляю вашему вниманию [**Linux From Scratch**](/Old/assets/pdf/posts/linux-literacy/LFS-BOOK.pdf), книгу про то, как собрать свой собственный Linux из исходников самостоятельно, без мамы, папы, кредитов и репозитория._

Любой доживший до наших дней дистрибутив относится к одной из этих веток. Иными словами, каждый дистрибутив (кроме выше перечисленных) имеет в своей основе пакетную базу (репозиторий) какого-то из обозначенных выше дистрибутивов. К примеру некогда невероятно популярный _Linux Mint_ основан на пакетной базе _Ubuntu Linux_, который в свою очередь основан на базе _Debian_: таким образом _Linux Mint_ является _deb-based (Debian-based)_ дистрибутивом.

Наглядно проследить эволюцию и ветвление дистрибутивов можно [на этой картинке.](https://upload.wikimedia.org/wikipedia/commons/1/1b/Linux_Distribution_Timeline.svg)

Самые прикольные (по версии distrowatch) на данный момент дистрибутивы:
* **MX Linux:** дистрибутив, ориентированный на использований графического интерфейса (desktop-oriented, user-friendly). Репозиторий дистрибутива основан на репозитории Debian Linux.
* **Manjaro:** Arch-based дистрибутив, который иногда представляют, как "ArchLinux с человеческим лицом". Несмотря на то, что manjaro основан на пакетной базе оного, его репозиторий самостоятелен и независим от Arch'а. Выпускается так же в виде rolling-release (непрерывное обновления) с чуть большей периодичностью, чем родитель. Имеются графические менеджер пакетов и установщик.
* **Linux Mint:** Deb-based дистрибутив, основанный на пакетной базе Ubuntu Linux. Ориентирован на пользователя и выпускается версиями. Знаменти своими мятными обоями :)
* **Debian:** дистрибутив, который я бы назвал "дуболомным". Вспоминая свой опыт его установки, я чувствовал некоторое благоговение перед экраном установки. От него так и несёт древним благородством (некоторые из-за этого прозвали его г@#ном мамонта).

Также хочется от себя добавить, что подсев однажды на Linux с него уже просто так не соскочишь; что подсев однажды на терминал с него уже просто так не соскочишь; что подсев однажды на rolling-release с него уже просто так не соскочишь. Вот так я и оказался на ArchLinux. Много раз я пытался сбежать с него на Linux Mint, Debian, Manjaro... но всё безуспешно. Рач со мной навсегда ❤

### Почему нельзя “качать проги с инета”
Частичный ответ на этот вопрос внимательный читатель уже нашел в предыдущих главах повествования, а недостающие фрагменты я постараюсь описать в следующем блоке. Однако для ясности приведу полный список кратких аргументов:
* Если установить в систему программу, не "завёрнутую" в пакет, предназначенный для вашего дистрибутива, потом будет очень проблематично её удалить или даже обновить. В случае конфликта с файлами системы, можно запороть всю ОСь.
* Даже если Вам предлагается установочный пакет для дистрибутива, помните, что программа установки работает от имени **Суперпользователя root**, и если в пакете содержится вредоносный код, _вам, товарищ, хана_. Нет, речь не о вирусах. Для уничтожения системы и всех ценных данных, включая фоточки любимого котейки, достаточно, чтобы в установочном скрипте была строчка **rm -rf --nopreserveroot \***. И это далеко не единственный способ похерить систему.
* Помни, товарищ, что **Суперпользователь root** -- Бог твоей системы. И если ты допустишь выполнение неизвестного тебе кода от имени этого пользователя, система твоя очень быстро станет майнинг-фермой десятка добрых хакеров.
* Помни, товарищ, что **доверенный код = код из репозитория** твоего дистрибутива, **подписанный электронным ключём** мэйнтейнера, у которого **совпадают контрольные суммы**.
* Помни, товарищ, что истории успеха отдельных людей, которым случайно попался в Интернете благородный пакет для его версии его дистрибутива GNU/Linux не доказывают допустимость такого метода распространения ПО. Помни, что принимая выше сказанное за опровержение тезиса **нельзя “качать проги с инета”** ты совершаешь "ошибку выжившего".


А вот что такое **root** Вы узнаете в следующих сериях.
_(обещал же интригу)_

## Credits

За определения спасибо Wiki

Полезные ресурсы:

[LinuxFromScratch](http://linuxfromscratch.org/)

[Distrowatch](https://distrowatch.com/)

[Лучший способ получить ответ на любой вопрос](https://yandex.ru/)


*[ОС]: ОС -- операционная система
*[DE]: Desktop Environment
*[WM]: Window Manager
*[ПО]: Программное Обеспечение
*[Рач]: Arch Linux
*[DOS]: Disk Operation System -- примитивнейший тип ОС. Премитивнее были только Basic и перфокарты.
*[PC]: Personal Computer
*[IBM]: International Business Machines --  американская компания, один из крупнейших в мире производителей и поставщиков аппаратного и программного обеспечения
*[MS]: Microsoft
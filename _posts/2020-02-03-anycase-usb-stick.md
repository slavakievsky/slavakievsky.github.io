---
layout: post
title: "USB линуксоида на все случаи: от бэкапа до Tails Linux."
description: Установить другу Linux? Проверить комп дувушки на вирусы? Восстановить убитый виндой загрузчик GRUB? Сделать бэкап документов? Всё это сможет наша универсальная флешка...
tags: [it,guide]
---

Сидел я как-то холодным и одиноким вечером, крутил в руках флешку с образом ArchLinux, делал очередной бэкап лабораторных работ на внешний хард. Друг тем временем, в ожидании установки ему на ноубук Manjaro, перелистывал ленту YouTube. А позже вечером мне предстояло с этой же флешки переустановить Windows, чтобы на следующий день отнести готовый .docx файл для печати. На той самой флешке. Сидел и предвкушал, думая попутно ленивым мозгом программиста, скольких циклов перезаписи нам с Кингстоном это будет стоить, и как бы всё это дело автоматизировать да сразу в одну флешку запихнуть.

...и придумал флешку, которая будет хранить всездесущий загрузчик всего и вся GRUB, все рабочие и ВУЗовские файлы, автоматически обновляя их в инкрементальном порядке при подключении флешки. То есть флешка будет выполнять одновременно как функции Multiboot USB, так и автоматического бэкапа нужных данных.
<!--more-->

## Кто мы и чего мы хотим
К нашей флешке мы предъявим следующие требования:
* В режиме "Multiboot USB"
    * Нативная загрузка в системах как UEFI, так и BIOS
    * Загрузка из ISO, EFI и BIN файлов.
* В качестве бэкапа данных
    * Автоматическая синхронизация при подключении
    * Синхронизация должна быть двусторонней с приоритетом более новых версий файлов
    * Синхронизация не должна перезаписывать неизменённые файлы.
* И немного общих хотелок
    * Образы и программы BIOS/EFI не должны отъедать собственный раздел.
    * Флешка должна читаться в Win/Lin системах

Преступим же!

## Мультизагрузочная флешка

### Разметка USB
Начнём с разметки нашего блочного устройства. Если мы хотим, чтобы флешка читалась практически в любых системах, то наш выбор -- таблица разделов, известная как **MBR**, и файловая система **FAT32**. Именно так я и поступлю. Наша таблица разделов должна иметь примерно такую структуру (моя флешка около 8GB):
* MBR
    1. **3-4MB FAT32** для системного раздела EFI (с запасом. Хватит и 1MB)
    2. **8GB FAT32** для бэкапа, образов загрузки и данных загрузчика (т.е смело выделяйте все оставшееся место)

EFI (ESP, Efi System Partition) здесь нужен для загрузки GRUB в режиме UEFI.

MBR (Master Boot Record) таблицу используем еще и потому, что с ней GRUB будет иметь возможность загрузиться в системах Legacy BIOS.

Примем за метку подготавливаемого диска **/dev/sdX**, создадим таблицу разделов и отформатируем ФС _(для разметки буду использовать утилиту parted)_:
```sh
parted /dev/sdX mktable msdos  # создали таблицу разделов
parted /dev/sdX mkpart primary fat32 2048s 5M  # и два раздела
parted /dev/sdX mkpart primary fat32 5M 100%  # обратите внимание на начала разделов
parted /dev/sdX set 1 efi on  # установим для раздела EFI флаг 'esp'
# Еще это всё можно одной командой сделать... но делать этого я, конечно же, не буду
mkfs.vfat /dev/sdX1  # и отформатируем разделы в FAT32
mkfs.vfat /dev/sdX2
```

### Загрузчик
Использовать будем, как вы уже наверняка догадались, загрузчик GRUB.

Суть в том, что у нас на диске будет два "предзагрузчика" GRUB: один будет прописан в MBR, а второй будет лежать в ESP.

На основном разделе sdX2 флешки создадим каталог _".boot"_, где будут храниться все файлы загрузчика, в том числе и образы/программы для запуска.

Установим же их (каталоги для монтирования предлагаю вам выбрать/создать самостоятельно):
```sh
mount /dev/sdX1 /mnt/efi  # Наш EFI System раздел
mount /dev/sdX2 /mnt/fs  # Раздел для данных. В том числе данных загрузчика
mkdir /mnt/fs/.boot/
grub-install --target=x86_64-efi --efi-directory=/mnt/efi --boot-directory=/mnt/fs/.boot --removable
grub-install --target=i386-pc --boot-directory=/mnt/fs/.boot /dev/sdX
```
Обратите внимание, что пути _/mnt/efi_ и _/mnt/fs/*_, ровно как и номера разделов, у вас могут быть другими, если вы не следовали инструкции дословно, так что внимательно указывайте верные пути в параметрах команд!

Так же обратите внимание: **grub-mkconfig** выполнять не требуется!

Далее, когда загрузчик создан, можно создать в папке _/mnt/fs/.boot_ подструктуру каталогов дл более удобного и логичного размещения образов и программ. Это, разумеется не обязательно, и если вам это не требуется, смело переходите к следующему параграфу.

Моя же структура выглядит следующим образом:
* **.boot/**
    * **for_bios/**
        * Программы и образы, педназначенные для запуска на ПК под управлением Legacy BIOS
    * **for_uefi/**
        * Программы и образы, предназначенные для запуска на системах UEFI
    * **for_both/**
        * Как вы уже догадались, тут лежат универсальные штуки
    * **grub/**
        * здесь расположились файлы и модули загрузчика GRUB.

Осталось только разместить по каталогам загружаемые ОСи, мемтестеры и прочий важный и нужный стафф. Важно, чтобы этот самый стафф поддерживал такого рода загрузку. (Наряду со специальным софтом, большинство нормальных дистрибутивов Linux являются таковыми)

Все, что осталось -- это написать конфигурационный файл GRUB. Руками. Всё, что нужно помнить для этого -- пути к образам/программам, которые нужно будет загрузить и строку загрузки (найти ее чаще всего можно в документации или на просторах Интернета). Ниже приведу свой конфиг, который умеет загружать ArchLinux'ы, Manjaro, Ubuntu, Memtester'ы и прочие, прочие, прочие)


Ниже приведён пример моего конфига:
```bash
insmod vbe # для BIOS
insmod efi_gop # для UEFI
insmod efi_uga # для UEFI
insmod part_msdos # чтение таблицы разделов
#insmod part_gpt нам не требуется, т.к флешка в MBR
insmod regexp  # для поиска файлов по регуляркам
insmod font
insmod gfxterm
insmod gettext

# Цвета
set color_normal=cyan/black
set color_highlight=black/cyan

# Наш "псевдографический интерфейс"
set gfxmode=auto
set gfxpayload=keep
set locale_dir=$prefix/locale
set lang=ru_RU
terminal_output gfxterm

set default=0 # пункт по-умолчанию
set timeout=-1 # время отображения меню. значение -1 для отключения таймера

probe -s root_uuid -u $root  # UUID корневого устройства

submenu "ArchLinux"{
    dir=/.boot/images
    for arch in i686 x86_64 ; do  # делаем для обеих архитектур (мало ли)
        for iso in $dir/archlinux-*-$arch.iso ; do  # ищем образы Arch
            if [ ! -f "$iso" ] ; then continue; fi  # ...если образ существует...
            regexp -s build 'archlinux-(.+)-$arch' "$iso"  # получаем из имени образа имя сборки
            menuentry "Arch Linux ISO $build $arch" --source="\
            loopback loop $iso
            probe -s isolabel -l loop
            linux (loop)/arch/boot/$arch/vmlinuz archisolabel=\$isolabel img_dev=/dev/disk/by-uuid/$root_uuid img_loop=$iso earlymodules=loop
            initrd (loop)/arch/boot/$arch/archiso.img"
        done
    done

    menuentry "My Arch Linux" --source="\
    loopback loop $dir/myarchlinux.iso
    probe -s isolabel -l loop
    linux (loop)/arch/boot/x86_64/vmlinuz archisolabel=\$isolabel img_dev=/dev/disk/by-uuid/$root_uuid img_loop=$dir/myarchlinux.iso earlymodules=loop
    initrd (loop)/arch/boot/x86_64/archiso.img"

}

submenu "Manjaro Linux" {
    dir=/.boot/images
    for arch in x86_64 i386; do
        for iso in $dir/manjaro-*-$arch.iso ; do  # ищем образ manjaro по шаблону
            if [ ! -f "$iso" ] ; then continue; fi
            regexp -s build 'manjaro-(.+)-'$arch "$iso"  # получаем из имени образа дату сборки
            set dri="free"
            search --no-floppy -f --set=root $iso
            probe -u $root --set=abc
            set pqr="/dev/disk/by-uuid/$abc"

            menuentry "Manjaro $build $arch" --source="\
            loopback loop $iso
            probe -s isolabel -l loop
            linux (loop)/boot/vmlinuz-$arch img_dev=$pqr img_loop=$iso driver=$dri keytable=us
            initrd (loop)/boot/initramfs-$arch.img"

        done
    done
}

###LINUX TAILS
submenu "Linux Tails" {
   dir=/.boot/images
   for arch in i686 amd64; do # для обеих архитектур
   for iso in $dir/tails-$arch-*.iso ; do # ищем Tails
    if [ ! -f "$iso" ] ; then continue; fi
        regexp -s build 'tails-$arch-(.+)' "$iso"  # получаем из именя файла имя сборки
        menuentry "Linux Tails $build $arch" --source="\
          set idev='/dev/disk/by-uuid/$root_uuid'
          loopback loop $iso
          linux (loop)/live/vmlinuz initrd=(loop)/live/initrd.img img_dev=$idev img_loop=$iso boot=live config live-media=removable nopersistent noprompt timezone=Etc/UTC block.events_dfl_poll_msecs=1000 splash nox11autologin module=Tails quiet
          initrd (loop)/live/initrd.img
    "
    done
    done
}

### Start Kaspersky Rescue Disk 2018
menuentry "Kaspersky Rescue Disk 2018" {
    set iso_path="/.boot/images/krd.iso"
    set lang="en"
    # en=English; ru=Russian
    # if [ x$lang != xru ]; then set lang=en; fi
    # booting ${iso_path}
    search -s root -f ${iso_path}
    loopback loop ${iso_path}
    if cpuid -l; then set _kernel="k-x86_64"; else set _kernel_="k-x86"; fi
    linux   (loop)/boot/grub/${_kernel} net.ifnames=0 lang=${lang} dostartx isoloop=krd.iso
    initrd  (loop)/boot/grub/initrd.xz
}
### End Kaspersky Rescue Disk 2018

menuentry "Dr.Web Live CD"{
    isofile=/.boot/images/drweb-livedisk-900-cd.iso
    loopback loop $isofile
    linux (loop)/casper/vmlinuz.efi boot=casper iso-scan/filename=$isofile noprompt noeject live-media-path=$isofile root=UUID=$root_uuid
    initrd (loop)/casper/initrd.lz
}


submenu "UEFI" {
 menuentry "Memtest86+" {
  chainloader /.boot/binaries/uefi-memtest/memtestx64.efi
 }
}

submenu "BIOS" {
 menuentry "Plop Boot Manager"{
  linux16 /.boot/binaries/bios-plpbt.bin
 }
 menuentry "Memtest86+" {
  linux16 /.boot/binaries/bios-memtest.bin
 }
}

# Перезагрузка
menuentry "SYSTEM REBOOT" {
    echo "system reboot"
    reboot
}
# Выключение
menuentry "SYSTEM HALT" {
    echo "system halt"
    halt
}
```

Ну вот, собственно. Собственно вот. Вам остаётся только лишь правильно наполнить конфиг загрузки, и multiboot usb готова к работе!

## Автоматический инкрементальный бэкап

Как упоминалось в самом начале, наш usb stick должен стать также носителем важной и нужной нам информации. Для меня это папки _~/Documents/Univer_ и _~/Documents/Work_

Задача состоит в том, чтобы "сливать" все изменения, произведенные за время между подключениями флешки к системе. Предполагается, что только один пользователь имеет доступ к файлам и вносит в них изменения. Таким образом, при слиянии выбирается самый новый из двух файлов.

### Скрипт слияния
Напишем скрипт, который будет производить слияние выбранных каталогов c помошью утилиты rsync. Удобно поместить его в _/usr/local/bin_. Логика работы скрипта на языке bash примерно такова:
* примонтировать подключенное устройство
* скопировать более новые файлы с устройства на локальный компьютер
* скопировать более новые файлы с компьютера на устройство
* отмонтировать

Сам скрипт будет получать параметры командной строки: имя блочного устройства йлешки, каталог для монтирования флешки, каталог для слияния, имя пользователя, которому принадлежат файлы

```bash
#!/usr/bin/bash
DEV0=$1  # имя устройства sdXY
DIR0=$2  # целевой каталог монтирования
DIR1=$3  # каталог с локальными данными
USR=$4   # скрипт выполняется от имени root, так что потом нужно присвоить файлы пользователю

_DIR="/run/media/$DIR0"  # сюда примонтируем флешку 
mkdir -p $_DIR  # создаём точку монтирования, если её нет

mount /dev/$DEV0 $_DIR  # монтируем флешку

mkdir -p $DIR1
 -p $_DIR/$DIR0  # создаём каталог для слияния, если его нет


# выполняем слияние по времени с сохранением временных меток
rsync -rutv --inplace $DIR1/ $_DIR/$DIR0
rsync -rutv --inplace $_DIR/$DIR0/ $DIR1

chown -R $USR:$USR $DIR1  # исправляем права собственности на файлы

umount $_DIR  # отмонтируем флешку
```

### Правило UDEV
Для того, чтобы слияние (или бэкап) присходило автоматически при подключении устройства, воспользуемся услугами udev. Напишем правило, которое будет сообщать udevd, что при подключении именно нашей флешки нужно этот скрипт запустить с нужными параметрами. Само правило очень простое:
```bash
ACTION=="add|change", ENV{ID_FS_UUID}=="_UUID-вашего-раздела-с-данными_", RUN+="/usr/bin/systemctl start my-backup@%k.service"
```
Читать правило так: _"При подключении устройства с UUID==xxxx-xxxx запустить команду systemd, которая запустит сервис my-univer_backup с параметром, равным имени блочного устройства флешки (типа sdXY)"_

Для создания правила необходимо поместить эту строчку в файл _/etc/udev/rules.d/_имя_файла\_.rules_. У меня файл называется _my-backup.rules_

Не забудте заменить имя сервиса systemd на то, которое сами выберете (следующий пункт), а так же подставить UUID раздела, на котором будут лежать данные (там же лежит каталог .boot). Узнать UUID можно, например, командой *lsblk -f*

### Сервис SystemD

Как вы уже догадались, необходимо создать сервис SystemD, который будет служить своеобразной прослойкой между правилом udev и скриптом, так как udev не будет запускать целый скрипт и правило может отдать только одну команду.
Для этого я помещаю в каталог _/etc/systemd/system_ файл с именем **my-backup@.service** символ собаки в конце обозначает, что юнит systemd будет принимать параметер. (udev передаст в качестве параметра имя блочного устройства флешки, что-то типа sdXY). Этот сервис и запустит созданный ранее скрипт со всеми необходимыми нам параметрами. Мой скрипт выглядит вот так:
```bash
[Unit]
Description = Backup my works on USB flash

[Service]
Type=oneshot
ExecStart=/usr/local/bin/syncpath %i Univer /home/user/Documents/Univer user
ExecStart=/usr/local/bin/syncpath %i Work /home/user/Documents/Work user

[Install]
WantedBy=multi-user.target
```
Таким вот образом, при подключении устройства с конкретным UUID, udevd будет запускать юнит systemd, который запустит скрипт, полизводящий слияние. После того, как все скрипты отработают, устройство будет отмонтировано. А стало быть оно будет доступно, как обычная флешка, из файлового менеджера.

## Credits
Чтобы всё завелось, нужно:
* UDEV
* SystemD
* Rsync

Идеей для флешки вдохновился [тут](https://archlinux.org.ru/forum/topic/16025/)
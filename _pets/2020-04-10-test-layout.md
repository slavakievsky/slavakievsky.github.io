---
layout: embedded-case
title: Шаблон страницы отчета о калибровке
description: Страница отчета о калибровке приборов. CSS grid :)
image: /assets/pets/2020-04-10-test-layout/preview.webp
---

<head>
    <meta charset="UTF-8">
    <title>Аналитические весы</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
    <link rel="stylesheet" href="/assets/pets/2020-04-10-test-layout/style.css">
</head>
<body>
    <main class="wrap">
        <div class="main">
            <div class="main__inventory-number">
                <p class="inventory__text text text_dark text_16 text_ls_0016">
                    Enter inventory number, guid or bims id
                </p>
                <form id="id-inventory-form" action="search" class="form inventory__form">
                    <input name="uid" type="text" class="inventory__input">
                </form>
                <button id="id-inventory-submit" class="inventory__button" form="id-inventory-form">Search</button>
            </div>
            <div class="main__report">
                <div class="report__header">
                    <img class="img report__img" src="/assets/pets/2020-04-10-test-layout/logo.svg" alt="logo.svg">
                    <h1 class="text text_h1 text_ls_05">
                    Аналитические весы OHAUS Adventurer АХ324 (B715976163)
                    </h1>
                </div>
                <div class="report__setup">
                    <form id="id-report-form">
                        <div class="report__period">
                            <select class="period__select" name="period" id="id-report-period">
                                <option value="1">1 month</option>
                                <option value="3">3 months</option>
                                <option value="6">6 months</option>
                                <option value="12">1 year</option>
                            </select>
                        </div>
                        <div class="report__types">
                            <div class="report__radio">
                                <input class="radio__check" type="radio" name="type" value="calibration"><p class="radio__text">Calibration</p>
                            </div>
                            <div class="report__radio">
                                <input class="radio__check" type="radio" name="type" value="measuring"><p class="radio__text">Measuring</p>
                            </div>
                            <div class="report__radio">
                                <input class="radio__check" type="radio" name="type" value="using"><p class="radio__text">Using</p>
                            </div>
                        </div>
                    </form>
                    <button id="id-report-submit" class="report__button">Generate report</button>
                </div>
            </div>
            <div class="main__information">
                <p class="text text_med text_14 text_lh_22">
                    <b>Тип оборудования:</b> <span id="id-information-type">Весы</span> <br>
                    <b>Статус:</b> <span id="id-information-ready">Готов к работе</span> <br>
                    <b>Изготовитель:</b> <span id="id-information-vendor">Ohaus</span> <br>
                    <b>Модель:</b> <span id="id-information-model">AX-123</span> <br>
                    <b>Ответственное подразделение (ремонт):</b> <span id="id-information-responce">Группа обслуживания лабораторного оборудования</span> <br>
                    <b>Эксплуатирующее подразделение:</b> <span id="id-information-makers">Химико-аналитическая лаборатория 2.0</span> <br>
                    <b>МОЛ:</b> <span id="id-information-mol">Иванов Иван Иванович</span> <br>
                    <b>Территория:</b> <span id="id-information-terra">г. Санкт-Петербург (Нойдорф)</span> <br>
                    <b>Серийный номер:</b> <span id="id-information-serial">B715976163</span> <br>
                    <b>GUID:</b> <a href="#"><span id="id-information-guid">508b2a71-662e-4983-ae0c-3cb0c1cd21c5</span></a> <br>
                    <b>Bims ID:</b> <a href="#"><span id="id-information-bimsid">49db8db1-585f-4b9e-bbf0-8a59698edc8b</span></a> <br>
                    <b>Tam:</b>  <a href="#"><span id="id-information-tam">А-001234</span></a>
                </p>
            </div>
            <div class="main__container">
                <div class="main__stats">
                    <table class="stats__table">
                        <caption class="table__caption">Calibration report</caption>
                        <tbody>
                            <tr class="table__header">
                                <th class="td1">Date</th>
                                <th class="td2">Used buffer solutions</th>
                                <th class="td3">Slope, %<br>Norm 95-105</th>
                                <th class="td4">Offset, mV<br>Norm ±(0-20)</th>
                                <th class="td5">User</th>
                            </tr>
                            <tr>
                                <td id="id-table-tr1-td1" class="td1">04.10.19<br>10:23</td>
                                <td id="id-table-tr1-td2" class="td2">
                                    В1: № 2000460789536: pH 1.09<br>
                                    В2: № 2000460789536: pH 2.00<br>
                                    В3: № 2000460789536: pH 4.01<br>
                                    В4: № 2000460789536: pH 7.00<br>
                                    В5: № 2000460789536: pH 9.21<br>
                                </td>
                                <td id="id-table-tr1-td3" class="td3">98.7<img class="table__img" src="/assets/pets/2020-04-10-test-layout/accept.svg" alt="ok"></td>
                                <td id="id-table-tr1-td4" class="td4">-0.3<img class="table__img" src="/assets/pets/2020-04-10-test-layout/accept.svg" alt="ok"></td>
                                <td id="id-table-tr1-td5" class="td5">Иванов Генадий Петрович</td>
                            </tr>
                            <tr>
                                <td id="id-table-tr2-td1" class="td1">04.10.19<br>10:23</td>
                                <td id="id-table-tr2-td2" class="td2">
                                    В1: № 2000460789536: pH 1.09<br>
                                    В2: № 2000460789536: pH 2.00<br>
                                    В3: № 2000460789536: pH 4.01<br>
                                    В4: № 2000460789536: pH 7.00<br>
                                    В5: № 2000460789536: pH 9.21<br>
                                </td>
                                <td id="id-table-tr2-td3" class="td3">98.7<img class="table__img" src="/assets/pets/2020-04-10-test-layout/accept.svg" alt="ok"></td>
                                <td id="id-table-tr2-td4" class="td4">-0.3<img class="table__img" src="/assets/pets/2020-04-10-test-layout/accept.svg" alt="ok"></td>
                                <td id="id-table-tr2-td5" class="td5">Петров Иван Генадьевич</td>
                            </tr>
                            <tr>
                                <td id="id-table-tr3-td1" class="td1">04.10.19<br>10:23</td>
                                <td id="id-table-tr3-td2" class="td2">
                                    В1: № 2000460789536: pH 1.09<br>
                                    В2: № 2000460789536: pH 2.00<br>
                                    В3: № 2000460789536: pH 4.01<br>
                                    В4: № 2000460789536: pH 7.00<br>
                                    В5: № 2000460789536: pH 9.21<br>
                                </td>
                                <td id="id-table-tr3-td3" class="td3">98.7<img class="table__img" src="/assets/pets/2020-04-10-test-layout/accept.svg" alt="ok"></td>
                                <td id="id-table-tr3-td4" class="td4">-0.3<img class="table__img" src="/assets/pets/2020-04-10-test-layout/accept.svg" alt="ok"></td>
                                <td id="id-table-tr3-td5" class="td5">Петров Генадий Иванович</td>
                            </tr>
                            <tr>
                                <td id="id-table-tr4-td1" class="td1">04.10.19<br>10:23</td>
                                <td id="id-table-tr4-td2" class="td2">
                                    В1: № 2000460789536: pH 1.09<br>
                                    В2: № 2000460789536: pH 2.00<br>
                                    В3: № 2000460789536: pH 4.01<br>
                                    В4: № 2000460789536: pH 7.00<br>
                                    В5: № 2000460789536: pH 9.21<br>
                                </td>
                                <td id="id-table-tr4-td3" class="td3">90.1<img class="table__img" src="/assets/pets/2020-04-10-test-layout/dismiss.svg" alt="ok"></td>
                                <td id="id-table-tr4-td4" class="td4">-0.5<img class="table__img" src="/assets/pets/2020-04-10-test-layout/accept.svg" alt="ok"></td>
                                <td id="id-table-tr4-td5" class="td5">Генадьев Иван Петрович</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
    <script src ="https://cdn.rawgit.com/diversen/get-set-form-values/master/dist/get-set-form-values.js"></script>
    <script src="/assets/pets/2020-04-10-test-layout/req_res.js"></script>
</body>

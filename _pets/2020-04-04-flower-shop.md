---
layout: embedded-case
title: Шаблон посадочной страницы магазина цветов
description: Шаблон посадочной страницы цветочного магазина. Адаптивный дизайн, и никаких bootstrap'ов.
image: /assets/pets/2020-04-04-flower-shop/preview.webp
---
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <!-- jQuery 1.8 or later, 33 KB -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <!-- Fotorama from CDNJS, 19 KB -->
    <link  href="https://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.4/fotorama.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.4/fotorama.js"></script>
    <link rel="stylesheet" href="/assets/pets/2020-04-04-flower-shop/styles.css">
</head>
<body>
    <main class="main">
        <div class="flower offer">
            <img src="/assets/pets/2020-04-04-flower-shop/mainflower.png" alt="" class="flower__picture">
        </div>
        <nav class="nav">
            <a href="#" class="nav__item item_active" id="nav-home">Home</a>
            <a href="#" class="nav__item" id="nav-catalog">Catalog</a>
            <a href="#" class="nav__item" id="nav-delivery">Delivery</a>
            <a href="#" class="nav__item" id="nav-about">About</a>
        </nav>
        <section class="offer">
            <h1 class="offer__head">
            Do you have a dream? <br>
            We could fulfill it with flowers
            </h1>
            <p class="offer__desc">
                The best flowers from the most remote corners of the world, the bright or mysterious aroma of which will fill your life with colors. Breathe the freshness of northern herbs, plunge into the passionate colors of European buds, penetrate the secrets of the east ...
            </p>
            <div class="offer__get">
                <a href="#" class="get__button">Get it now</a>
            </div>
        </section>
    </main>
    <section class="catalog">
        <div class="catalog__slider">
            <div class="slider__fotorama fotorama" data-height="350" data-width="590" data-loop="true" data-autoplay="true">
                <a href="/assets/pets/2020-04-04-flower-shop/flower-0.jpg"></a>
                <a href="/assets/pets/2020-04-04-flower-shop/flower-1.jpg"></a>
                <a href="/assets/pets/2020-04-04-flower-shop/flower-2.jpg"></a>
                <a href="/assets/pets/2020-04-04-flower-shop/flower-3.jpg"></a>
                <a href="/assets/pets/2020-04-04-flower-shop/flower-4.jpg"></a>
                <a href="/assets/pets/2020-04-04-flower-shop/flower-5.jpg"></a>
            </div>
            <div class="slider__captions">
                <p id="flower-0" class="caption">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, repellat inventore aut, consequatur eligendi pariatur ducimus sed minima quam labore, accusantium quo qui aliquam laboriosam placeat nihil quidem cum ad.</p>
            </div>
        </div>
        <div class="catalog__categories">
            <div class="category">
                <a href="#">
                    <figure>
                        <img class="category__img" src="/assets/pets/2020-04-04-flower-shop/flower-6.jpg" alt="mising">
                        <figcaption class="category__caption">Trees</figcaption>
                    </figure>
                </a>
            </div>
            <div class="category">
                <a href="#">
                    <figure>
                        <img class="category__img" src="/assets/pets/2020-04-04-flower-shop/flower-1.jpg" alt="mising">
                        <figcaption class="category__caption">Tulpans</figcaption>
                    </figure>
                </a>
            </div>
            <div class="category">
                <a href="#">
                    <figure>
                        <img class="category__img" src="/assets/pets/2020-04-04-flower-shop/flower-2.jpg" alt="mising">
                        <figcaption class="category__caption">Margarets</figcaption>
                    </figure>
                </a>
            </div>
        </div>
    </section>
    <section class="delivery">
        <table class="delivery__table">
            <col class="table__service">
            <col class="table__cost">
            <col class="table__time">
            <tbody>
                <tr class="table__header">
                    <th>Delivery</th>
                    <td>Cost</td>
                    <th>Delivery period</th>
                </tr>
                <tr>
                    <td>EMS</td>
                    <td>2$/piece</td>
                    <td>1-3 days</td>
                </tr>
                <tr>
                    <td>Russian post</td>
                    <td>0.95$/piece</td>
                    <td>5-30 days</td>
                </tr>
                <tr>
                    <td>CDEK</td>
                    <td>0.3$/piece</td>
                    <td>30-90 days</td>
                </tr>
                <tr>
                    <td>Delivery Club</td>
                    <td>10$/all</td>
                    <td>1-15 hours</td>
                </tr>
            </tbody>
        </table>
    </section>
    <section class="about">
        <img class="about__img" src="/assets/pets/2020-04-04-flower-shop/flower-5.jpg" alt="">
        <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos suscipit ut cupiditate dolore, nobis nemo porro non impedit fugit libero quidem quam natus dolorum! Laudantium hic nobis, cupiditate libero dolorem!</span>
        <span>Ad ab qui, voluptates deleniti laborum accusamus suscipit impedit, nemo, id natus accusantium! Voluptas omnis quisquam nam eos maxime? Sed fugit necessitatibus cumque? Voluptatem laboriosam sapiente, perferendis illo veniam adipisci?</span>
        <span>Explicabo ipsum facilis excepturi tenetur perspiciatis? Perspiciatis obcaecati incidunt autem odio modi, molestiae sapiente, similique quos rem ea illo quaerat itaque quasi ipsum est dicta? Eius alias similique assumenda reprehenderit.</span>
        <span>Ipsam consectetur recusandae in, libero ipsa tenetur cupiditate veritatis esse asperiores tempora, illum, quos. Aut, officiis nulla illum ipsa praesentium asperiores officia! Unde labore rem, tempore soluta error suscipit voluptas.</span>
        <span>Dolorem earum saepe atque ut beatae, distinctio excepturi. Delectus, cupiditate quam quos architecto perspiciatis voluptatibus, magni vero similique non maiores necessitatibus nihil perferendis, incidunt, esse quibusdam ipsum. Maiores necessitatibus, recusandae!</span>
        <span>Incidunt accusantium totam molestiae repudiandae repellendus odit commodi possimus aliquid quod, quasi. Ipsam maxime nostrum incidunt fuga, iste id eligendi qui unde vel distinctio inventore nisi, quia adipisci. Fuga, nemo.</span>
        <span>Omnis, doloribus, optio! Aspernatur, quas, natus! Iusto minima asperiores magni voluptates quo temporibus, nihil! Quia perspiciatis autem sunt modi, placeat vel ratione. Quos consectetur cum culpa! Quae expedita, perferendis saepe.</span>
        <span>Assumenda dicta repudiandae eaque earum sequi quisquam accusantium dolorem nulla labore enim temporibus facilis quos sed vitae incidunt, doloribus suscipit necessitatibus architecto vero. Aliquid, repellendus eligendi quidem iure quis nulla!</span>
        <span>Nesciunt minus deserunt dicta aliquid iusto aspernatur ipsum nulla architecto, corrupti iste asperiores incidunt. Nesciunt doloremque quibusdam, obcaecati qui quia quos! Eveniet distinctio officiis impedit inventore, animi voluptates quibusdam iure.</span>
        <span>Nam obcaecati dicta assumenda cum esse repellendus quam, voluptates ad quidem id mollitia necessitatibus quo, consequuntur placeat cupiditate, quod, doloribus expedita. Sapiente doloremque nostrum saepe? Ullam cupiditate itaque necessitatibus, odit.</span></p>
    </section>
    <!--jQuery3 -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <!-- SlickSlider --><!--
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    <script src="js/slickslider.js"></script> -->
    <!-- my custom JS -->
    <script src="/assets/pets/2020-04-04-flower-shop/page-switch.js"></script>
    <script src="/assets/pets/2020-04-04-flower-shop/fotorama.js"></script>
</body>
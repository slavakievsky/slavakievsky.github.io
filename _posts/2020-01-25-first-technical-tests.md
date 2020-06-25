---
layout: post
title: Первая тестовая заметка
description: Первый технический тест ресурса pushsla.github.io
tags: [jekyll]

mathjax:
    scale: 90
---

Это первая "притирочная" запись. Здесь в техническом порядке будут проверены:
* Markdown
    * Списки
    * Листинги кода
    * Картинки и ссылки
* MathJax
<!--more-->

## Markdown
### Списки
* Первый уровень
    * Второй уровень
        * Третий уровень

1. Нумерованный список
    1. Второй уровень списка

### Листинги кода
> Глянем, что делает код: (Цитата)

```markdown
| Programming Language | Type |
|:-----------|--------|
| Python | High-level, Objective |
| C++ | High-level |
| NASM | Low-level |
```

Вот, что

| Programming Language | Type
| Python | High-level, Objective
| C++ | High-level
| NASM | Low-level

А теперь немного кода на Python:
```python
for i in range(10):
    print(i)
try:
    with open('somefile','rb') as file:
        lines = file.readlines();

    for line in lines:
        print(line)
        print(line)
except FileNotFoundError:
    print("No Such File...")
```

### Картинки и ссылки
Простейшая вставка картинки: (Это лого гитхаба, кликабельно)

[![Image1](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)](https://github.com)

А вот некликабельное лого:

![Image1](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)


## Пробуем формулы MathJax
> MathJax -- JavaScript код. Если он используется на странице, будет специальное предупреждение. (В этом посте оно тоже есть)
{% include js-mathjax.js %}

$$
\begin{align}
\mbox{Union: } & A\cup B = \{x\mid x\in A \mbox{ or } x\in B\} \\
\mbox{Concatenation: } & A\circ B  = \{xy\mid x\in A \mbox{ and } y\in B\} \\
\mbox{Star: } & A^\star  = \{x_1x_2\ldots x_k \mid  k\geq 0 \mbox{ and each } x_i\in A\} \\
\end{align}
$$

### Цитирование
> Не все змеи ядовиты...

### Проверка терминологии
ПО MS рач wm кейс

А теперь можно вернуться на [главную](/)

---
layout: post
title: Изучение React.js Часть 3. Todo list
description: Первые шаги в разработке на React.
tags: [web, frontend, education, react.js]
---

Сегодня я расскажу, как научился использовать контекст React для связи различных компонентов при разработке
простейшего приложения-календаря задач.

<!--more-->

## Постановка и декомпозиция задачи
### Цель
На этот раз я решил поставить себе чуть более интересную, чем в прошлый раз, цель.

Сегодня я расскажу тебе о реализации простенького прототипа календарика-задачника.

Суть приложения заключается в следующем: имеется некоторый список задач, каждая из которых имеет определенную дату
начала и дедлайн. Необходимо реализовать приложение, которое отобразит в виде линейчатого графика эти задачи
с возможностью создания и удаления задач. Также хочется, чтобы можно было выбирать цвет задачи на диаграмме
в режиме реального времени =)

### Макет
Для начала решил набросать простенький макет. Я совершенно не дизайнер, поэтому решил подойти к разработке
макета чисто технологически и для начала создал базовые компоненты, из которых в последствии получатся
уже элементы интерфейса на основном макете:

![базовые компоненты](/assets/posts/2021-01-31-self-learning-frontend-4/common.jpg)

После чего копипастом на фрейм небольшого размера, размещаю компоненты следующим образом:

![макет приложения](/assets/posts/2021-01-31-self-learning-frontend-4/template.jpg)

Слева видно меню управления задачами:
* Поле ввода имени задачи
* Список задач, маркированных цветами с кнопкой удаления

Справа расположился "календарик" задач, представляющий собой некий горизонтальный timeline.
Для простоты положим, что один столбец обозначает один день

### Задачи
Собственно разбить общую задачу на компоненты решения я решил следующим образом:
* Структура данных для хранения задач
* Меню
  * Создание задачи
  * Список задач
* График

## Шина данных между компонентами
Настало время задуматься о том, каким образом будет происходить согласование содержимого списка задач
между меню и графиком, которые являются отдельными и независимыми компонентами. Классический трюк 
с поднятием состояния к родителю с последующей его передачей разным потомкам считаю достаточно громоздким, негибким,
непрозрачным и недостаточно контролируемым.

Redux на мой взгляд в данном случае избыточен, к тому же я не успел в нем разобраться)

Таким образом я решил использовать контекст React.

### Context
Что такое контекст в React? Это способ передачи данных по дереву компонентов без необходимости
передачи свойств. Это позволяет нам избавиться от громоздких конструкций классического метода передачи
данных сверху вниз, особенно при глубокой вложенности потребителя данных.

Контекст работает следующим образом: создаётся "поставщик", после чего создается некоторое количество пар "поставщик-потребитель",
в которых поставщик является общим в данном случае. В результате каждый раз при отрисовке элемента,
являющегося потребителем контекста, будет происходить считывание значений поставщика, а при изменении значения
внутри поставщика будет происходить перерисовка потребителей.

Чтобы использовать данную "технологию", необходимо совершить три волшебных пасса:
Создать поставщика контекста:
```tsx
export const TaskContainerContext = React.createContext({
  addTask: (task: Task) => {},
  removeTask: (id: number) => {},
  setTaskProps: (id: number, props: TaskPropsPartial) => {},
});
```

Объявить регион поставщика в общем родителе, передав в качестве параметра *value* начальное состояние данных
   контекста:
```tsx
<TaskContainerContext.Provider value={this.state.context}>
          <main className="App">
            <Menu/>
            <Graph/>
          </main>
</TaskContainerContext.Provider>
```

Определить внутри потомков регион потребителя, являющийся чистой функцией от контекста, возвращающей элемент React DOM
```tsx
<div className="Graph">
    <TaskContainerContext.Consumer>
        {context => (
            ...
        )}
    </TaskContainerContext.Consumer>
</div>
```

## Структура проекта
В общем структура проекта будет выглядеть следующим образом:
![структура проекта](/assets/posts/2021-01-31-self-learning-frontend-4/structure.jpg)

Где **components** -- компоненты интерфейса;

**contexts** -- поставщики контекста;

**datatypes** -- структуры данных.

## Детали и тонкости реализации
### Изменение данных внутри контекста
Один из потомков -- меню -- является средством управления данными в контексте. Однако стандартная схема
передачи данных в React не позволяет потомкам изменять данные состояния родителя. То же справедливо и для контекста.

Чтобы решить это затруднение, я решил добавить в контекст необходимые методы, а затем, определив их
внутри компонента-поставщика, передать в контекст:
```tsx
export const TaskContainerContext = React.createContext({
  tasks: new TaskContainer("Taskcontainer"),
  addTask: (task: Task) => {},
  removeTask: (id: number) => {},
  setTaskProps: (id: number, props: TaskPropsPartial) => {},
});
```
```tsx
class App extends React.Component{
  addTask = (task: Task) => {
    const newtasks = this.state.context.tasks;
    newtasks.addTask(task);

    this.setState({
      tasks: newtasks
    });
  }

  removeTask = (id: number) => {
    const newtasks = this.state.context.tasks;
    newtasks.removeTask(id);

    this.setState({
      tasks: newtasks
    });
  }

  setTaskProps = (id: number, props: TaskPropsPartial) => {
    const newtasks = this.state.context.tasks;
    newtasks.setTaskProps(id, props);

    this.setState({
      tasks: newtasks
    });
  }

  state = {
    context: {
      tasks: new TaskContainer("Tasks"),
      addTask: this.addTask,
      removeTask: this.removeTask,
      setTaskProps: this.setTaskProps,
    }
  }

  render()
  {
    return (
        <TaskContainerContext.Provider value={this.state.context}>
          <main className="App">
            <Menu/>
            <Graph/>
          </main>
        </TaskContainerContext.Provider>
    );
  }
}
```

Таким образом компонент наследник, являющийся потребителем контекста, имеет возможность вызова этих методов,
а так как методы в JS имеют таки ссылочный тип, то происходит обращение к методу компонента-владельца контекста:
```tsx
export default function Menu({...other}: MenuProps){
    const [currentTaskName, setCurrentTaskName] = useState("");

    const onAddButtonClick = (e: React.MouseEvent<HTMLButtonElement>, add_function: any) => {
        e.preventDefault();
        if (currentTaskName !== "") {
            add_function(new Task(0, 10, currentTaskName, "#999"));
        }
    }

    const onDelButtonClick = (e: React.MouseEvent<HTMLButtonElement>, del_function: any, id: number) => {
        e.preventDefault();
        del_function(id);
    }

    const onAddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTaskName(e.target.value);
    }

    const onEntryColorClick = (e: React.MouseEvent<HTMLButtonElement>, set_function: any, id: number) => {
        const newcolor = prompt("New color:");
        set_function(id, {taskColor: newcolor});
    }

    return(
        <TaskContainerContext.Consumer>
            {context => (
                <div className="Menu">
                    <form action="" className="Menu__form">
                        <Input onChange={onAddInputChange}/>
                        <Button onClick={(e) => onAddButtonClick(e, context.addTask)}>+</Button>
                    </form>
                    <ul {...other} className="Menu__list">
                        {context.tasks.state.container.map((task, i) => (
                            <li key={`index:${i}id:${task.state.id}`}>
                                <Entry task={task} onColorClick={
                                    (e: React.MouseEvent<HTMLButtonElement>) => onEntryColorClick(e, context.setTaskProps, task.state.id)
                                }>
                                    <Button className="Entry__Button" onClick={(e) =>
                                        onDelButtonClick(e, context.removeTask, task.state.id)
                                    }>-</Button>
                                </Entry>
                            </li>
                        ))}
                        {context.tasks.state.container.length === 0 && <span className="Menu__list_placeholder">There are no tasks yet</span>}
                    </ul>
                </div>
            )}
        </TaskContainerContext.Consumer>
    );
}
```

А вслед за изменением данных владельца контекста, происходит перерисовка и графа с задачами:
```tsx
export default function Graph(){
    return(
        <div className="Graph">
            <TaskContainerContext.Consumer>
                {context => (
                    <table className="Graph__table">
                        <thead className="Graph__head">
                        <tr>
                            {Array.from(
                                {length: context.tasks.state.max_time - context.tasks.state.min_time + 1},
                                (_, i) => i).map((item, i) => (
                                <th className="Graph__cell Graph__cell_head" key={item}>{item}</th>
                            ))
                            }
                        </tr>
                        </thead>
                        <tbody className="Graph__body">
                        {context.tasks.state.container.map((task, i) => (
                            <tr className="Graph__row" key={task.state.id}>
                                {Array.from(
                                    {length: task.state.startTime - context.tasks.state.min_time + 1},
                                    (_, i) => i).map((item, i) => (
                                    <td key={`empty-${item}`}></td>
                                ))
                                }
                                <td
                                    className="Graph__cell Graph__cell_task"
                                    colSpan={task.state.stopTime - task.state.startTime}
                                    style={{background: task.state.taskColor}}
                                >{task.state.taskName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </TaskContainerContext.Consumer>
        </div>
    );
}
```

## Таки демо
Вот, как оно работает:
![demo](/assets/posts/2021-01-31-self-learning-frontend-4/demo.gif)
[Сссылка на гит](https://github.com/pushsla/try.react.js/tree/TaskCalendar)
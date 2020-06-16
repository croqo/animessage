# lottie-factory
**Required**:
- [lottie-web](https://github.com/airbnb/lottie-web)
- jquery

Итак, чтобы чудо случилось и настройки анимации из форм применились
к контейнерам, создаем элемент с классом _.lottie-player_ и любым уникальным _#id_:
~~~~
<div id="yourCustomId" class="lottie-player"></div>
~~~~

Настройки анимации задаются формами со ссылкой на #id контейнера: _data-target_.
Внутри инпуты, формирующие, настройки анимации.
Аттрибут _name_ — ключ объекта для хранения настроек:
~~~~
<form data-target="yourCustomId">
    <input 
        name="url" 
        type="text" 
        value="https://assets9.lottiefiles.com/packages/lf20_KsE9Lh.json"
    >
    <input name="delay"
        type="number" 
        step="500" 
        value="0"
    >
    <select name="speed">
        <option>0.5</option>
        <option selected value="1">Normal</option>
        <option>1.5</option>
        <option>2.0</option>
        <option>2.5</option>
    </select>
    <input name="loop" type="checkbox">
</form>
~~~~

#### Config (object):
- **url** (string)
- **dalay** (number) delay before start play (ms)
- **speed** (number) normal is 1
- **loop** (bolean)

Для быстрой связи пишите в [телеграм](https://t.me/croqo)
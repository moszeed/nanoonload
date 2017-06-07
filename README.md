# nanoonload
tiny wrapper around mutation observe to detect added and removed elements


[![Join the chat at https://gitter.im/moszeed/nanoonload](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/moszeed/nanoonload?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## how to get
install from npm

    npm i nanoonload

## how to use

### example, using body

```javascript
const nanoonload = require('nanoonload');

const el = document.createElement('div');
      el.className   = 'test1';
      el.textContent = 'addElement';

nanoonload('div.test1',
    (el) => { console.log('element is added'); },
    (el) => { console.log('element is removed'); }
);

document.body.appendChild(el);
document.body.removeChild(el);
```

### example, with a targetNode

```javascript
const nanoonload = require('nanoonload');

const baseElement = document.createElement('div');
      baseElement.className = 'baseElement';

const appendEl = document.createElement('div');
      appendEl.className   = 'addElement';

nanoonload('div.addElement',
    (el) => { console.log('element is added'); },
    (el) => { console.log('element is removed'); }, {
        targetNode: baseElement
    }
);

baseElement.appendChild(appendEl);
baseElement.removeChild(appendEl);
```

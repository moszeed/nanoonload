const nanoonload = require('./')
const test       = require('tape')

test('add/remove element to body', function(t) {

    t.plan(2);
    const el = document.createElement('div');
          el.className   = 'test1';
          el.textContent = 'addElement';

    nanoonload('div.test1',
        (el) => { t.ok(true, 'element is added'); },
        (el) => { t.ok(true, 'element is removed'); }
    );

    document.body.appendChild(el);
    document.body.removeChild(el);
});

test('add/remove element to created element', function(t) {

    t.plan(2);

    const baseElement = document.createElement('div');
          baseElement.className = 'baseElement';

    const appendEl = document.createElement('div');
          appendEl.className   = 'addElement';

    nanoonload('div.addElement',
        (el) => { t.ok(true, 'element is added');   },
        (el) => { t.ok(true, 'element is removed'); }, {
            targetNode: baseElement
        }
    );

    baseElement.appendChild(appendEl);
    baseElement.removeChild(appendEl);
});

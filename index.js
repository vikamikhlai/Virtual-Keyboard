import keysData from './keys.json' assert { type: "json"};

const textarea = document.createElement('textarea');
textarea.className = "body__textarea";
textarea.rows = "5";
textarea.cols = "50";
document.body.append(textarea);

const wrapper = document.createElement('div');
wrapper.className = "wrapper";
document.body.append(wrapper);

const keyWrapper = document.createElement('div');
keyWrapper.className = "keyboard__wrapper";
wrapper.append(keyWrapper);

const keyRow = document.createElement('div');
keyRow.className = "keyboard__row";
keyWrapper.append(keyRow);

function createKey(data) {
    const key = document.createElement('div');
    const ruSpan = document.createElement('span');
    const enSpan = document.createElement('span');
    for (let prop in data.en) {
        const span = document.createElement('span');
        span.className = prop;
        enSpan.append(span);
        span.innerHTML = data.en[prop];
    }

    enSpan.firstChild.classList.add('active');

    for (let prop in data.ru) {
        const span = document.createElement('span');
        span.className = prop;
        ruSpan.append(span);
        span.innerHTML = data.ru[prop];
    }
    if (data.type === "control") {
        key.className = "key " + data.name;
    } else {
        key.className = "key";
    }
    ruSpan.className = "ru";
    enSpan.className = "en active";
    key.append(ruSpan, enSpan);
    keyRow.append(key);
}

for (let i = 0; i < keysData.length; i++) {
    createKey(keysData[i]); 
}

const buttons = document.querySelector('.keyboard__row');
let buttonClick;

function clickOnButton (event) {
    if (event.target.closest('.key')) {
        event.target.closest('.key').classList.add('click');
        textarea.value += event.target.closest('.key').querySelector('.active .active').innerHTML;
        if (buttonClick) {
            buttonClick.classList.remove('click');
        }
        buttonClick = event.target.closest('.key');
    }
}

buttons.addEventListener('click', clickOnButton);


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
let isCaps = false;

function createKey(data) {
    const key = document.createElement('div');
    const ruSpan = document.createElement('span');
    const enSpan = document.createElement('span');

    ruSpan.className = "ru";
    enSpan.className = "en";

    enSpan.classList.add('active');

    key.setAttribute("keycode", data.keycode);

    for (let prop in data.en) {
        const span = document.createElement('span');
        span.className = prop;
        enSpan.append(span);
        span.innerHTML = data.en[prop];
    }

    for (let prop in data.ru) {
        const span = document.createElement('span');
        span.className = prop;
        ruSpan.append(span);
        span.innerHTML = data.ru[prop];
    }

    
    if (data.type === "control") {
        key.className = "key " + data.name;
        if (data.name === 'space') {
            key.dataset.inputable = true;
        }
    } else {
        key.className = "key";
        key.dataset.inputable = true;
    }

    isCaps
        ? enSpan.querySelector('.caseUp').classList.add('active')
        : enSpan.querySelector('.caseDown').classList.add('active');
    key.append(ruSpan, enSpan);
    keyRow.append(key);
}

for (let i = 0; i < keysData.length; i++) {
    createKey(keysData[i]);
}

const buttons = document.querySelector('.keyboard__row');
let buttonClick;

function changeCase(isShift) {
    document.querySelectorAll('.key').forEach(el => {
        el.querySelector('.active .active').classList.toggle('active');
        isCaps 
            ? isShift
                ? el.querySelector('.shiftcaps').classList.add('active')
                : el.querySelector('.caseDown').classList.add('active')
            : isShift
                ? el.querySelector('.caseUp').classList.add('active')
                : el.querySelector('.caseDown').classList.add('active')
    })
}

function clickOnButton (event) {
    const keyElement = event.target.closest('.key');
    if (keyElement) {
        keyElement.classList.add('click');
        switch (keyElement.dataset.action) {
            case "enter":
                textarea.value += '\r\n';
                break;
            case "capslock":
                isCaps = !isCaps;
                changeCase(false)
                break;
            case "shift":
                changeCase(true)
                break;
            case "ctrl":

                break;
            case "backspace":

                break;
            case "del":

                break;
            case "up":

                break;
            case "down":

                break;
            case "left":

                break;
            case "right":

                break;
            case "alt":

                break;
            case "tab":
                textarea.value += '\t';
                break;
        }

        if (keyElement.dataset.inputable) {
            textarea.value += keyElement.querySelector('.active .active').innerHTML;
        }
        if (buttonClick) {
            buttonClick.classList.remove('click');
        }
        buttonClick = keyElement;
    }
}

buttons.addEventListener('click', clickOnButton);
addEventListener('keydown', event => {
    console.log(event)
});

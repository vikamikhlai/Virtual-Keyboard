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
        key.dataset.action = data.name;
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
        el.querySelector('.active .active').classList.remove('active');
        if (isCaps && isShift) el.querySelector('.active .shiftcaps').classList.add('active')
        if (isCaps && !isShift) el.querySelector('.active .caps').classList.add('active')
        if (!isCaps && isShift) el.querySelector('.active .caseUp').classList.add('active')
        if (!isCaps && !isShift) el.querySelector('.active .caseDown').classList.add('active');
    })
}

function handleInput(keyElement) {
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
            case "backspace":
                if (!onBlur) break;
                if (focusPosition) {
                    textarea.value = textarea.value.slice(0, focusPosition - 1) + textarea.value.slice(focusPosition);
                    focusPosition -= 1;
                } else {
                    textarea.value = textarea.value.slice(0, -1);
                }
                break;
            case "del":
                textarea.value = textarea.value.slice(0, focusPosition) + textarea.value.slice(focusPosition + 1);
                break;
            case "tab":
                textarea.value += '\t';
                break;
        }

        if (keyElement.dataset.inputable) {
            textarea.value += keyElement.querySelector('.active .active').innerHTML;
        }
    }
}

function clickOnButton (event) {
    const keyElement = event.target.closest('.key');
    handleInput(keyElement);
    if (event.type === 'click') {
        keyElement && keyElement.classList.remove('click');
    }
}

function handleMouseDown(event) {
    const keyElement = event.target.closest('.key');
    if (keyElement && keyElement.dataset.action === 'shift') {
        changeCase(true);
    }
}

function handleMouseUp(event) {
    const keyElement = event.target.closest('.key');
    if (keyElement && keyElement.dataset.action === 'shift') {
        changeCase(false);
    }
}

function handleCaretPosition(event) {
    focusPosition = event.target.selectionStart;
    onBlur = false;
}

function handleKeyboard(event) {
    const keycodeButton = document.querySelector(`[keycode=${event.code}]`);
    handleInput(keycodeButton)
    if (event.type === 'keyup') {
        keycodeButton.classList.remove('click');
    }
}


let focusPosition; 
let onBlur = false;
textarea.addEventListener('focus', handleCaretPosition);
textarea.addEventListener('blur', () => onBlur = true);
textarea.addEventListener('mouseup', handleCaretPosition);

buttons.addEventListener('click', clickOnButton);
buttons.addEventListener('mousedown', handleMouseDown);
buttons.addEventListener('mouseup', handleMouseUp);

addEventListener('keydown', handleKeyboard);
addEventListener('keyup', handleKeyboard);
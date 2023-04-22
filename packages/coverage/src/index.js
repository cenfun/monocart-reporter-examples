const EC = {};

const add = (start, str, end) => {
    return `\x1b[${start}m${str}\x1b[${end}m`;
};

// https://en.wikipedia.org/wiki/ANSI_escape_code
// https://handwiki.org/wiki/ANSI_escape_code

// eight colors
// 0 - 7
const list = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

// text color
list.forEach((name, i) => {
    EC[name] = (str) => {
        return add(`3${i}`, str, '39');
    };
});

// background color
EC.bg = {};
list.forEach((name, i) => {
    EC.bg[name] = (str) => {
        return add(`4${i}`, str, '49');
    };
});

// bright color
EC.br = {};
list.forEach((name, i) => {
    EC.br[name] = (str) => {
        return add(`9${i}`, str, '39');
    };
});

// bright background color
EC.br.bg = {};
list.forEach((name, i) => {
    EC.br.bg[name] = (str) => {
        return add(`10${i}`, str, '49');
    };
});


// styles
EC.reset = (str) => {
    return add('0', str, '0');
};
EC.bold = (str) => {
    return add('1', str, '21');
};
EC.faint = (str) => {
    return add('2', str, '22');
};
EC.italic = (str) => {
    return add('3', str, '23');
};
EC.underline = (str) => {
    return add('4', str, '24');
};
EC.inverse = (str) => {
    return add('7', str, '27');
};
EC.hidden = (str) => {
    return add('8', str, '28');
};
EC.strike = (str) => {
    return add('9', str, '29');
};

// remove color
EC.remove = (str) => {
    return `${str}`.replace(/\033\[(\d+)m/g, '');
};

// log hook
EC.log = function() {
    console.log.apply(console, arguments);
};

EC.logColor = function() {
    const args = Array.from(arguments);
    const color = args.pop();
    let str;
    const fn = EC[color];
    if (typeof fn === 'function') {
        str = fn(args.join(' '));
    } else {
        args.push(color);
        str = args.join(' ');
    }
    EC.log(str);
    return str;
};

list.forEach((color) => {
    const api = `log${color.charAt(0).toUpperCase()}${color.slice(1)}`;
    EC[api] = function() {
        const args = Array.from(arguments);
        args.push(color);
        return EC.logColor.apply(EC, args);
    };
});

export { EC };

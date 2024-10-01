// shard1, 2 times
function foo(argument) {
    console.log('this is foo');

    if (argument) {
        console.log('covered foo argument');
    }
}

// shard3
function bar(argument) {
    console.log('this is bar');

    if (argument) {
        console.log('covered bar argument');
    }
}

const a = () => {};

(function() {})();

// shard1
function app() {
    console.log('this is app');
}

if (module.a) {
    console.log('a');
}

for (let i = 0; i < 5; i++) {
    if (i > 2) {
        console.log(i);
    } else if (module.b) {
        console.log('b');
    }
}

window.foo = foo;
window.bar = bar;
window.app = app;

// call apply bind
var obj = {num: 2};
var add = function(a, b) {
    return this.num + a + b;
}

// call
add.call(obj, 3, 1);// result is 6

// apply
let args = [3, 1];
add.apply(obj, args); // result is 6

// bind
let bound = add.bind(obj);
bound(3, 1); // result is 6
var rect = require('./rectangle');

function solveRect(l, b) {
    console.log(
        'Solving for rectangle with length = ' + l + ' and breadth = ' + b
    );
    rect(l, b, (err, rectangle) => {
        if (err) {
            console.log('ERROR: ', err.message);
        } else {
            console.log(
                'The are of the rectangle of dimensions l =' +
                    l +
                    ' and b = ' +
                    b +
                    ' is ' +
                    rectangle.area()
            );
            console.log(
                'The perimeter of the rectangle = ' + rectangle.perimeter()
            );
        }
    });
    console.log('This statement is after the call to Rect');
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(-3, 5);

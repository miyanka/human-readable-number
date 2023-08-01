module.exports = function toReadable(number) {
    const digits = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
    ];
    const firstDecades = [
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
    ];
    const decades = [
        ,
        ,
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety",
    ];
    const ranks = {
        2: "hundred",
        3: "thousand",
        6: "million",
        9: "billion",
        12: "trillion",
    };

    let countDigits = number.toString().length;
    let result = "";

    if (countDigits === 1) {
        return digits[number];
    }

    if (countDigits === 2) {
        if (number < 20) {
            return firstDecades[number % 10];
        } else {
            result =
                number % 10 === 0
                    ? `${decades[Math.floor(number / 10)]}`
                    : `${decades[Math.floor(number / 10)]} ${toReadable(
                          number % 10
                      )}`;
            return result;
        }
    }

    let factor; // 100, 1000, 1000000, ...
    let rank; // 2, 3, 6, ... count zeros

    if (countDigits === 3) {
        rank = countDigits - 1;
        factor = Number(`1${"0".repeat(rank)}`);
    } else {
        let remainder = countDigits % 3;
        rank = remainder === 0 ? countDigits - 3 : countDigits - remainder;
        factor = Number(`1${"0".repeat(rank)}`);
    }

    result =
        number % factor === 0
            ? `${toReadable(Math.floor(number / factor))} ${ranks[rank]}`
            : `${toReadable(Math.floor(number / factor))} ${
                  ranks[rank]
              } ${toReadable(number % factor)}`;

    return result;
};

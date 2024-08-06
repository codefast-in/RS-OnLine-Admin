export function convertAmountToWords(amount:number) {
    // Arrays to hold words for digits and tens
    var units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    // Function to convert a two-digit number to words
    function convertTwoDigitNumber(number:number) {
        if (number < 10) {
            return units[number];
        } else if (number < 20) {
            return teens[number - 10];
        } else {
            var digit = number % 10;
            var ten = Math.floor(number / 10);
            return tens[ten] + ' ' + units[digit];
        }
    }

    // Function to convert a three-digit number to words
    function convertThreeDigitNumber(number:number) {
        var hundred = Math.floor(number / 100);
        var remaining = number % 100;
        var words = '';
        if (hundred > 0) {
            words += units[hundred] + ' hundred ';
        }
        if (remaining > 0) {
            words += convertTwoDigitNumber(remaining);
        }
        return words.trim();
    }

    // Main conversion logic
    if (amount === 0) {
        return 'zero';
    }

    var words = '';
    var billion = Math.floor(amount / 1000000000);
    var million = Math.floor((amount % 1000000000) / 1000000);
    var thousand = Math.floor((amount % 1000000) / 1000);
    var remainder = amount % 1000;

    if (billion > 0) {
        words += convertThreeDigitNumber(billion) + ' billion ';
    }
    if (million > 0) {
        words += convertThreeDigitNumber(million) + ' million ';
    }
    if (thousand > 0) {
        words += convertThreeDigitNumber(thousand) + ' thousand ';
    }
    if (remainder > 0) {
        words += convertThreeDigitNumber(remainder);
    }

    return words.trim();
}
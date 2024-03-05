function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    let i = 5;
    while (i * i <= n) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
        i += 6;
    }
    return true;
}

function nextPrime(currentPrime) {
    let nextNumber = currentPrime + 1;
    while (true) {
        if (isPrime(nextNumber)) return nextNumber;
        nextNumber++;
    }
}

let currentPrime = 2;

for (let i = 0; i < 10; i++) { // Example: loop 10 times
    console.log("Current prime:", currentPrime);

    let newPrime = nextPrime(currentPrime);
    console.log("New prime:", newPrime);

    currentPrime *= newPrime;
    console.log("Result after multiplication:", currentPrime);
    console.log();
}

// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require('fs');

function removeExtra(txt) {
    return txt.replace(/\s+/g, ' ').trim();
}

function cleanFile(file) {
    fs.readFile(file, "utf-8", (err, data) => {
        if (err) {
            console.error(`Error reading the file: ${err}`);
            return;
        }
        const cleanData = removeExtra(data);
        fs.writeFile(file, cleanData, 'utf-8', (err) => {
            if (err) {
                console.error(`Error writing to the file: ${err}`);
                return;
            }
            console.log('File has been cleaned and saved successfully.');
        });
    });
}

cleanFile("ajay.txt");

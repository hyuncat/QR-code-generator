const qr = require('qr-image');
const fs = require('fs');

/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

async function main() {
  const inquirerModule = await import('inquirer');
  const inquirer = inquirerModule.default;

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'url',
        message: 'Please enter a URL to generate a QR code:',
      },
    ])
    .then((answers) => {
      const qr_png = qr.image(answers.url, { type: 'png' });
      qr_png.pipe(fs.createWriteStream('qr_img.png'));

      fs.writeFile('URL.txt', answers.url, (err) => {
        if (err) throw err;
        console.log('\nThe file has been saved!\n---');
        console.log(' - To view the QR code, open qr_img.png');
        console.log(' - To view the URL, open URL.txt');
        console.log(' - To generate a new QR code, restart the program.');
      });
    });
}

main();
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'Lets creat a Project title.',
        name: 'title'

    },
    
    {
        type: 'input',
        message: 'Provide short description of application function.',
        name: 'description',
    },
   
    {
        type: 'input',
        message: 'Application Instructions(optional)',
        name: 'installation',
    },
    {
        type: 'checkbox',
        message: 'Select a licese for this app',
        name: 'licenses',
        choices: [
            'Perl',
            'Apache_2.0',
            'MIT',
            'Other',
            'None',
        ]

    },
    {
        type: 'input',
        message: 'Provide some quick intstructions on how to use the app',
        name: 'usage inst',
    },
    {
        type: 'input',
        message: 'How can the users contribute to this app?',
        name: 'contributions',
    },
    {
        type: 'input',
        message: 'Provide testing for your application (Optional)',
        name: 'test',
    },
    {
        type: 'input',
        message: 'Enter GitHub username',
        name: 'github',
    },
    {
        type: 'input',
        message: 'Enter your email address',
        name: 'email',
    },

];

// TODO: Create function to write Read.Me
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
      fs.writeFile('generated-README.md', fileContent, err => {
        if (err) {
          reject(err);
          return;
        }
  
        resolve({
          ok: true,
          message: 'READ.ME file was created. Great job!'
        });
      });
    });
  };
  
  // Function that prompts questions + store user inputs
  const init = () => {
  
    return inquirer.prompt(questions)
    .then(readmeData => {
        return readmeData;
    })
};
  // TODO: Create a function to initialize app
  init()
  .then(readmeData => {
    console.log(readmeData);
    return generateMarkdown(readmeData);
  })
  .then(pageMD => {
    return writeFile(pageMD);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse.message);
  })
  .catch(err => {
    console.log(err);
  });
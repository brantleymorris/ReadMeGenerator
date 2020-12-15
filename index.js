// // array of questions for user
// const questions = [

// ];

// // function to write README file
// function writeToFile(fileName, data) {
// }

// // function to initialize program
// function init() {

// }

// // function call to initialize program
// init();

// above is the provided code, I don't think I want to use it
// my code is below

const inquirer = require("inquirer");
const fs = require("fs");

var questions = [
    {
        type: "input",
        name: "title",
        message: "What is your projects title?"
    },
    {
        type: "input",
        name: "description",
        message: "Enter a description here."
    },
    {   // need to write a function so that the array elements are listed on seperate lines
        type: "checkbox",
        name: "tableContents",
        message: "What would you like included in the table of contents?",
        choices: ["Installation", "Usage", "License", "Contributing", "Tests", "Contact"]
    },
    {
        type: "input",
        name: "installation",
        message: "Enter installation instructions here."
    },
    {
        type: "input",
        name: "usage",
        message: "Enter usage information here."
    },
    {
        type: "list",
        name: "license",
        message: "Please choose a license type. If you are unsure which license to choose we suggest checking out https://choosealicense.com/ .",
        choices: ["Apache 2.0 License", "Boost Software License", "BSD 3-Clause License", "BSD 2-Clause License", "MIT License", "Mozilla Public License 2.0", "Public Domain Dedicaiton and License"] // need to enter license types into this array, causes error
    },
    {
        type: "input",
        name: "contributing",
        message: "Enter contributing information here."
    },
    {
        type: "input",
        name: "tests",
        message: "Enter testing information here."
    },
    {
        type: "input",
        name: "gitHub",
        message: "What is your gitHub username?",
        //default: "I don't have a gitHub profile or prefer not to include it." 
    },
    {
        type: "input",
        name: "email",
        message: "What email would you like to use?",
       // default: "I would rather not include my email."
    },
];

const licenses = [
    {license: "Apache 2.0 License",
    link: "https://opensource.org/licenses/Apache-2.0",
    badge: "![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)"},
    
    {license: "Boost Software License 1.0",
    link: "https://www.boost.org/LICENSE_1_0.txt",
    badge: "![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)"},
    
    {license: "BSD 3-Clause License",
    link: "https://opensource.org/licenses/BSD-3-Clause",
    badge: "![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)"},
    
    {license: "BSD 2-Clause License",
    link: "https://opensource.org/licenses/BSD-2-Clause",
    badge: "![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)"},
    
    {license: "MIT License",
    link: "https://opensource.org/licenses/MIT",
    badge: "![License](https://img.shields.io/badge/License-MIT-yellow.svg)"},
    
    {license: "Mozilla Public License",
    link: "https://opensource.org/licenses/MPL-2.0",
    badge: "![License](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)"},
    
    {license: "Public Domain Dedication and License",
    link: "https://opendatacommons.org/licenses/pddl/",
    badge: "![License](https://img.shields.io/badge/License-PDDL-brightgreen.svg)"}
]

let createReadMe = (title, licenseBadge, description, tableContents, installation, usage, license, licenseLink, contributing, tests, gitHub, email) => {
    return `#${title}           
    ${licenseBadge}
    
    ## Description
        ${description}

    ## Table of Contents
        ${tableContents}

    ## Installation
        ${installation}

    ## Usage
        ${usage}

    ## License - ${license}
    More information on this license can be found at ${licenseLink}

    ## Contributing
        ${contributing}

    ## Testing
        ${tests}

    ## Questions
    This project can be found at https://github.com/${gitHub}/
        
    And the author can be contacted at ${email} to address any questions.

    `
};

let getLicenseLink = (license) => {
    for (i = 0; i < licenses.length; i ++) {
        if (licenses[i].license === license) {
            return licenses[i].link;
        }
    }
}

let getLicenseBadge = (license) => {
    for (i = 0; i < licenses.length; i ++) {
        if (licenses[i].license === license) {
            return licenses[i].badge;
        }
    }
}


// decided to make email and gitHub required, but left in incase I decided to change that later.

// let writegitHubAndEmail = (gitHub, email) => {
//     return `## Questions
//     This project can be found at https://github.com/${gitHub}/
    
//     The author can be contacted at ${email} to address any questions.
//     `
// };

// let writegitHub = gitHub => {
//     return `## Questions
//     This project can be found at https://github.com/${gitHub}/
//     `
// };

// let writeEmail = email => {
//     return `## Questions
//     The author can be contacted at ${email} to address any questions.
//     `
// };



inquirer  
.prompt(questions)
.then(answers => {
    console.log(answers); // can be removed later

    const {title, description, tableContents, installation, usage, license, contributing, tests, gitHub, email} = answers;
    
    const licenseLink = getLicenseLink(license);
    const licenseBadge = getLicenseBadge(license); // badge doesn't display in text editor but will on github

    const template = createReadMe(title, licenseBadge, description, tableContents, installation, usage, license, licenseLink, contributing, tests, gitHub, email);
    
    // const addgitHubAndEmail = writegitHubAndEmail(gitHub, email);
    // const addgitHub = writegitHub(gitHub);
    // const addEmail = writeEmail(email);

    fs.writeFile("README.md", template, (err) => {
        if (err) throw err;
        console.log("The file has been created!");
    });

    // this will trigger before write file, but the else ifs trigger after
    // may need to run a promise?
    // if (gitHub !== "I don't have a gitHub profile or prefer not to include it." && email !== "I would rather not include my email.") {
    //     fs.appendFile("README.md", addgitHubAndEmail, (err) => {
    //         if (err) throw err;
    //         console.log("both triggered"); // can be removed later
    //     })
    // }
    // else if (gitHub !== "I don't have a gitHub profile or prefer not to include it.") {
    //     fs.appendFile("README.md", addgitHub, (err) => {
    //         if (err) throw err;
    //         console.log("github triggered"); // can be removed later
    //     })
    // }
    // else if (email !== "I would rather not include my email.") {
    //     fs.appendFile("README.md", addEmail, (err) => {
    //         if (err) throw err;
    //         console.log("email triggered"); // can be removed later
    //     })
    // }
})
.catch(error => {
    console.log(error);
});
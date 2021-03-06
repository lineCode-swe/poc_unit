const axios = require('axios');
const figlet = require('figlet');
const inquirer = require('inquirer');

var internal_data_multi_obs = {
    "x": 5,
    "y": 0,
    "path": 1,
    "obstacle": [
        {
            "x": 6,
            "y": 0
        },
        {
            "x": 6,
            "y": 1
        },
        {
            "x": 8,
            "y": 1
        },
        {
            "x": 8,
            "y": 2
        },
        {
            "x": 10,
            "y": 0
        },
        {
            "x": 10,
            "y": 1
        },
        {
            "x": 12,
            "y": 1
        },
        {
            "x": 13,
            "y": 1
        },
        {
            "x": 14,
            "y": 1
        },
        {
            "x": 14,
            "y": 2
        },
        {
            "x": 16,
            "y": 0
        },
        {
            "x": 16,
            "y": 1
        },
        {
            "x": 18,
            "y": 1
        },
        {
            "x": 18,
            "y": 2
        },
    ]
}

var internal_data_obs = {
    "x": 3,
    "y": 1,
    "path": 1,
    "obstacle": [
        {
            "x": 12,
            "y": 1
        },
    ]
}

var internal_data_def = {
    "x": 0,
    "y": 2,
    "path": 1,
    "obstacle": []
} 

function createLogo() {
    figlet('PORTACS', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
    });
}

async function moveBotDef(track) {
    internal_data_def.path = 0;
    for (var step in track) {
        internal_data_def.x = track[step].x;
        internal_data_def.y = track[step].y;
        await axios.post('http://0.0.0.0:8080/myapp/unit', internal_data_def);
        await new Promise(resolve => setTimeout(resolve, 2500));
        console.log("Unit has advanced");
        console.log("New position:\nX: " + internal_data_def.x + "\nY: " + internal_data_def.y + "\n");
    }
    console.log("Unit has arrived to destination");
}

const sendDefPostRequest = async () => {
    try {
        const resp = await axios.post('http://0.0.0.0:8080/myapp/unit', internal_data_def);
        moveBotDef(resp.data);
    } catch (err) {
        console.error(err);
    }
};


async function moveBotObs(track) {
    internal_data_obs.path = 0;
    for (var step in track) {
        internal_data_obs.x = track[step].x;
        internal_data_obs.y = track[step].y;
        await axios.post('http://0.0.0.0:8080/myapp/unit', internal_data_obs);
        await new Promise(resolve => setTimeout(resolve, 2500));
        console.log("Unit has advanced");
        console.log("New position:\nX: " + internal_data_obs.x + "\nY: " + internal_data_obs.y + "\n");
    }
    console.log("Unit has arrived to destination");
}

const sendObsPostRequest = async () => {
    try {
        const resp = await axios.post('http://0.0.0.0:8080/myapp/unit', internal_data_obs);
        moveBotObs(resp.data);
    } catch (err) {
        console.error(err);
    }
};

const sendMultiObsPostRequest = async () => {
    try {
        const resp = await axios.post('http://0.0.0.0:8080/myapp/unit', internal_data_multi_obs);
        moveBotObs(resp.data);
    } catch (err) {
        console.error(err);
    }
};

createLogo();

console.log("Unit is up. Starting in 15 seconds")
setTimeout(() => {
    console.log("Starting a new unit with multiple obstacles");
    sendMultiObsPostRequest();
}, 15000);


// setTimeout(function () {
//     inquirer
//         .prompt([
//             {
//                 type: 'list', message: "Select the operation you wish to execute:", name: 'operation', choices: [
//                     "Start a new unit with no obstacle",
//                     "Start a new unit with 1 obstacle",
//                     "Start a new unit with multiple obstacles"
//                 ]
//             }
//         ])
//         .then(answers => {
//             if (answers.operation === "Start a new unit with no obstacle") {
//                 sendDefPostRequest();
//             } else if (answers.operation === "Start a new unit with 1 obstacle") {
//                 sendObsPostRequest();
//             } else if (answers.operation === "Start a new unit with multiple obstacles") {
//                 sendMultiObsPostRequest();
//             }
//         })
//         .catch(error => {
//             if (error.isTtyError) {
//                 console.log("Oops, somenthing went wrong");
//             } else {
//                 console.log("Oops, somenthing went wrong");
//             }
//         });
// }, 100)

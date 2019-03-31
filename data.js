var fs = require('fs');

const getUsers = () => {
    var data = fs.readFileSync('myjsonfile.json', 'utf8');
    const userInfo = JSON.parse(data);
    return userInfo.users;
}

var obj = {
    users: getUsers() || []
};

exports.addUser = (userName, Password) => {
    obj.users.push({ userName: userName, Password: Password });
    writeUserinformation();
}

const writeUserinformation = () => {
    var json = JSON.stringify(obj);
    fs.writeFile('myjsonfile.json', json, 'utf8');
}

exports.isAvailable = (userName) => {
    var data = obj;
    if (data && data.users && data.users.length > 0) {
        for (var i = 0; i < data.users.length; i++) {
            if (data.users[i].userName === userName) {
                return true;
            }
        }
    }
    return false;
}





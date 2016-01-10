module.exports = ( function() {
    let names = {};

    const claim = function(name) {
        if (!name || names[name]) {
            return false;
        } else {
            names[name] = true;
            return true;
        }
    };

    // find the lowest unused "guest" name and claim it
    const getGuestName = function() {
        let name,
        nextUserId = 1;

        do {
            name = 'Guest ' + nextUserId;
            nextUserId += 1;
        } while (!claim(name));

        return name;
    };

    // serialize claimed names as an array
    const get = function() {
        var res = [];
        for (var user in names) {
            res.push(user);
        }

        return res;
    };

    const free = function(name) {
        if (names[name]) {
            delete names[name];
        }
    };

    return {
        claim: claim,
        free: free,
        get: get,
        getGuestName: getGuestName
    };
}());

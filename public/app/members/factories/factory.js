app.factory('Members', ['$resource', 'SERVER_URL', function ($resource, SERVER_URL) {
    return $resource(SERVER_URL + '/members/:id', {
        id: "@id"
    });
}]);

app.factory('MembersCategory', ['$resource', 'SERVER_URL', function ($resource, SERVER_URL) {
    return $resource(SERVER_URL + '/members-category/:id', {
        id: "@id"
    });
<<<<<<< HEAD
}]);
=======
}]);
>>>>>>> 6e4411260f151d7963affd882deca61537a10fa7

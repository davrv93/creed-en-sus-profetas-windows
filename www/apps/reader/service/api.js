app.factory('API_READER', function($resource) {
    // var data = $resource('http://davrv93.pythonanywhere.com/api/believe/book/:id', {id: '@id'}, {
    //      update:{ method:'PUT'},
    //      get:{ method:'GET', isArray:true}
    // });
    // return data;
    //}) 
    var url = "http://davrv93.pythonanywhere.com/api/believe/";
    // var headers = {
    //             'Access-Control-Allow-Origin' : '*',
    //             "Access-Control-Allow-Credentials":'false',
    //             'Access-Control-Allow-Methods' : 'POST, GET, HEAD, OPTIONS, PUT',
    //             "Access-Control-Allow-Headers":'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Authorization',                
    //         };

    // var headers = {
    //     'Accept': 'application/json',
    //     "Access-Control-Allow-Methods": "GET, OPTIONS, HEAD",
    //     "content-type": "application/json",
    //     "Access-Control-Allow-Headers":'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Authorization'



    // }
    return {
        Book: $resource(url + 'book/:id/:microrecurso/', { 'id': '@id', 'microrecurso': '@microrecurso' }, {
            'list': { method: 'GET', isArray: true },
            "save": { method: 'POST' },
            "update": { method: 'PUT' },
            'get': { method: 'GET', isArray: true },
            'post': { method: 'GET' },
            'destroy': { method: 'POST' }
        }),
        Testament: $resource(url + 'testament/:id/:microrecurso/', { 'id': '@id', 'microrecurso': '@microrecurso' }, {
            'list': { method: 'GET', isArray: true },
            "save": { method: 'POST' },
            "update": { method: 'PUT' },
            'get': { method: 'GET', isArray: true },
            'post': { method: 'GET' },
            'destroy': { method: 'POST' }
        }),

        Reading: $resource(url + 'verse/:id/:microrecurso/', { 'id': '@id', 'microrecurso': '@microrecurso' }, {
            'list': { method: 'GET', isArray: true },
            'select': {
                method: 'GET',
                isArray: true,
            },
            "save": { method: 'POST' },
            "update": { method: 'PUT' },
            'get': { method: 'GET', isArray: true },
            'post': { method: 'GET' },
            'destroy': { method: 'POST' }
        }),
    };
});

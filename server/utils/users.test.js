const expect = require('expect');

const {Users} = require('./users');

describe('Users', () =>{
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name:'John',
            room: 'Nodejs'
        },
        {
            id: '3',
            name:'Kennedy',
            room: 'JavaScript'
        },
        {
            id: '9',
            name:'Fab',
            room: 'Nodejs'
        }
    ]
    })

    it('should add new user', () =>{
        var users = new Users();
        var user = {
            id: '124',
            name: 'Kane',
            room: 'Dimconnect'
        };

        var resUser = users.addUser(user.id,user.name,user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () =>{
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    })

    it('should not remove user', () =>{
        var userId = '22';
        var user = users.removeUser(userId);

        expect(user).toNotExist;
        expect(users.users.length).toBe(3);
    })

    it('should find user', () =>{
        var userId = '3';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user', () =>{
        var userId = '99';
        var user = users.getUser(userId);

        expect(user).toNotExist
    });

    it('should return names for node course', () =>{
        var userList = users.getUserList('Nodejs');
        
        expect(userList).toEqual(['John','Fab']);
    })
})
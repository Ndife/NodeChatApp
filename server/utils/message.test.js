const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () =>{
    it('should generate correct message object', () =>{
        var from = 'Jen';
        var text = 'some message';
        var message = generateMessage(from,text);

        expect(message.createdAt).toBe(message.createdAt);
        expect(message.from).toBe(from); 
        expect(message.text).toBe(text); 

    });
});
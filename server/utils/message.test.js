const expect = require('expect');

const {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () =>{
    it('should generate correct message object', () =>{
        let from = 'Jen';
        let text = 'some message';
        let message = generateMessage(from,text);

        expect(message.createdAt).toBe(message.createdAt);
        expect(message.from).toBe(from); 
        expect(message.text).toBe(text); 

    });
});


describe('generateLocationMessage',() =>{
    it('should generate correct location object',() =>{
        let from = 'Uche';
        let latitude = 15;
        let longitude = 19;
        let url = 'https://www.googel.com/maps?q=15,19';
        let message = generateLocationMessage(from,latitude,longitude);

        expect(message.createdAt).toBe(message.createdAt);
        expect(message.from).toBe(from);
        expect(message.url).toBe(url)
        // expect(message).toInclude({from,url});
    })
})
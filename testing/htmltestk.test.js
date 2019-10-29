const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, 'home.html'), 'utf8');

jest
    .dontMock('fs');

describe('button', function () {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    afterEach(() => {
        // restore the original func after test
        jest.resetModules();
    });

    it('exists', function () {
        //expect(document.getElementById('disable')).toBeTruthy();
        const element1 = document.getElementById('navk');
        expect(element1).not.toBeNull();
        const element2 = document.getElementById('navbar-collapse-main');
        expect(element2).not.toBeNull();
        //expect(element2.innerHTML).toEqual('Current weather of City');

        const element3 = document.getElementById('home');
        expect(element3).not.toBeNull();
        const element4 = document.getElementById('modalLRForm');
        expect(element4).not.toBeNull();
        const element5 = document.getElementById('tab1head');
        expect(element5).not.toBeNull();

        const element6 = document.getElementById('tab1link');
        expect(element6).not.toBeNull();
        const element7 = document.getElementById('tab2head');
        expect(element7).not.toBeNull();
        const element8 = document.getElementById('tab2link');
        expect(element8).not.toBeNull();
        const element9 = document.getElementById('panel7');
        expect(element9).not.toBeNull();
        const element10 = document.getElementById('modalLRInput10');
        expect(element10).not.toBeNull();
        const element11 = document.getElementById('modalLRInput11');
        expect(element11).not.toBeNull();
        const element12 = document.getElementById('panel8');
        expect(element12).not.toBeNull();
        const element13 = document.getElementById('modalLRInput12');
        expect(element13).not.toBeNull();
        const element14 = document.getElementById('modalLRInput13');
        expect(element14).not.toBeNull();

        const element15 = document.getElementById('modalLRInput14');
        expect(element15).not.toBeNull();
        const element16 = document.getElementById('modalLRInput15');
        expect(element16).not.toBeNull();
        const element17 = document.getElementById('modalLRInput16');
        expect(element17).not.toBeNull();
        const element18 = document.getElementById('signupBtn');
        expect(element18).not.toBeNull();
        const element19 = document.getElementById('maintext');
        expect(element19).not.toBeNull();

        const element20 = document.getElementById('fixed');
        expect(element20).not.toBeNull();
        const element21 = document.getElementById('footer');
        expect(element21).not.toBeNull();

        const element22 = document.getElementById('textin');
        expect(element22).not.toBeNull();
        expect(element22.innerHTML).toEqual('We, at Pixagram understand that each person is different, and thus, provide a platform to share your special moments, hobbies, passion, memories and much more. Join our network of passionate people today and explore and meet many other people, get inspired!');
        const element23 = document.getElementById('contacttext');
        expect(element23).not.toBeNull();
        expect(element23.innerHTML).toEqual('Contact us');
        const element24 = document.getElementById('contact1');
        expect(element24).not.toBeNull();
        expect(element24.innerHTML).toEqual('Tejas Srivastava');
        const element25 = document.getElementById('contact2');
        expect(element25).not.toBeNull();
        expect(element25.innerHTML).toEqual('Current weather of City');
        const element26 = document.getElementById('Kanika Nadkarni');
        expect(element26).not.toBeNull();
        expect(element26.innerHTML).toEqual('Nikhil Motwani');
        const element27 = document.getElementById('pastext');
        expect(element27).not.toBeNull();
        expect(element27.innerHTML).toEqual('Share your Passion');
        const element28 = document.getElementById('creattext');
        expect(element28).not.toBeNull();
        expect(element28.innerHTML).toEqual('Bring your creativity to life!');
        
    });
});
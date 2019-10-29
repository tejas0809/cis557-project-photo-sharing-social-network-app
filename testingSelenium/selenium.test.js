const { Builder, By, Key, until } = require('selenium-webdriver')

require('selenium-webdriver/chrome');

var driver;
var returnedText;
var element1, element2;
var el3;
beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

afterAll(async () => { 
    await driver.quit();
});
async function mockUserAction() { 
    driver.wait(until.urlIs('http://localhost:8080/home.html')); 
    await driver.get('http://localhost:8080/home.html');
    //await driver.findElement(By.id('tinp')).sendKeys('', Key.RETURN);
    //await driver.findElement(By.id('tinp')).sendKeys('Pune', Key.RETURN);
    await driver.findElement(By.id('getStartedBut')).click();
    await driver.findElement(By.id('tab2link')).click();
    await driver.findElement(By.id('modalLRInput12')).sendKeys('', Key.RETURN);
    await driver.findElement(By.id('modalLRInput12')).sendKeys('kn@gmail.com', Key.RETURN);
    await driver.findElement(By.id('modalLRInput13')).sendKeys('', Key.RETURN);
    await driver.findElement(By.id('modalLRInput13')).sendKeys('kan', Key.RETURN);
    await driver.findElement(By.id('modalLRInput14')).sendKeys('', Key.RETURN);
    await driver.findElement(By.id('modalLRInput14')).sendKeys('nad', Key.RETURN);
    await driver.findElement(By.id('modalLRInput15')).sendKeys('', Key.RETURN);
    await driver.findElement(By.id('modalLRInput15')).sendKeys('kannad', Key.RETURN);
    await driver.findElement(By.id('modalLRInput16')).sendKeys('', Key.RETURN);
    await driver.findElement(By.id('modalLRInput16')).sendKeys('kan123', Key.RETURN);//signupBtn
    await driver.findElement(By.id('signupBtn')).click();
    driver.get('http://localhost:8080/profile.html');
    if(driver.getTitle() != null && driver.getTitle().contains('pixagram login'))//fullName
    {
        return await driver.findElement(By.id('fullName'));
    }
 
    //el3 = await driver.wait(until.elementLocated(By.id('head1')), 20000); 
    //return [el3 , await driver.findElement(By.id('img1'))];
     
}

it('initialize the driver and fill up page', async () => {
    element1 = await mockUserAction();
    await element1.getText().then(text => returnedText = text);
    /*var values = await mockUserAction();
    element1 =values[0];
    element2 =  values[1];
    await element1.getText().then(text => returnedText = text);
    await element2.getAttribute('src').then(text1 => returnurl =  text1);*/
        
});

  
it('test element text after selenium automation', () => {   
    expect(element1).not.toBeNull();
    expect(returnedText).toEqual("kan nad");
    //expect(element2).not.toBeNull();
    //expect(returnedText).toEqual("Pune : broken clouds , 298.13K");
    //expect(returnurl).toEqual("https://media3.giphy.com/media/fz0gaOzb82gko/100_s.gif?cid=917846db96cf2a9a87675d0e7c1e3272a56f7d3e69b0c6ce&rid=100_s.gif")
});


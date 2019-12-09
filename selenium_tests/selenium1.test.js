const {Builder, By, Key, until} = require('selenium-webdriver');
jest.setTimeout(50000);

beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

afterAll(async () => { 
    await driver.quit();
});

async function mockUserAction() { 
    driver.wait(until.urlIs('http://localhost:4200')); 
    await driver.get('http://localhost:4200');
    await driver.findElement(By.xpath('/html/body/app-root/app-header/mat-toolbar/a[2]/span')).click();
    await driver.wait(until.urlIs('http://localhost:4200/register')); 

    await driver.findElement(By.xpath('/html/body/app-root/main/app-register/mat-card/mat-horizontal-stepper/div[2]/div[1]/form/mat-form-field[1]/div/div[1]/div/input')).sendKeys("test1@gmail.com");
    await driver.findElement(By.xpath('/html/body/app-root/main/app-register/mat-card/mat-horizontal-stepper/div[2]/div[1]/form/mat-form-field[2]/div/div[1]/div[1]/input')).sendKeys('TestPassword');
    await driver.findElement(By.xpath('/html/body/app-root/main/app-register/mat-card/mat-horizontal-stepper/div[2]/div[1]/form/mat-form-field[3]/div/div[1]/div[1]/input')).sendKeys('TestPassword');
    await driver.findElement(By.xpath('/html/body/app-root/main/app-register/mat-card/mat-horizontal-stepper/div[2]/div[1]/form/button/span')).click();
    await driver.findElement(By.xpath('/html/body/app-root/main/app-register/mat-card/mat-horizontal-stepper/div[2]/div[2]/form/mat-form-field[1]/div/div[1]/div/input')).sendKeys('Test0');
    await driver.findElement(By.xpath('/html/body/app-root/main/app-register/mat-card/mat-horizontal-stepper/div[2]/div[2]/form/mat-form-field[2]/div/div[1]/div/input')).sendKeys('Test0');
    await driver.findElement(By.xpath('//html/body/app-root/main/app-register/mat-card/mat-horizontal-stepper/div[2]/div[2]/form/mat-form-field[3]/div/div[1]/div[1]/input')).sendKeys('01/01/1997');
    // await driver.findElement(By.xpath('/html/body/app-root/main/app-register/mat-card/mat-horizontal-stepper/div[2]/div[2]/form/mat-form-field[4]/div/div[1]/div/mat-select/div/div[1]/span')).sendKeys('Male');
    await driver.findElement(By.xpath('/html/body/app-root/main/app-register/mat-card/mat-horizontal-stepper/div[2]/div[2]/form/mat-form-field[4]/div/div[1]/div/mat-select/div/div[2]')).click();
    await driver.findElement(By.xpath('/html/body/div[2]/div[2]/div/div/div/mat-option[1]/span')).click();
    
    await driver.findElement(By.xpath('/html/body/app-root/main/app-register/mat-card/mat-horizontal-stepper/div[2]/div[2]/form/mat-form-field[5]/div/div[1]/div/input')).sendKeys('China');
    await driver.findElement(By.xpath('/html/body/app-root/main/app-register/mat-card/mat-horizontal-stepper/div[2]/div[2]/form/mat-form-field[6]/div/div[1]/div/input')).sendKeys('Beijing');
    await driver.findElement(By.xpath('/html/body/app-root/main/app-register/mat-card/mat-horizontal-stepper/div[2]/div[2]/form/mat-form-field[7]/div/div[1]/div/textarea')).sendKeys('Testing Bio');
    await driver.findElement(By.xpath('/html/body/app-root/main/app-register/mat-card/mat-horizontal-stepper/div[2]/div[2]/form/div/button[1]/span')).click();
    await driver.findElement(By.xpath('/html/body/app-root/main/app-register/mat-card/mat-horizontal-stepper/div[2]/div[3]/div/mat-checkbox/label/div')).click();
    await driver.findElement(By.xpath('/html/body/app-root/main/app-register/mat-card/mat-horizontal-stepper/div[2]/div[3]/div/button/span')).click();
    driver.wait(until.urlIs('http://localhost:4200/login')); 
    await driver.findElement(By.xpath('/html/body/app-root/main/app-login/div/mat-card/form/mat-card-content/mat-form-field[1]/div/div[1]/div/input')).sendKeys('tejas0809@gmail.com');
    await driver.findElement(By.xpath('/html/body/app-root/main/app-login/div/mat-card/form/mat-card-content/mat-form-field[2]/div/div[1]/div[1]/input')).sendKeys('tejass');
    await driver.findElement(By.xpath('/html/body/app-root/main/app-login/div/mat-card/form/mat-card-actions/button')).click();
    await driver.findElement(By.xpath('/html/body/app-root/main/app-profile-page/mat-sidenav-container/mat-sidenav-content/app-profile-header/mat-toolbar/a[4]')).click();

}

// async function mockUserAction1(){
//     await driver.wait(until.urlIs('http://localhost:4200/profile/myprofile')); 
//     numFollowersElement=await driver.findElement(By.xpath("/html/body/app-root/main/app-profile-page/mat-sidenav-container/mat-sidenav-content/app-profile/div[2]/div[2]/div/span"));
//     await driver.findElement(By.xpath("/html/body/app-root/main/app-profile-page/mat-sidenav-container/mat-sidenav-content/app-profile/div[2]/div[2]/p")).click();
//     await driver.wait(until.urlIs('http://localhost:4200/profile/followers'));
    // await driver.findElements(By.className("mat-card ng-star-inserted")).then(elements=>console.log(elements.length));
    // await console.log(CardElements)

    

    // driver.wait(until.urlIs('http://localhost:4200/profile/followers')); 
    // await driver.get('http://localhost:4200/profile/followers');

// }


it('initialize the driver and fill up login page', async () => {
    await mockUserAction();
    // await console.log(element.getAttribute('innerHTML'));
    
    // await element.getAttribute('innerHTML').then(text => returnedText = text);
        
});


  
// it('test name element text after selenium automation', async() => {   
//     var name;
//     await nameElementSideNav.getAttribute('innerHTML').then(text => name = text);

//     expect(name).not.toBeNull();
//     expect(name).toEqual("Tejas Srivastava");
// });
  
// it('test email element text after selenium automation', async() => {   
//     var email;
//     await emailElementSideNav.getAttribute('innerHTML').then(text=> email=text);
//     expect(email).not.toBeNull();
//     expect(email).toEqual("tejas0809@gmail.com");
// });

// it('test city element text after selenium automation', async() => {   
//     var city;
//     await cityElementSideNav.getAttribute('innerHTML').then(text=> city=text);
//     expect(city).not.toBeNull();
//     expect(city).toEqual("Pune");
// });

// it('test email element text after selenium automation', async() => {   
//     var country;
//     await countryElementSideNav.getAttribute('innerHTML').then(text=> country=text);
//     expect(country).not.toBeNull();
//     expect(country).toEqual("India");
// });

// it('test bio element text after selenium automation', async() => {   
//     var bio;
//     await bioElement.getAttribute('innerHTML').then(text=> bio=text);
//     expect(bio).not.toBeNull();
//     expect(bio).toEqual(" Hey there! ");
// });

// it('test MyProfile in SideNav after selenium automation', async() => {   
//     var myprofile;
    
//     await myProfileSideNav.getAttribute('innerHTML').then(text=> myprofile=text);
//     expect(myprofile).not.toBeNull();
//     expect(myprofile.includes('My Profile')).toBeTruthy();
// });

// it('test activity Feed in SideNav after selenium automation', async() => {   
//     var activityFeed;
    
//     await activityFeedSideNav.getAttribute('innerHTML').then(text=> activityFeed=text);
//     expect(activityFeed).not.toBeNull();
//     expect(activityFeed.includes('Activity Feed')).toBeTruthy();
// });

// it('test Liked Posts in SideNav after selenium automation', async() => {   
//     var likedposts;
    
//     await likedPostsSideNav.getAttribute('innerHTML').then(text=> likedposts=text);
//     // console.log(myprofile)
//     expect(likedposts).not.toBeNull();
//     expect(likedposts.includes('Liked Posts')).toBeTruthy();
// });


// it('test explore  after selenium automation', async() => {   
//     var explore;
//     await exploreElement.getAttribute('innerHTML').then(text=> explore=text);
//     expect(explore).not.toBeNull();
//     expect(explore).toEqual("Explore");
// });


// it('test edit profile after selenium automation', async() => {   
//     var editprofile;
//     await EditProfileElement.getAttribute('innerHTML').then(text=> editprofile=text);
//     expect(editprofile).not.toBeNull();
//     expect(editprofile).toEqual("Edit Profile");
// });


// it('test upload photo after selenium automation', async() => {   
//     var uploadphoto;
//     await uploadPhotoElement.getAttribute('innerHTML').then(text=> uploadphoto=text);
//     expect(uploadphoto).not.toBeNull();
//     expect(uploadphoto).toEqual("Upload Photo");
// });


// it('test logout after selenium automation', async() => {   
//     var logout;
//     await logoutElement.getAttribute('innerHTML').then(text=> logout=text);
//     expect(logout).not.toBeNull();
//     expect(logout).toEqual("Logout");
// });

// it('click followers',async()=>{
//     await mockUserAction1();
// })


// it('check num of followers same as displayed',async()=>{
//     var numfollowersdisp;
//     await numFollowersElement.getAttribute('innerHTML').then(text => numfollowersdisp = text);
//     console.log(numfollowersdisp);
//     expect(numfollowersdisp).not.toBeNull();
//     // expect(numfollowersdisp).toEqual(2);

// })



// (async function example() {
//     let driver = await new Builder().forBrowser('chrome').build();
//     try {
//         // Navigate to Url
//         await driver.get('http://localhost:4200/login');
        
        
//         await driver.findElement(By.xpath('/html/body/app-root/main/app-login/div/mat-card/form/mat-card-content/mat-form-field[1]/div/div[1]/div/input')).sendKeys('nikhil@gmail.com');
//         await driver.findElement(By.xpath('/html/body/app-root/main/app-login/div/mat-card/form/mat-card-content/mat-form-field[2]/div/div[1]/div[1]/input')).sendKeys('nikhil');
//         await driver.findElement(By.xpath('/html/body/app-root/main/app-login/div/mat-card/form/mat-card-actions/button')).click();
//         // await driver.findElement(By.xpath('/html/body/app-root/main/app-login/div/mat-card/form/mat-card-actions/button')).click();


//         // let firstResult = await driver.wait(until.elementLocated(By.css('h3>div')), 10000);

//         // console.log(await firstResult.getAttribute('textContent'));
//     }
//     finally{
//         driver.quit();
//     }
// })();
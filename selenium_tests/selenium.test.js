const {Builder, By, Key, until} = require('selenium-webdriver');
jest.setTimeout(30000);
var driver;
var emailElementSideNav;
var nameElementSideNav;
var cityElementSideNav;
var countryElementSideNav;
var bioElement;
var myProfileSideNav;
var activityFeedSideNav;
var likedPostsSideNav;
var exploreElement;
var EditProfileElement;
var uploadPhotoElement;
var logoutElement;
var numFollowersElement;

beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

afterAll(async () => { 
    await driver.quit();
});
async function mockUserAction() { 

    driver.wait(until.urlIs('http://localhost:4200/login')); 
    await driver.get('http://localhost:4200/login');
    await driver.findElement(By.xpath('/html/body/app-root/main/app-login/div/mat-card/form/mat-card-content/mat-form-field[1]/div/div[1]/div/input')).sendKeys('tejas0809@gmail.com');
    await driver.findElement(By.xpath('/html/body/app-root/main/app-login/div/mat-card/form/mat-card-content/mat-form-field[2]/div/div[1]/div[1]/input')).sendKeys('tejass');
    await driver.findElement(By.xpath('/html/body/app-root/main/app-login/div/mat-card/form/mat-card-actions/button')).click();
    await driver.wait(until.urlIs('http://localhost:4200/profile/myprofile')); 

    nameElementSideNav=await driver.findElement(By.xpath('/html/body/app-root/main/app-profile-page/mat-sidenav-container/mat-sidenav/div/mat-nav-list/span')); 
    emailElementSideNav=await driver.findElement(By.xpath('/html/body/app-root/main/app-profile-page/mat-sidenav-container/mat-sidenav/div/mat-nav-list/div[2]'));
    cityElementSideNav=await driver.findElement(By.xpath('/html/body/app-root/main/app-profile-page/mat-sidenav-container/mat-sidenav/div/mat-nav-list/p[1]'));
    countryElementSideNav=await driver.findElement(By.xpath('/html/body/app-root/main/app-profile-page/mat-sidenav-container/mat-sidenav/div/mat-nav-list/p[2]'));
    bioElement=await driver.findElement(By.xpath('/html/body/app-root/main/app-profile-page/mat-sidenav-container/mat-sidenav-content/app-profile/div[1]/p'));
    myProfileSideNav=await driver.findElement(By.xpath("/html/body/app-root/main/app-profile-page/mat-sidenav-container/mat-sidenav/div/mat-nav-list/a[1]/div"));
    activityFeedSideNav=await driver.findElement(By.xpath("/html/body/app-root/main/app-profile-page/mat-sidenav-container/mat-sidenav/div/mat-nav-list/a[2]/div"));
    likedPostsSideNav=await driver.findElement(By.xpath("/html/body/app-root/main/app-profile-page/mat-sidenav-container/mat-sidenav/div/mat-nav-list/a[3]/div"));
    exploreElement=await driver.findElement(By.xpath("/html/body/app-root/main/app-profile-page/mat-sidenav-container/mat-sidenav-content/app-profile-header/mat-toolbar/a[1]/span"));
    EditProfileElement=await driver.findElement(By.xpath("/html/body/app-root/main/app-profile-page/mat-sidenav-container/mat-sidenav-content/app-profile-header/mat-toolbar/a[2]/span"));
    uploadPhotoElement=await driver.findElement(By.xpath("/html/body/app-root/main/app-profile-page/mat-sidenav-container/mat-sidenav-content/app-profile-header/mat-toolbar/a[3]/span"));
    logoutElement=await driver.findElement(By.xpath("/html/body/app-root/main/app-profile-page/mat-sidenav-container/mat-sidenav-content/app-profile-header/mat-toolbar/a[4]/span"));

    }

async function mockUserAction1(){
    await driver.wait(until.urlIs('http://localhost:4200/profile/myprofile')); 
    numFollowersElement=await driver.findElement(By.xpath("/html/body/app-root/main/app-profile-page/mat-sidenav-container/mat-sidenav-content/app-profile/div[2]/div[2]/div/span"));
    await driver.findElement(By.xpath("/html/body/app-root/main/app-profile-page/mat-sidenav-container/mat-sidenav-content/app-profile/div[2]/div[2]/p")).click();
    await driver.wait(until.urlIs('http://localhost:4200/profile/followers'));
    

    // driver.wait(until.urlIs('http://localhost:4200/profile/followers')); 
    // await driver.get('http://localhost:4200/profile/followers');

}


it('initialize the driver and fill up login page', async () => {
    await mockUserAction();
    // await console.log(element.getAttribute('innerHTML'));
    
    // await element.getAttribute('innerHTML').then(text => returnedText = text);
        
});

  
it('test name element text after selenium automation', async() => {   
    var name;
    await nameElementSideNav.getAttribute('innerHTML').then(text => name = text);

    expect(name).not.toBeNull();
    expect(name).toEqual("Tejas Srivastava");
});
  
it('test email element text after selenium automation', async() => {   
    var email;
    await emailElementSideNav.getAttribute('innerHTML').then(text=> email=text);
    expect(email).not.toBeNull();
    expect(email).toEqual("tejas0809@gmail.com");
});

it('test city element text after selenium automation', async() => {   
    var city;
    await cityElementSideNav.getAttribute('innerHTML').then(text=> city=text);
    expect(city).not.toBeNull();
    expect(city).toEqual("Pune");
});

it('test email element text after selenium automation', async() => {   
    var country;
    await countryElementSideNav.getAttribute('innerHTML').then(text=> country=text);
    expect(country).not.toBeNull();
    expect(country).toEqual("India");
});

it('test bio element text after selenium automation', async() => {   
    var bio;
    await bioElement.getAttribute('innerHTML').then(text=> bio=text);
    expect(bio).not.toBeNull();
    expect(bio).toEqual(" Hey there! ");
});

it('test MyProfile in SideNav after selenium automation', async() => {   
    var myprofile;
    
    await myProfileSideNav.getAttribute('innerHTML').then(text=> myprofile=text);
    expect(myprofile).not.toBeNull();
    expect(myprofile.includes('My Profile')).toBeTruthy();
});

it('test activity Feed in SideNav after selenium automation', async() => {   
    var activityFeed;
    
    await activityFeedSideNav.getAttribute('innerHTML').then(text=> activityFeed=text);
    expect(activityFeed).not.toBeNull();
    expect(activityFeed.includes('Activity Feed')).toBeTruthy();
});

it('test Liked Posts in SideNav after selenium automation', async() => {   
    var likedposts;
    
    await likedPostsSideNav.getAttribute('innerHTML').then(text=> likedposts=text);
    // console.log(myprofile)
    expect(likedposts).not.toBeNull();
    expect(likedposts.includes('Liked Posts')).toBeTruthy();
});


it('test explore  after selenium automation', async() => {   
    var explore;
    await exploreElement.getAttribute('innerHTML').then(text=> explore=text);
    expect(explore).not.toBeNull();
    expect(explore).toEqual("Explore");
});


it('test edit profile after selenium automation', async() => {   
    var editprofile;
    await EditProfileElement.getAttribute('innerHTML').then(text=> editprofile=text);
    expect(editprofile).not.toBeNull();
    expect(editprofile).toEqual("Edit Profile");
});


it('test upload photo after selenium automation', async() => {   
    var uploadphoto;
    await uploadPhotoElement.getAttribute('innerHTML').then(text=> uploadphoto=text);
    expect(uploadphoto).not.toBeNull();
    expect(uploadphoto).toEqual("Upload Photo");
});


it('test logout after selenium automation', async() => {   
    var logout;
    await logoutElement.getAttribute('innerHTML').then(text=> logout=text);
    expect(logout).not.toBeNull();
    expect(logout).toEqual("Logout");
});

it('click followers',async()=>{
    await mockUserAction1();
})

it('check num of followers same as displayed',async()=>{
    var numfollowersdisp;
    await numFollowersElement.getAttribute('innerHTML').then(text => numfollowersdisp = text);
    expect(numfollowersdisp).not.toBeNull();
    expect(numfollowersdisp).toEqual(2);

})



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
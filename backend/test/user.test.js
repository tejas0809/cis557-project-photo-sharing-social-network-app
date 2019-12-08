const request = require('supertest')
const app = require('../app.js')


afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

describe('GET Endpoints', () => {
  it('get all users', async () => {
    const res = await request(app).get('/api/user/')
    // console.log(res.body)/
    const arr=[{ email: 'tejas@gmail.com',
    password:
     '$2b$10$qYgYxqCUXEUwVnkZLplGC.zik43svjDRNjgtSifmBvDOEYWElOxLO',
    fname: 'Tejas',
    lname: 'Srivastava',
    bio: null,
    dob: null,
    gender: null,
    country: null,
    city: null,
    profileImagePath: null,
    coverImagePath: null,
    visibility: 'public' }]
    expect(res.statusCode).toEqual(201)
    expect(res.body.message).toEqual('success')
    expect(res.body.users).toEqual(expect.arrayContaining(arr)) 
    expect(res.body.users.length>=8).toBeTruthy()
  })

  it('Wrong endpoint', async () => {
    const res = await request(app).get('/api/ussfver/')
    expect(res.statusCode).toEqual(404)
  })

  it('get all following', async () => {    
    const arr= [ { email: 'mihir@gmail.com',
    fname: 'Mihir',
    lname: 'Parmar',
    bio: 'Developer at GRASP',
    profileimagePath: null } ]
    const res = await request(app).get('/api/user/following/tejas0809@gmail.com')
    // console.log(res.body)
    expect(res.body.message).toEqual('success')
    expect(res.body.following.length>=1).toBeTruthy()
    expect(res.body.following).toEqual(expect.arrayContaining(arr))
    expect(res.statusCode).toEqual(200)
  })

  it('get all following wrong user', async () => {    
    const res = await request(app).get('/api/user/following/tghfhhgj@hjmmail.com')
    // console.log(res.body)
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toEqual('success')
    expect(res.body.following.length).toEqual(0)
  })
  it('Get all followers of a user', async () => {
    const res = await request(app).get('/api/user/followers/tejas@gmail.com')
    console.log(res.body)
    expect(res.body.message).toEqual('success')
    expect(res.statusCode).toEqual(200)
    // expect(res.body.followers.length>=1).toBeTruthy()
    // expect(res.body.followers).toEqual(expect.arrayContaining(arr))
  })

  it('Get count of followers of a user', async () => {
    const res = await request(app).get('/api/user/followersCount/tejas0809@gmail.com')
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toEqual('success')
  })

  it('Get count of followings of a user', async () => {
    const res = await request(app).get('/api/user/followingCount/tejas0809@gmail.com')
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toEqual('success')
  })

  it('Get Activity feed of a user', async () => {
    const res = await request(app).get('/api/user/activityFeed/nikhil@gmail.com')
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toEqual('success')
  })

  it('Get user', async () => {
    const res = await request(app).get('/api/user/tejas0809@gmail.com')
    console.log(res.body)
    expect(res.statusCode).toEqual(200)
    expect(res.body.user.email).toEqual('tejas0809@gmail.com')
    expect(res.body.user.fname).toEqual('Tejas')
    expect(res.body.user.lname).toEqual('Srivastava')
    expect(res.body.user.bio).toEqual('Hey there!')
    expect(res.body.user.gender).toEqual('male')
  })

  it('Get user with wrong email id', async () => {
    const res = await request(app).get('/api/user/tejaaeds0809@gmail.com')
    expect(res.statusCode).toEqual(401)
  })
})

describe('DELETE Endpoints', () => {
  it('unfollow', async () => {
    const res = await request(app).delete('/api/user/unfollow/tejas@gmail.com&tejas0809@gmail.com')
    console.log(res.body)
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toEqual("successfully deleted")
  })
})

describe('put Endpoints', () => {
  it('edit user with email id wrong date', async () => {
    var body = {
      email: 'tejas0809@gmail.com',
      password: '$2b$10$kd3Bqq69LJiT6o56Fd2ifew74VpxK9P/Y1fsXyE6me14W0eFnape.',
      fname: 'Tejas',
      lname: 'Srivastava',
      bio: 'Hey there!',
      dob: '1997-09-07T18:30:00.000Z',
      gender: 'male',
      country: 'India',
      city: 'Pune',
      profileImagePath: null,
      coverImagePath: null,
      visibility: 'public'
    }
    const res = await request(app).put('/api/user/tejas0809@gmail.com').send(body)
    // console.log(res)
    expect(res.statusCode).toEqual(400)
  })

  it('edit user with email id', async () => {
    var body = {
      email: 'tejas0809@gmail.com',
      password: '$2b$10$kd3Bqq69LJiT6o56Fd2ifew74VpxK9P/Y1fsXyE6me14W0eFnape.',
      fname: 'Tejas',
      lname: 'Srivastava',
      bio: 'Hey there!',
      dob: '1997-09-07 18:30:00',
      gender: 'male',
      country: 'India',
      city: 'Pune',
      profileImagePath: null,
      coverImagePath: null,
      visibility: 'public'
    }
    const res = await request(app).put('/api/user/tejas0809@gmail.com').send(body)
    // console.log(res)
    expect(res.statusCode).toEqual(200)
  })
})

describe('POST endpoints', () => {
  it('signup already existing user' , async () => {
    var body = {
      email: 'tejas@gmail.com',
      password: '$2b$10$kd3Bqq69LJiT6o56Fd2ifew74VpxK9P/Y1fsXyE6me14W0eFnape.',
      fname: 'Tejas',
      lname: 'Srivastava',
      bio: 'Hey there!',
      dob: '1997-09-07',
      gender: 'male',
      country: 'India',
      city: 'Pune',
      profileImagePath: null,
      coverImagePath: null,
      visibility: 'public'
    }
    const res = await request(app).post('/api/user/signup').send(body) 
    // console.log(res.body)
    expect(res.statusCode).toEqual(400)
    expect(res.body.message).toEqual("User Already Exists! Select new email or login with existing one!")
  })

  it('signup new user' , async () => {
    var body = {
      email: 'saumya@gmail.com',
      password: 'robo123',
      fname: 'Mihir',
      lname: 'Parmar',
      bio: 'Developer at GRASP',
      dob: '1997-01-05',
      gender: 'male',
      country: 'USA',
      city: 'Philadelphia',
      profileImagePath: null,
      coverImagePath: null,
      visibility: 'public'
    }
    const res = await request(app).post('/api/user/signup').send(body)
    // console.log(res.body)
    expect(res.body.message).toEqual("success")
    expect(res.statusCode).toEqual(201)
    
  })

  it('login user incorrect password', async () => {
    var body = {
      email: 'tejas0809@gmail.com',
      password:'tejasswrongpassword'
    }
    const res = await request(app).post('/api/user/login').send(body)
    // console.log(res.body)
    // expect(res.body.email).toEqual('tejas0809@gmail.com')
    // expect(res.body.expiresIn).toEqual(3600)
    expect(res.statusCode).toEqual(401)
    // expect(res.body.error).toEqual('Authentication Failed')
  })

  
  it('login user incorrect email', async () => {
    var body = {
      email: 'tejas09@gmail.com',
      password:'tejass'
    }
    const res = await request(app).post('/api/user/login').send(body)
    // console.log(res.body)
    // expect(res.body.email).toEqual('tejas0809@gmail.com')
    // expect(res.body.expiresIn).toEqual(3600)
    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toEqual('No User Found!')
  })

  it('login user correct', async () => {
    var body = {
      email: 'tejas0809@gmail.com',
      password:'tejass'
    }
    const res = await request(app).post('/api/user/login').send(body)
    // console.log(res.body)
    expect(res.body.email).toEqual('tejas0809@gmail.com')
    expect(res.body.expiresIn).toEqual(3600)
    expect(res.statusCode).toEqual(200)
  })

  it('follow user already following', async () => {
    var body = {
      email: 'tejas@gmail.com',
    }
    const res = await request(app).post('/api/user/follow/shubham@gmail.com').send(body)
    // console.log(res)
    expect(res.statusCode).toEqual(400)
    expect(res.body.message).toEqual('Already Following !')
  })

  it('follow new user', async () => {
    var body = {
      email: 'tejas@gmail.com',
    }
    const res = await request(app).post('/api/user/follow/tejas0809@gmail.com').send(body)
    // console.log(res)
    expect(res.body.message).toEqual('success')
    expect(res.statusCode).toEqual(200)
  })


})

const request = require('supertest')
const app = require('../app.js')


afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});


describe('PUT endpoints',()=>{
  it('edit post',async()=>{
    const body={caption:'Now this is what a new caption looks like'}
    const res=await request(app).put('/api/post/3').send(body)
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toEqual('success')
  })

  it('edit wrong post',async()=>{
    const body={caption:'This caption shouldnt update'}
    const res=await request(app).put('/api/post/1').send(body)
    // console.log(res.body)
    expect(res.statusCode).toEqual(400)
    expect(res.body.message).toEqual("No Change!")
  })

  it('edit comment',async()=>{
    const body={content:'Now this is what a new comment looks like'}
    const res=await request(app).put('/api/post/comment/1').send(body)
    console.log(res.body)
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toEqual('success')
  })

  it('edit wrong comment',async()=>{
    const body={content:"This is an updated comment, but it wont get updated"}
    const res=await request(app).put('/api/post/comment/-1').send(body)
    console.log(res.body)
    expect(res.statusCode).toEqual(400)
    expect(res.body.message).toEqual("No Change!")
  })

  })

describe('DELETE endpoints',()=>{
  it('delete a comment',async()=>{
    const res= await request(app).delete('/api/post/comment/10')
    console.log(res.body)
    expect(res.body.message).toEqual('success')
    expect(res.statusCode).toEqual(200)
  })

  it('delete a wrong comment',async()=>{
    const res= await request(app).delete('/api/post/comment/-1')
    console.log(res.body)
    expect(res.body.message).toEqual('No Change!')
    expect(res.statusCode).toEqual(400)

  })

  it('delete a post',async()=>{
    const res= await request(app).delete('/api/post/7')
    console.log(res.body)
    expect(res.body.message).toEqual('success')
    expect(res.statusCode).toEqual(200)
  })

})




describe('POST endpoints',()=>{
  it('post new comment',async()=>{
    const body={
      email:'tejas@gmail.com',
      content:'wow'
    }
    const res = await request(app).post('/api/post/comment/3').send(body)
    expect(res.statusCode).toEqual(200)
  })

  // it('new post',async()=>{
  //   const body={
  //     caption:'testing test image',
  //     email:'tejas0809@gmail.com'
  //   }
  //   const res = await request(app).post('/api/post/comment/3').send(body)
  //   expect(res.statusCode).toEqual(200)
  // })
  it('like a post',async()=>{
    const body={
      email:'tjs@gmail.com'
    }
    // const authToken='$2b$10$um9r2SgA3FEHZUSnZbu/7u5jh2S/XGPvHSRQRcyatRjU.kVWPGWzO'
    const res = await request(app).post('/api/post/like/5').send(body)
    expect(res.statusCode).toEqual(200)
  })


  it('like a post which doesnt exist',async()=>{
    const body={
      email:'tjs@gmail.com'
    }
    // const authToken='$2b$10$um9r2SgA3FEHZUSnZbu/7u5jh2S/XGPvHSRQRcyatRjU.kVWPGWzO'
    const res = await request(app).post('/api/post/like/0').send(body)
    console.log(res.body)
    expect(res.statusCode).toEqual(400)
  })

  
  describe('GET Endpoints', () => {
    it('get post by id', async () => {    
      const res = await request(app).get('/api/post/3')
      console.log(res.body)
      expect(res.statusCode).toEqual(200)
      expect(res.body.message).toEqual('success')
      expect(res.body.post[0].id).toEqual(3)
      expect(res.body.post[0].userEmail).toEqual('saurabh@gmail.com')
    })
  
    it('get post by wrong id', async () => {    
      const res = await request(app).get('/api/post/-2')
      console.log(res.body)
      expect(res.statusCode).toEqual(401)
      expect(res.body.message).toEqual('No such Post found!')
    })
  
    it('get all posts of a user', async () => {    
      const res = await request(app).get('/api/post/user/nikhil@gmail.com')
      console.log(res.body)
      expect(res.body.message).toEqual('success')
      expect(res.statusCode).toEqual(200)
      // expect()
    })
  
    it('get all posts of wrong user', async () => {    
      const res = await request(app).get('/api/post/user/tejsefas0809@gmail.com')
      console.log(res.body)
      expect(res.statusCode).toEqual(401)
    })
  
    it('get all comments of a post', async () => {    
      const res = await request(app).get('/api/post/comments/1')
      console.log(res.body)
      expect(res.statusCode).toEqual(200)
    })
  })
  
  

})
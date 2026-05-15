import { test, expect } from '@playwright/test';

test.describe.serial('API CRUD Test', () => {

    let postId: number;
    let userId: number;
    let randomTitle: string;
    let randomBody: string;

    test('Create a new post', async ({ request }) => {

    //Create a post request body with randomized title, body and id
    userId = Math.floor(Math.random() * 1000) + 1;
    randomTitle = `Test Post ${userId}`;
    randomBody = `This is a test post with id ${userId}.`;
    
    const response = await request.post('/posts', {
      data: {
        title: randomTitle,
        body: randomBody,
        userId: userId
      }
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    const post = await response.json();
    expect(post.title).toBe(randomTitle);
    expect(post.body).toBe(randomBody);
    expect(post.userId).toBe(userId);

    //Get the post id from the response and store it in a variable for later use
    postId = post.id;
    });


  //Read post with the id created in the previous test
  test('Read a post', async ({ request }) => {
    const response = await request.get(`/posts/${postId}`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const res = await response.json();
    expect(res.userId).toBe(userId);
   });


  //Update the post created in the first test with new randomized title and body
  test('Update a post', async ({ request }) => {
    const newTitle = `Updated Test Post ${userId}`;
    const newBody = `This is an updated test post with id ${userId}.`;
    const response = await request.put(`/posts/${postId}`, {
      data: {
        title: newTitle,
        body: newBody,
        userId: userId
      }
    });


    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const updatedPost = await response.json();

    // Verify that the updated post has the new title and body  
    const newgetResponse = await request.get(`/posts/${postId}`);
    expect(newgetResponse.ok()).toBeTruthy();
    expect(newgetResponse.status()).toBe(200);
    const res = await newgetResponse.json();
    expect(res.title).toBe(newTitle);
    expect(res.body).toBe(newBody);
    expect(res.userId).toBe(userId);
   });


  //Delete the post created in the first test and verify that it has been deleted
  test('Delete a post', async ({ request }) => {
    const response = await request.delete(`/posts/${postId}`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const newgetResponse = await request.get(`/posts/${postId}`);
    expect(newgetResponse.status()).toBe(404);
    });

  });

//TODO change to axios callings

/**
   @description This file contains the API call for the Readable Server.
*/

const api = "http://localhost:3001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  'Accept': 'application/json',
  'Authorization': token
};

export const getCategories = () =>
    fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getPosts = (categoryID) =>
    fetch(`${api}/${categoryID}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);


export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getPost = (postID) =>
  fetch(`${api}/posts/${postID}`, { headers })
    .then(res => res.json())
    .then(data =>{
        if(Object.keys(data).length === 0){
            return Promise.reject({message:'post not found',
                                   postID});
        }else return data;});

export const postPost = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...post })
    }).then(res => res.json());


export const votePost = (postID, option) =>
    fetch(`${api}/posts/${postID}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option: option })
    }).then(res => res.json());


export const updatePost = (post) =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...post })
    }).then(res => res.json());


export const deletePost = (postID) =>
    fetch(`${api}/posts/${postID}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
    }).then(res => res.json());


export const getComments = (postID) =>
    fetch(`${api}/posts/${postID}/comments`, { headers })
    .then(res => res.json())
    .then(data => data);


export const postComment = (comment) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...comment })
    }).then(res => res.json());


export const voteComment = (commentID, option) =>
    fetch(`${api}/comments/${commentID}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option: option })
    }).then(res => res.json());


export const updateComment = (comment) =>
    fetch(`${api}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment })
    }).then(res => res.json());


export const deleteComment = (commentID) =>
    fetch(`${api}/comments/${commentID}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
    }).then(res => res.json());

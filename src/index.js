import { getPosts, addPost, updatePost, deletePost } from './crud';
import UIController from './ui.controllers'

const getAllPosts = async () => {
    try {
        const posts = await getPosts('http://localhost:3000/posts')
        UIController.showPosts(posts)
    } catch (e) {
        console.log(e.message)
    }
}

const submitPost = async () => {
    try {
        const title = document.querySelector('#title').value;
        const body = document.querySelector('#body').value;
        const id = document.querySelector('#id').value;
        const post = {
            title,
            body
        }
        if(title === '' || body === '') {
            UIController.showAlert('Please fill in all fields', 'danger')
        }
        else {
            // Check if the id field exists
            if(id === '') { // Add post
                await addPost('http://localhost:3000/posts', post);
                UIController.showAlert('Post added', 'success')
            } else {
                await updatePost(`http://localhost:3000/posts/${id}`, post);
                UIController.showAlert('Post updated', 'success')
                UIController.changeFormState('add')
            }
            getAllPosts()
        }
    } catch (e) {
        console.log(e.message)
    }
}
   
const removePost = async (e) => {
    try {
        e.preventDefault()
        // Target only the delete button itself
        if(e.target.classList.contains('delete')) {
            const id = e.target.dataset.id;
            if(confirm('Are you sure to delete this post?')) {
                await deletePost(`http://localhost:3000/posts/${id}`)
                UIController.showAlert('Post deleted successfully', 'danger')
                getAllPosts()
            }
        }
    } catch (e) {
        console.log(e.message)
    }
}

const editState = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('edit')){
        const id = e.target.dataset.id
        const body = e.target.previousElementSibling.textContent
        const title = e.target.previousElementSibling.previousElementSibling.textContent
        const postToEdit = {
            id,
            body,
            title
        }
        UIController.fillForm(postToEdit)
    }
}

const cancelEdit = (e) => {
    if(e.target.classList.contains('post-cancel')){
        UIController.changeFormState('add')
    } 
    e.preventDefault();
}




// Get posts on DOMload
document.addEventListener('DOMContentLoaded', getAllPosts);
// Submit new post
UIController.template.btnSubmit.addEventListener('click', submitPost)
// Using event delegation for delete button
UIController.template.post.addEventListener('click', removePost)
// Change state when user clicks the edit button
UIController.template.post.addEventListener('click', editState)
// Add Listener for update post
// UIController.template.btnEdit.addEventListener('click', editPost)
// Add Listener for cancel post
UIController.template.cardForm.addEventListener('click', cancelEdit)

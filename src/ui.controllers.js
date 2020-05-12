const template = {
    post: document.querySelector('#posts'),
    postContainer: document.querySelector('.postContainer'),
    titleInput: document.querySelector('#title'),
    bodyInput: document.querySelector('#body'),
    idInput: document.querySelector('#id'),
    btnSubmit: document.querySelector('.post-submit'),
    btnEdit: document.querySelector('.post-edit'),
    btnCancel: document.querySelector('.post-cancel'),
    cardForm: document.querySelector('.card-form'),
    formEnd: document.querySelector('.form-end'),
    forState: 'add'
};

const showPosts = (posts) => {
    let output = ``

    posts.forEach(post => {
        output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fa fa-pencil"></i> Edit
                    </a>
                    <a href="#" class="delete card-link" data-id="${post.id}">
                        <i class="fa fa-remove"></i>Remove
                    </a>
                </div>
            </div>
        `;
    });
    template.post.innerHTML = output;
}


const showAlert = (message, className) => {
    // Clear alert
    clearAlert();
    // Create div
    const div = document.createElement('div')
    // Add className
    div.className = `alert alert-${className}`
    // Add text
    div.appendChild(document.createTextNode(message))
    // Get parent
    const container = template.postContainer;
    // Get posts
    const posts = template.post
    // Insert alert
    container.insertBefore(div, posts)

    setTimeout(() => {
        clearAlert()
    }, 3000)
}

const clearAlert = () => {
    const currentAlert = document.querySelector('.alert')
    if(currentAlert) {
        currentAlert.remove()
    }
}


 const refreshForm = () => {
    template.titleInput.value = '';
    template.bodyInput.value = '';
 }

const fillForm = (post) => {
    UIController.template.titleInput.value = post.title
    UIController.template.bodyInput.value = post.body
    UIController.template.idInput.value = post.id
    changeFormState('edit')
}

const changeFormState = (state) => {
    if(state === 'edit') {
        template.btnSubmit.textContent = 'Update Post'
        template.btnSubmit.className = 'post-submit btn btn-warning btn-block btn-lg'
        template.forState = 'edit'
        
        // Only add btnCancel if it doesn't exist
        const btnCancel = document.querySelector('.post-cancel')
        if(!btnCancel) {
            // Create cancel button
            const btnCancel = document.createElement('button')
            // Add className
            btnCancel.className = 'post-cancel btn btn-dark btn-block btn-lg'
            // Add text
            btnCancel.appendChild(document.createTextNode('Cancel Edit'));

            // Get parent
            const cardForm = template.cardForm;
            // Get element to insert before
            const formEnd = template.formEnd;
            // Insert btnCancel
            cardForm.insertBefore(btnCancel, formEnd)
        }     
    } else {
        // Back to add state
        template.forState = 'add'
        template.btnSubmit.textContent = 'Submit'
        template.btnSubmit.className = 'post-submit btn btn-secondary btn-block btn-lg'
        const btnCancel = document.querySelector('.post-cancel')
        if(btnCancel) {
            btnCancel.remove()
        }
        // Clear the id input used for edit function
        clearIdInput();
        // Refresh the form
        refreshForm();
    }
}

const clearIdInput = () => {
    template.idInput.value = ''
}

const UIController = {
    template: template,
    showPosts: showPosts,
    refreshForm: refreshForm,
    showAlert: showAlert,
    clearAlert: clearAlert,
    fillForm: fillForm,
    changeFormState: changeFormState,
    clearIdInput: clearIdInput
}

export default UIController
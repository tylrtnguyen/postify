export const getPosts = async (url) => {
    const res = await fetch(url)
    const resData = await res.json()
    return resData
}

export const addPost = async (url, post) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    const resData = await res.json();
    return resData;
}

export const updatePost = async (url, post) => {
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    const resData = res.json()
    return resData
}

export const deletePost = async (url) => {
    const res = await fetch(url, {
        method: 'DELETE'
    })
    const resData = await 'Post Deleted'
    return resData
}
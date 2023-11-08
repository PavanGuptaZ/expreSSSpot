export async function deletePost(variables) {
    const { post, user } = variables
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${user.accessToken}` },
        credentials: 'include',
        'Accept': 'application/json',
        body: JSON.stringify({ _id: post._id, userId: post.userId })
    }
    try {
        let responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/posts", requestOptions)
        let data = await responce.json()

        if (responce.status === 200) {
            return { result: true, posts: data }
        } else {
            return { result: false, message: data.message }
        }

    } catch (e) {
        console.log(e)
    }
}
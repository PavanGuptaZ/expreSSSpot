export async function bookmarkPost(variables) {
    const { post, user } = variables
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${user.accessToken}` },
        credentials: 'include',
        'Accept': 'application/json',
    }
    try {
        let responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/posts/bookmark/" + post._id, requestOptions)
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
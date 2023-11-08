export async function postComment(variables) {
    let { user, post, content } = variables
    const data = {
        email: user.email,
        commentUserId: user._id,
        commentPostId: post._id,
        commentOwner: post.userId,
        content: content
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${user.accessToken}` },
        credentials: 'include',
        'Accept': 'application/json',
        body: JSON.stringify(data)
    }
    try {
        let responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/comments" + `/${post._id}`, requestOptions)
        let data = await responce.json()

        if (responce.status === 200) {
            return { result: true, list: data }
        } else {
            return { result: false, list: data }
        }

    } catch (e) {
        console.log(e)
        return { result: false }
    }
}
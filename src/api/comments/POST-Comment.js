export async function postComment(variables) {
    let { user, post, content } = variables
    const data = {
        email: user.email,
        name: "Pavan",
        commentUserId: user._id,
        commentPostId: post._id,
        title: post.title,
        content: content
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${user.accessToken}` },
        credentials: 'include',
        body: JSON.stringify(data)
    }
    try {
        let responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/comments" + `/${post._id}`, requestOptions)
        let data = await responce.json()

        if (responce.status === 200) {
            return { result: true, post: data }
        } else {
            return { result: false, message: data.message }
        }

    } catch (e) {
        console.log(e)
        return { result: true, post: data }

    }
}
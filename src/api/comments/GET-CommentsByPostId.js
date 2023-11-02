export async function fetchCommentsByPostId(user, commentPostId) {

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${user.accessToken}` },
        credentials: 'include',
    }
    try {
        let responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/comments/ddd" + commentPostId, requestOptions)
        let data = await responce.json()

        if (responce.status === 200) {
            console.log({ result: true, data })
            return { result: true, data }
        } else {
            return { result: false, message: data.message }
        }

    } catch (e) {
        console.log(e)
    }
}
export async function fetchCommentsByPostId(user, commentPostId) {

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${user.accessToken}` },
        credentials: 'include',
        'Accept': 'application/json'
    }
    try {
        let responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/comments/" + commentPostId, requestOptions)
        let data = await responce.json()

        if (responce.status === 200) {
            return { result: true, list: data }
        } else {
            return { result: false, message: data.message }
        }

    } catch (e) {
        console.log(e)
    }
}
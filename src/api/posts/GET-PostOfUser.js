export async function getPostOfUser(user, type) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${user.accessToken}` },
        credentials: 'include',
    }
    try {
        let responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/posts" + (type !== '/home' ? type : ''), requestOptions)
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
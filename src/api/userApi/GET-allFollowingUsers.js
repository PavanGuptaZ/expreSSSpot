export async function allFollowingUsers(user, type) {

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${user.accessToken}` },
        credentials: 'include',
        'Accept': 'application/json'
    }
    try {
        let responce = await fetch(import.meta.env.VITE_BACKEND_LINK + `/user${type}List`, requestOptions)
        let data = await responce.json()

        if (responce.status === 200) {
            return { result: true, data }
        } else {
            return { result: false, data }
        }

    } catch (e) {
        console.log(e)
        return { result: false }

    }
}
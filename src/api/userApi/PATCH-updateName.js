export async function updateName(variables) {
    let { name, user } = variables
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${user.accessToken}` },
        credentials: 'include',
        'Accept': 'application/json',
        body: JSON.stringify({ name })
    }
    try {
        let responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/user/updatename", requestOptions)
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
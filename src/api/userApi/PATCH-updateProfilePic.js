export async function updateProfilePic(variables) {
    let { formData, user } = variables
    const requestOptions = {
        method: 'PATCH',
        headers: { authorization: `Bearer ${user.accessToken}` },
        credentials: 'include',
        'Accept': 'application/json',
        body: formData
    }
    try {
        let responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/user/uploadprofilepic", requestOptions)
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
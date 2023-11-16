export async function feedPages(variables) {
    let { pageParam, user, type } = variables
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${user.accessToken}` },
        credentials: 'include',
        'Accept': 'application/json'
    }
    try {
        let responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/feed/" + type + "all?page=" + pageParam, requestOptions)
        let data = await responce.json()

        if (responce.status === 200) {
            return { result: true, ...data }
        } else {
            return { result: false, message: data.message }
        }

    } catch (e) {
        console.log(e)
    }
}
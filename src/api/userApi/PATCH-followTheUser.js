export async function followTheUser(variables) {
    let { user, id } = variables
    console.log("follow")
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`,
            'Accept': 'application/json'
        },
        credentials: 'include',
    }
    try {
        let responce = await fetch(import.meta.env.VITE_BACKEND_LINK + `/user/follow/${id}`, requestOptions)
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

export async function unfollowTheUser(variables) {
    let { user, id } = variables
    console.log("unfollow")
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${user.accessToken}`,
            'Accept': 'application/json'
        },
        credentials: 'include',
    }
    try {
        let responce = await fetch(import.meta.env.VITE_BACKEND_LINK + `/user/unfollow/${id}`, requestOptions)
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
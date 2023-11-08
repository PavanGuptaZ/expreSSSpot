import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { userDetails } from '../Hooks/ContextProvider';
import styles from '../styles/Profile.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDescription, updateName } from '../api/userApi';


let regexCheck = {
    name: /^(?=.{5,30}$)\b[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)?\b$/,
}

export const EditNameDetails = (props) => {
    let { user } = useContext(userDetails)
    const { setEditDetails } = props
    const [userNameEditDetails, setUserEditDetails] = useState(user.name)
    const queryClinet = useQueryClient()

    const handleCancel = () => {
        setEditDetails((pre) => ({ ...pre, name: false }))
    }

    const changeNameMutation = useMutation({
        mutationFn: (variables) => updateName(variables),
        onSuccess: () => {
            setEditDetails((pre) => ({ ...pre, name: false }))
            queryClinet.invalidateQueries(['user'])
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        if (user.name == userNameEditDetails.trim()) {
            setEditDetails((pre) => ({ ...pre, name: false }))
            return
        }
        if (!inputCheck) {
            changeNameMutation.mutate({ name: userNameEditDetails.trim(), user })
        }
    }
    let inputCheck = !regexCheck.name.test(userNameEditDetails.trim())
    if (changeNameMutation.isPending) {
        return <p>Loading</p>
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className={styles.userNameEditForm}>
            <textarea type="text" className={styles.editInput}
                value={userNameEditDetails} onChange={(e) => setUserEditDetails(e.target.value)} />
            {inputCheck && <p className={styles.checkWarning}>{userNameEditDetails.trim().length}- between 5 to 30 characters only</p>}
            <div className={styles.buttonBox}>
                <button className={styles.cancelBTN} type='reset' onClick={handleCancel}>Cancel</button>
                <button className={styles.submitBTN} type='submit'>Submit</button>
            </div>
        </form>
    )
}

export const EditDescriptionDetails = (props) => {
    let { user } = useContext(userDetails)
    const { setEditDetails } = props
    const [userdescriptionEditDetails, setUserEditDetails] = useState(user.description)
    const queryClinet = useQueryClient()

    const handleCancel = () => {
        setEditDetails((pre) => ({ ...pre, description: false }))
    }

    const changeDescriptionMutation = useMutation({
        mutationFn: (variables) => updateDescription(variables),
        onSuccess: () => {
            setEditDetails((pre) => ({ ...pre, description: false }))
            queryClinet.invalidateQueries(['user'])
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        if (user.description == userdescriptionEditDetails.trim()) {
            setEditDetails((pre) => ({ ...pre, description: false }))
            return
        }

        if (!inputCheck) {
            changeDescriptionMutation.mutate({ description: userdescriptionEditDetails.trim(), user })
        }
    }
    let inputCheck = userdescriptionEditDetails.trim().length > 150 || userdescriptionEditDetails.trim().length < 10;
    if (changeDescriptionMutation.isPending) {
        return <p>Loading</p>
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className={styles.userDescriptionEditForm}>
            <textarea type="text" className={styles.editInput}
                value={userdescriptionEditDetails} onChange={(e) => setUserEditDetails(e.target.value)} />
            {inputCheck && <p className={styles.checkWarning}>{userdescriptionEditDetails.trim().length}- Description length should between 10 to 150 characters</p>}
            <div className={styles.buttonBox}>
                <button className={styles.cancelBTN} type='reset' onClick={handleCancel}>Cancel</button>
                <button className={styles.submitBTN} type='submit'>Submit</button>
            </div>
        </form>
    )
}

EditNameDetails.propTypes = {
    setEditDetails: PropTypes.func.isRequired
}
EditDescriptionDetails.propTypes = {
    setEditDetails: PropTypes.func.isRequired
}
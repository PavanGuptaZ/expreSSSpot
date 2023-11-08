import { useContext, useState } from 'react';
import styles from '../../styles/Profile.module.css';
import { themeDetails, userDetails } from '../../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../../theme/themeColors';
import PropTypes from 'prop-types';
import { useKey } from '../../Hooks/useKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfilePic } from '../../api/userApi';

export const ProfilePicUploadBlock = (props) => {
    let { setEditDetails } = props
    const [selectedImage, setSelectedImage] = useState(null);
    let { user } = useContext(userDetails)
    let { theme } = useContext(themeDetails)
    let { body } = theme ? DarkMode : LiteMode;
    const queryClient = useQueryClient()

    const profilePicMutation = useMutation({
        mutationFn: (variables) => updateProfilePic(variables),
        onSuccess: () => {
            queryClient.invalidateQueries(['user'])
            setSelectedImage(null)
            handleCancel()
        }
    })
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file == undefined) return

        if (file.size > 2000000) {
            alert('Image Size Should be less than 2MB');
            return
        }

        if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            setSelectedImage(file);
        } else {
            alert('Please select a valid PNG, JPEG, or JPG image file.');
        }
    };

    const handleUpload = () => {
        if (selectedImage) {
            const formData = new FormData();
            formData.append('profileimg', selectedImage);
            profilePicMutation.mutate({ formData, user })

        } else {
            alert('Please select an image before uploading.');
        }
    };
    const handleCancel = () => {
        setEditDetails((pre) => ({ ...pre, profilePic: false }))
    }
    useKey("Escape", () => handleCancel())

    return (
        <div className={styles.profilePicUpload_block}>
            <div className={styles.blackOut} onClick={handleCancel}></div>
            <div className={styles.profilePic_content} style={{ backgroundColor: body }}>
                <label htmlFor="imageInputforProfilePic" className={styles.imageInputLabel}> Image Select Button </label>
                <input type="file" id="imageInputforProfilePic" className={styles.imageInputforProfilePicClass} accept=".png, .jpeg, .jpg"
                    onChange={handleImageChange}
                />
                {selectedImage &&
                    <div className={styles.displayPic}>
                        <img src={selectedImage && URL.createObjectURL(selectedImage)} alt="Selected"
                            style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </div>
                }
                <div>
                    <button className={styles.YesorNoBTN} onClick={handleCancel}>cancel</button>
                    <button className={styles.YesorNoBTN} onClick={handleUpload} disabled={profilePicMutation.isPending}>upload</button>
                </div>
                {profilePicMutation.isPending && <p style={{ textAlign: "center" }}>Loading</p>}
            </div>
        </div>)
}

ProfilePicUploadBlock.propTypes = {
    setEditDetails: PropTypes.func.isRequired
}
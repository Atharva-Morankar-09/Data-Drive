import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../Contexts/AuthContext'
import { ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { ROOT_FOLDER } from '../../Hooks/useFolder'
import { files } from '../../firebase'
import { serverTimestamp, addDoc, where, updateDoc, query, getDocs } from 'firebase/firestore'
import { v4 as uuidV4 } from 'uuid'
import { ProgressBar, Toast } from 'react-bootstrap'


export default function AddFileBtn({ currFolder }) {

    const [uploadingFiles, setUploadingFiles] = useState([])
    const { currUser } = useAuth()

    function handleUpload(e) {

        const file = e.target.files[0]

        const metaData = {
            contentType: file.type
        }

        if (currFolder == null || file == null) return

        const id = uuidV4()
        setUploadingFiles(prevUploadingFiles => [
            ...prevUploadingFiles,
            {
                id: id,
                name: file.name,
                progress: 0,
                error: false
            }
        ])

        const filePath = currFolder === ROOT_FOLDER
            ? `${currFolder.path.join("/")}/${file.name}`
            : `${currFolder.path.map(f => f.name).join("/")}/${currFolder.Name}/${file.name}`

        const storageRef = ref(getStorage(), `/files/${currUser.uid}/${filePath}`)

        const uploadTask = uploadBytesResumable(storageRef, file, metaData)
        // .then(()=>{
        //     console.log("uploaded")
        // }).catch(()=>{
        //     console.error()
        // })


        uploadTask.on('state_changed', (snapshot) => {
            const progress = snapshot.bytesTransferred / snapshot.totalBytes
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                    if (uploadFile.id === id) {
                        return { ...uploadFile, progress: progress }
                    }
                    return uploadFile
                })
            })
        }, () => {
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                    if (uploadFile.id === id) {
                        return { ...uploadFile, error: true }
                    }
                    return uploadFile
                })
            })
        }, () => {
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.filter(uploadFile => {
                    return uploadFile.id !== id
                })
            })

            getDownloadURL(uploadTask.snapshot.ref).then(url => {
                const q = query(files, where("name", "==", file.name),
                    where("userId", "==", currUser.uid),
                    where("folderId", "==", currFolder.id))
                getDocs(q).then(existingFiles => {
                        const existingFile = existingFiles.docs[0]
                        if (existingFile) {
                            updateDoc(existingFile.ref, {
                                url: url
                            })
                        }
                        else {
                            addDoc(files, {
                                name: file.name,
                                url: url,
                                userId: currUser.uid,
                                createdAt: serverTimestamp(),
                                folderId: currFolder.id
                            })
                        }
                    })

            })
        })
    }

    return (
        <>
            <label className='btn btn-outline-success btn' size="xs">
                <FontAwesomeIcon icon={faFileUpload} />
                <input type="file" onChange={handleUpload} style={{
                    opacity: 0,
                    position: 'absolute', left: '-9999px'
                }} />
            </label>
            {uploadingFiles.length > 0 &&
                ReactDOM.createPortal(
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '1rem',
                            right: '1rem',
                            maxWidth: '250px'
                        }}
                    >
                        {uploadingFiles.map(file => (
                            <Toast key={file.id}
                                onClose={() => {
                                    setUploadingFiles(prevUploadingFiles => {
                                        return prevUploadingFiles.filter(uploadFile => {
                                            return uploadFile.id !== file.id
                                        })
                                    })
                                }}
                            >
                                <Toast.Header
                                    closeButton={file.error}
                                    className='text-truncate w-100 d-block'>
                                    {file.name}
                                </Toast.Header>
                                <Toast.Body>
                                    <ProgressBar
                                        animated={!file.error}
                                        variant={file.error ? 'danger' : 'primary'}
                                        now={file.error ? 100 : file.progress * 100}
                                        label={
                                            file.error ? "Error" : `${Math.round(file.progress * 100)}%`
                                        }
                                    />
                                </Toast.Body>
                            </Toast>
                        ))}
                    </div>,
                    document.body
                )}
        </>
    )
}

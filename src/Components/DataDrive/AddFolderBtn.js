import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { folders } from '../../firebase'
import { addDoc, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../../Contexts/AuthContext'
import { ROOT_FOLDER } from '../../Hooks/useFolder'

export default function AddFolderBtn({ currFolder }) {

    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const { currUser } = useAuth()

    function openModal() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    // const db = collection(getFirestore(), 'folders')
    function handleSubmit(e){

        e.preventDefault()

        if(currFolder == null) return 
        // console.log(currFolder)
        
        const path = [...currFolder.path]
        if(currFolder!==ROOT_FOLDER){
            path.push({ name: currFolder.Name, id:currFolder.id})
        }

        // Create a folder in database
        addDoc(folders, {
            Name: name,
            parentId: currFolder.id,
            UserId: currUser.uid,
            CreatedAt: serverTimestamp(), 
            path: path          
        })
        
        setName("")
        closeModal()
    }

    return (
        <>
            <Button onClick={openModal} variant="outline-success" size="xs" className="mx-2 my-2">
                <FontAwesomeIcon icon={faFolderPlus} />
            </Button>
            <Modal show={open} onHide={closeModal}>
                <Form >
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Folder Name</Form.Label>
                            <Form.Control type="text" required value={name} 
                            onChange={e => { setName(e.target.value) }} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" onClick={closeModal}>Close</Button>
                        <Button variant="primary" onClick={handleSubmit}>Add</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

import { useEffect, useReducer } from "react";
import { doc, getDoc, getFirestore, where, query, orderBy, onSnapshot } from "firebase/firestore";
import { useAuth } from "../Contexts/AuthContext";
import { allData, files, folders } from "../firebase";

const ACTIONS = {
    SELECT_FOLDER: 'selectFolder',
    UPDATE_FOLDER: 'updateFolder',
    SET_CHILD_FOLDERS: 'setchildfolders',
    SET_CHILD_FILES: 'setchildfiles',
}

export const ROOT_FOLDER = { name: 'Home', id: null, path: [] }

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFiles: [],
                childFolders: []
            }

        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder,
            }

        case ACTIONS.SET_CHILD_FOLDERS:
            return {
                ...state,
                childFolders: payload.childFolders,
            }

        case ACTIONS.SET_CHILD_FILES:
            return {
                ...state,
                childFiles: payload.childFiles,
            }
        default:
            return state
    }
}

export function useFolder(folderId = null, folder = null) {

    const {currUser} = useAuth()

    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    })

    useEffect(() => {
        dispatch({
            type: ACTIONS.SELECT_FOLDER, payload: {
                folderId, folder
            }
        })
    }, [folderId, folder])

    useEffect(() => {
        if (folderId == null) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER }
            })
        }

        // Get a single document   
        const docSingle = doc(getFirestore(), 'Folders', folderId)
        getDoc(docSingle)
            .then((doc) => {
                // const allData = {
                //     id: doc.id,
                //     ...doc.data()
                // }
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: { folder: allData(doc) }
                })
            })
            .catch(() => {
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: { folder: ROOT_FOLDER }
                })
            })

    }, [folderId])

    useEffect(() => {
        const q = query(folders,where("parentId", "==", folderId),
                  where("UserId", "==", currUser.uid),
                  orderBy("CreatedAt"))
        
        return onSnapshot(q, (snap) => {
            dispatch({
                type: ACTIONS.SET_CHILD_FOLDERS,
                payload: { childFolders: snap.docs.map(allData) }
            })
        })
    }, [folderId, currUser])

    useEffect(() => {
        const q = query(files,where("folderId", "==", folderId),
                  where("userId", "==", currUser.uid),
                  orderBy("createdAt"))
        
        return onSnapshot(q, (snap) => {
            dispatch({
                type: ACTIONS.SET_CHILD_FILES,
                payload: { childFiles: snap.docs.map(allData) }
            })
        })
    }, [folderId, currUser]) 

    return state
}
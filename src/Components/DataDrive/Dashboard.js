import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams, useLocation } from 'react-router-dom'
import { useFolder} from '../../Hooks/useFolder'
import NavbarComponent from './Navbar'
import AddFolderBtn from './AddFolderBtn'
import AddFileBtn from './AddFileBtn'
import Folder from './Folder'
import File from './File'
import FolderBreadCrumbs from './FolderBreadCrumbs'

export default function Dashboard() {
   
  const { folderId } = useParams()
  const { state = {} } = useLocation()
  const { folder, childFolders, childFiles } = useFolder(folderId, state)
  // console.log(childFolders)

  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <div className='d-flex align-items-center'>
          <FolderBreadCrumbs currFolder={folder} />
          <AddFileBtn currFolder={folder} />
          <AddFolderBtn currFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className='d-flex flex wrap'>
            {childFolders.map(childFolder => (
              <div key={childFolder.id} 
                   style={{ maxWidth: "200px" }} 
                   className="p-2">
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        
        {childFolders.length > 0 && childFiles.length > 0 && <hr/>}
        {childFiles.length > 0 && (
          <div className='d-flex flex wrap'>
            {childFiles.map(childFile => (
              <div key={childFile.id} 
                   style={{ maxWidth: "200px" }} 
                   className="p-2">
                <File file={childFile} />
              </div>
            ))}
          </div>
        )}

      {/* Print folder names */}
      {/* {folder && <Folder folder={folder}></Folder>} */}
      </Container>
    </>
  )
}

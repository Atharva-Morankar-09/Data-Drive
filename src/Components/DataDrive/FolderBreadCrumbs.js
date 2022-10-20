import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ROOT_FOLDER } from '../../Hooks/useFolder'

export default function FolderBreadCrumbs({currFolder}) {

    let path = currFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
    if(currFolder) path = [...path, ...currFolder.path]

  return (
    <Breadcrumb className="flex-grow-1" listProps={{className: "bg-white pl-0 m-0"}}>
       {path.map((folder, index)=>(
           <Breadcrumb.Item 
           key={folder.id} 
           linkAs={Link} 
           linkProps={{
            to: {
                pathname: folder.id? `/folder/${folder.id}` : "/",
                state: { folder: { ...folder, path: path.slice(1,index)} },
            } 

           }}
           className="text-truncate d-inline-block" style={{maxWidth: "150px"}}>
           {folder.name}
       </Breadcrumb.Item>
       ))}
       {currFolder && (
        <Breadcrumb.Item className="text-truncate d-inline-block" style={{maxWidth: "200px"}} active >
            {currFolder.Name}
        </Breadcrumb.Item>
       )}
    </Breadcrumb>
  )
}

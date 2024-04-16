import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc'

import TableUser from "./TableUser"
import { useEffect, useState } from "react"
import { getAllUsers } from "../../../services/apiServices"

const ManageUser = (props) => {
  const [listUsers, setListUsers] = useState([])
  const [showModalCreateUser, setShowModalCreateUser] = useState(false)
  //reden chay truoc dun useEffect chay sau return renturn chay xong moi do useEffect
  useEffect(() => {
    fetchListUsers()
  }, [])
  const fetchListUsers = async () => {
    let res = await getAllUsers()
    if (res.EC === 0) {
      setListUsers(res.DT)
    }
  }
  const testFunction = async () => {
    let res = await getAllUsers()
    if (res.EC === 0) {
      setListUsers(res.DT)
    }
  }
  return (
    <div className="manage-user-container">
      <div className="title">
        ManageUser
      </div>
      <div className="users-content">
        <div className="btn-add-new">
          <button className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          ><FcPlus />Add new users</button>
        </div>
        <div className="table-users-container">
          <TableUser listUsers={listUsers} />
        </div>
        <ModalCreateUser show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
          testFunction={testFunction}
        />
      </div>

    </div>
  )
}

export default ManageUser
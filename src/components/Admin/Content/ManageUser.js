import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc'
import TableUser from "./TableUser"
import { useEffect, useState } from "react"
import { getAllUsers } from "../../../services/apiServices"
import ModalUpdateUser from "./ModalUpdateUser"
import ModalViewUser from "./ModalViewUser"
import ModalDeleteUser from "./ModalDeleteUser"

const ManageUser = (props) => {
  const [listUsers, setListUsers] = useState([])
  const [showModalCreateUser, setShowModalCreateUser] = useState(false)
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
  const [showModalViewUser, setShowModalViewUser] = useState(false)
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
  const [dataUpdate, setDataUpdate] = useState({})
  const [dataDelete, setDataDelete] = useState({})
  const [viewUser, setViewUser] = useState({})
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

  const handleClickBtnUpdate = (user) => {
    setDataUpdate(user)
    setShowModalUpdateUser(true)
  }
  const resetUpdateData = () => {
    setDataUpdate({})
  }
  const handleClickBtnView = (user) => {
    setViewUser(user)
    setShowModalViewUser(true)
  }
  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true)
    setDataDelete(user)
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
          <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          />
        </div>
        <ModalCreateUser show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
          testFunction={testFunction}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUsers={fetchListUsers}
          resetUpdateData={resetUpdateData}


        />
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          viewUser={viewUser}

        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
        />
      </div>

    </div>
  )
}

export default ManageUser
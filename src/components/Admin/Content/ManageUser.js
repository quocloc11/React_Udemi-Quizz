import ModalCreateUser from "./ModalCreateUser"
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc'
import TableUser from "./TableUser"
import { useEffect, useState } from "react"
import { getAllUsers, getUserWithPaginate } from "../../../services/apiServices"
import ModalUpdateUser from "./ModalUpdateUser"
import ModalViewUser from "./ModalViewUser"
import ModalDeleteUser from "./ModalDeleteUser"
import TableUserPaginate from "./TableUserPaginate"

const ManageUser = (props) => {
  const LIMIT_USER = 3
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
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
    //fetchListUsers()
    fetchListUsersWithPaginate(1)
  }, [])
  const fetchListUsers = async () => {
    let res = await getAllUsers()
    if (res.EC === 0) {
      setListUsers(res.DT)
    }
  }
  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER)
    if (res.EC === 0) {
      console.log('re', res.DT)
      setListUsers(res.DT.users)
      setPageCount(res.DT.totalPages)
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
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            handleClickBtnDelete={handleClickBtnDelete}
            handleClickBtnView={handleClickBtnView}

            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateUser show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
          testFunction={testFunction}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUsers={fetchListUsers}
          resetUpdateData={resetUpdateData}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          viewUser={viewUser}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}

        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          fetchListUsers={fetchListUsers}
          currentPage={fetchListUsersWithPaginate}
          setCurrentPage={setCurrentPage}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}

        />
      </div>

    </div>
  )
}

export default ManageUser
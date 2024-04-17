import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc'
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash'
const ModalViewUser = (props) => {
  const { show, setShow, viewUser } = props
  //const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    setEmail('')
    setPassword('')
    setUsername('')
    setRole('USER')
    setImage('')
    setPreviewImage('')
  }
  // const handleShow = () => setShow(true);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("USER")
  const [image, setImage] = useState("")
  const [previewImage, setPreviewImage] = useState('')

  useEffect(() => {
    if (!_.isEmpty(viewUser)) {
      setEmail(viewUser.email)
      setUsername(viewUser.username)
      setRole(viewUser.role)
      setImage('')
      if (viewUser.image) {

        setPreviewImage(`data:image/jpeg;base64,${viewUser.image}`)
      }
    }
  }, [viewUser])






  return (
    <>


      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        //static hieu ung
        className='modal-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>View a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you are reading this text in a modal!

          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                disabled
                onChange={(event) => setPassword(event.target.value)}

              />
            </div>

            <div className="col-md-6">
              <label className="form-label">UserName</label>
              <input type="text" className="form-control" value={username}
                onChange={(event) => setUsername(event.target.value)}

              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select className="form-select" onChange={(event) => setRole(event.target.value)}
                value={role}
              >
                <option selected value='USER'>USER</option>
                <option value='ADMIN'>ADIMN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor='labelUpload'>
                <FcPlus />Upload File Image</label>
              <input type='file' id='labelUpload' hidden

              />
            </div>
            <div className='col-md-12 img-preview'>
              {previewImage ?
                <img src={previewImage} />
                :
                <span>Preview Image</span>

              }
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalViewUser
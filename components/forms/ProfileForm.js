import React, { useEffect, useState } from 'react';
import useRouter from 'next/router';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import { GoSignOut } from 'react-icons/go';
import { registerUser, signOut } from '../../utils/auth';
import { updateUser } from '../../utils/data/api/userData';

export default function ProfileForm({ user, onUpdate }) {
  const router = useRouter;
  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`;

  const [formInput, setFormInput] = useState({
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    profile_image_url: '',
    created_on: '',
    uid: '',
  });

  useEffect(() => {
    if (user.id) {
      setFormInput(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      id: user.id,
      email: user.email,
      uid: user.uid,
      first_name: formInput.first_name,
      last_name: formInput.last_name,
      profile_image_url: formInput.profile_image_url,
      created_on: date,
    };
    if (user.id) {
      updateUser(userData, user.id)
        .then(() => router.push('../../profile'));
    } else {
      registerUser(userData).then(() => onUpdate(user.id));
    }
  };
  console.log(user);
  return (
    <div onSubmit={handleSubmit} className="card cardForm text-center text-dark bg-light mb-3">
      <div className="card-header">
        {user.id ? 'Update' : 'Create' } Profile
      </div>
      <div className="card-body">
        <Row className="mb-3">

          <Form.Group as={Col} controlId="image">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control value={formInput.profile_image_url} onChange={handleChange} type="url" name="profile_image_url" placeholder="Image Url" />
          </Form.Group>

        </Row>
        <Row className="mb-3">

          <Form.Group as={Col} controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control value={formInput.first_name} onChange={handleChange} name="first_name" type="text" placeholder="John" />
          </Form.Group>

          <Form.Group as={Col} controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control value={formInput.last_name} onChange={handleChange} name="last_name" type="text" placeholder="Doe" />
          </Form.Group>

        </Row>
        <ButtonGroup vertical>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            {user.id ? 'Update' : 'Create'} Profile
          </Button>

          <Button variant="danger" type="submit" onClick={signOut}>
            <GoSignOut />
          </Button>
        </ButtonGroup>
      </div>
      <div className="card-footer text-muted">
        CAW &#8482;
      </div>
    </div>
  );
}

ProfileForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string,
    fbUser: PropTypes.shape({
      email: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

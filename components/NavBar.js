/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { FaHatCowboy } from 'react-icons/fa';
import { BsPersonCircle, BsFillDoorOpenFill } from 'react-icons/bs';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getUserById } from '../utils/data/api/userData';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const { user } = useAuth();
  const router = useRouter();

  const checkIfUserExistsThenRoute = () => {
    getUserById(user.id).then((response) => {
      if (response) {
        router.push(`/profile/${user.id}`);
      } else {
        router.push('/profile/new');
      }
    });
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="primary">
      <Container className="navContainer">
        <Link passHref href="/" className="homeIcon">
          <Navbar.Brand><FaHatCowboy /></Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link>Today&#39;s Entry</Nav.Link>
            </Link>
            <Link passHref href="/calendar">
              <Nav.Link>Calendar</Nav.Link>
            </Link>
            <Link passHref href="/users">
              <Nav.Link>Profile</Nav.Link>
            </Link>
            <li className="nav-item">
              <Button type="button" variant="outline-dark" className="btn navBtn" onClick={() => checkIfUserExistsThenRoute()}>
                <h5><BsPersonCircle /></h5>
              </Button>
            </li>
            <li className="nav-item">
              <Button type="button" variant="outline-danger" className="btn navBtn" onClick={signOut}>
                <h5><BsFillDoorOpenFill /></h5>
              </Button>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

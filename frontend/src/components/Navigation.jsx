import { Menu, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';





import React from 'react';

const Navigation = () => {
    return (
        <Menu>
            <Container>
                <NavLink to="/auth" >
                    <Menu.Item name='auth' >
                        Auth
                </Menu.Item>
                </NavLink>

                <NavLink to="/events" >
                    <Menu.Item name='events' >
                        Events
                </Menu.Item>
                </NavLink>

                <NavLink to="/bookings" >
                    <Menu.Item name='bookings' >
                        Bookings
                </Menu.Item>
                </NavLink>
            </Container>
        </Menu>
    )
}

export default Navigation;


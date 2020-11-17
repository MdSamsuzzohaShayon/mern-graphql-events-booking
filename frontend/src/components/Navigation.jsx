import { Menu, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import AuthContext from "../context/auth-context";





import React from 'react';

const Navigation = () => {
    return (
        <AuthContext.Consumer>
            {(context) => {
                return (
                    <Menu stackable >
                        <Container>
                            {!context.token &&
                                <NavLink to="/auth" >
                                    <Menu.Item name='auth' >
                                        Auth
                                    </Menu.Item>
                                </NavLink>
                            }

                            <NavLink to="/events" >
                                <Menu.Item name='events' >
                                    Events
                                </Menu.Item>
                            </NavLink>

                            {context.token &&
                                <NavLink to="/bookings" >
                                    <Menu.Item name='bookings' >
                                        Bookings
                                    </Menu.Item>
                                </NavLink>
                            }
                        </Container>
                    </Menu>
                );
            }}
        </AuthContext.Consumer>
    )
}

export default Navigation;


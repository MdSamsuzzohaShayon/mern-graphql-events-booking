import { Menu, Container, Button } from 'semantic-ui-react';
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
                            <NavLink to="/" >
                                <Menu.Item style={{ color: "teal" }} name='event_management' >
                                    Event Management
                                </Menu.Item>
                            </NavLink>
                            <Menu.Menu position="right">
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

                                {context.token && (
                                    <React.Fragment>
                                        <NavLink to="/bookings" >
                                            <Menu.Item name='bookings' >
                                                Bookings
                                        </Menu.Item>
                                        </NavLink>

                                        <Menu.Item name='logout' >
                                            <Button onClick={context.logout} color="red">
                                                Logout
                                                </Button>
                                        </Menu.Item>
                                    </React.Fragment>

                                )}
                            </Menu.Menu>

                        </Container>
                    </Menu>
                );
            }}
        </AuthContext.Consumer>
    )
}

export default Navigation;


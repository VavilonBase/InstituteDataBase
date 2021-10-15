import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

function Navibar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="">Институт</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Файл" id="file-dropdown">
                            <NavDropdown.Item href="">
                                Создать базу данных...
                            </NavDropdown.Item>
                            <NavDropdown.Item href="">
                                Открыть базу данных...
                            </NavDropdown.Item>
                            <NavDropdown.Item href="">
                                Закрыть окно
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="">
                                Сохранить базу данных как...
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="">
                                Скопировать на съемный диск
                            </NavDropdown.Item>
                            <NavDropdown.Item href="">
                                Восстановить со съемного диска
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="">
                                Печать справочников
                            </NavDropdown.Item>
                            <NavDropdown.Item href="">
                                Печать документов
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="">Выход</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Вид" id="view-dropdown">
                            <NavDropdown.Item href="">
                                Панель инструментов
                            </NavDropdown.Item>
                            <NavDropdown.Item href="">
                                Статус строка
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="">
                                Обновить
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown
                            title="Справочники"
                            id="references-dropdown"
                        >
                            <NavDropdown.Item href="">Вуз</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/documents">
                                Документы
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/countries">
                                Страны
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/marks">
                                Оценки
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/disciplines">
                                Дисциплины
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/directions">
                                Направления подготовки(специальности)
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/groups">
                                Группы выпускников(квалификации)
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/students">
                                Выпускники(дипломы)
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="">Отчеты</Nav.Link>
                        <Nav.Link href="">Сервис</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navibar;

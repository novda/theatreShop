import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {ShopItem} from "./ShopItem";
import React from "react";

// interface BuyTicketComponent {
//     item: ShopItem
// }

export function BuyTicketComponent() {

    return (
        <Container>
            <h3>Заполните поля:</h3>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Имя</Form.Label>
                        <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                            Name
                        </Form.Label>
                        <Form.Control id="inlineFormInputName" placeholder="Jane Doe" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                            Name
                        </Form.Label>
                        <Form.Control id="inlineFormInputName" placeholder="Jane Doe" />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Адрес</Form.Label>
                    <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>
                </Row>


                <Button variant="primary" type="submit">
                    Перейти к странице оплаты
                </Button>

            </Form>
            </Container>

    )
}
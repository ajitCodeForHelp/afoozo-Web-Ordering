import React from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { FaSearch, FaFilter, FaShoppingCart } from 'react-icons/fa';
import { BsHouseDoor, BsTruck, BsFillPersonFill, BsList } from 'react-icons/bs';



const popularItems = [
    { name: 'Cheeseburger Deluxe', price: '₹8.99', description: 'Juicy beef patty with melted cheese, fres...', image: '🍔' },
    { name: 'Margherita Pizza', price: '₹12.99', description: 'Classic pizza with fresh basil...', image: '🍕' },
];

const recommendedItems = [
    { name: 'Fried Rice', price: '₹90.00', description: 'A delicious blend of stir-fried vegetables...', rating: 4.8 },
    { name: 'Butter Chicken', price: '₹165.99', description: 'Tender pieces of chicken cooked in rich tomato...', rating: 4.9 },
    { name: 'Dal Makhani Rice Bowl', price: '₹135.49', description: 'Rich and creamy lentil rice bowl...', rating: 4.7 },
];

export default function Cafee() {
    return (
        <Container fluid className="p-3">
           

            <h5 className="mb-2 d-flex justify-content-between">
                <span>Popular Items</span><a href="#">View All</a>
            </h5>
            <Row className="mb-3">
                {popularItems.map((item, idx) => (
                    <Col xs={6} key={idx} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title className="fs-6">{item.image} {item.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{item.price}</Card.Subtitle>
                                <Card.Text className="small">{item.description}</Card.Text>
                                <Button variant="danger" size="sm">Add to Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <h5 className="mb-2 d-flex justify-content-between">
                <span>Recommended for You</span><a href="#">View All</a>
            </h5>
            {recommendedItems.map((item, idx) => (
                <Card className="mb-2" key={idx}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        <div>
                            <Card.Title className="fs-6">{item.name}</Card.Title>
                            <Card.Subtitle className="text-muted small">{item.price}</Card.Subtitle>
                            <Card.Text className="small">{item.description}</Card.Text>
                            <small className="text-warning">⭐ {item.rating}</small>
                        </div>
                        <Button variant="danger" size="sm">Add</Button>
                    </Card.Body>
                </Card>
            ))}

            <div className="fixed-bottom bg-white border-top d-flex justify-content-around py-2">
                <div className="text-center"><BsHouseDoor /> <div className="small">Home</div></div>
                <div className="text-center"><BsTruck /> <div className="small">Delivery</div></div>
                <div className="text-center"><BsFillPersonFill /> <div className="small">Dine-in</div></div>
                <div className="text-center"><FaShoppingCart /> <div className="small">Orders</div></div>
            </div>
        </Container>
    );
}

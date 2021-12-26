import React from 'react';
import {ShopItem} from "./ShopItem";
import {Card} from "react-bootstrap";
import "./ListItemComponent.scss";
import {Link} from "react-router-dom";
import {cartService} from "./CartService";
import {cartItemFromShopItem} from "./CartItem";

/**
 * Входные параметры компоненты "элемент списка на главной странице"
 */
interface ListItemComponentProps {
    // Товар
    item: ShopItem;
}

/**
 * Элемент списка товаров на главной странице
 * @param props Входные параметры.
 */


export function ListItemComponent(props: ListItemComponentProps) {
    let item = props.item;


    return (
        <Link to={"/item/" + item.id} className="itemLink">
        <Card className={"list-item"} style={{ width: '18rem' , cursor: "pointer", height: '30rem'}}>
            <Card.Img style={{height: 242}} variant="top" src={item.imageSrc} />
            <Card.Body>
                <Card.Title>
                        {item.title}
                </Card.Title>
                <Card.Text>
                    {item.brief}
                </Card.Text>
            </Card.Body>
            <Card.Text style={{color:"#cccccc", margin: "15px" }}>
                Подробнее →
            </Card.Text>
            <span style={{color:"#404040", margin: "15px", }}><b>₽{item.price}</b></span>
        </Card>
        </Link>
    );
}

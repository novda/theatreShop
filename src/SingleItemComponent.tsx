import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Form, InputGroup, Modal, ModalBody, Row} from "react-bootstrap";
import ReactDOM from "react-dom";
import {ShopItem} from "./ShopItem";
import "./SingleItemComponent.scss";
import {DataServiceInstance} from "./DataService";
import {useParams, Link} from "react-router-dom";
import {cartService} from "./CartService";
import {cartItemFromShopItem} from "./CartItem";
import {CheckboxDescription, Description, ImageDescription, TextDescription} from "./Descriptions";
import {CommentItem} from "./CommentItem";
import {ReactComponent} from "*.svg";
import {BuyTicketComponent} from "./BuyTicketComponent";
// Состояние компоненты "Страница товара"
interface SingleItemComponentState {
    item: ShopItem | null;
    comments: CommentItem[];
}

/**
 * Страница товара
 */
export function SingleItemComponent() {
    // itemId из URL-адреса. Пример /item/1, itemId == 1
    let {itemId} = useParams();

    let textAreaRef = useRef<HTMLTextAreaElement>(null);

    let [state, changeState] = useState<SingleItemComponentState>({
        item: null,
        comments: []
    });

    useEffect(() => {
        // Один раз загружаем информацию о товаре
        if (itemId) {
            let itemPromise = DataServiceInstance.getItem(+itemId);

            let commentsPromise = DataServiceInstance.getAllComments(+itemId);

            Promise.all([itemPromise, commentsPromise]).then(([item, comments]) => {
                changeState({
                    item: item,
                    comments: comments
                })
            });
        }
    }, []);

    let item = state.item;

    function renderText(desc: TextDescription) {
        return (
          <p>{desc.text}</p>
        );
    }

    function renderImage(desc: ImageDescription) {
        return (
          <img className="description-image" src={desc.imageSrc}/>
        );
    }

    const iframe = '<iframe height="265" style="width: 100%;" title="fx." src="http://localhost:3000/buy-ticket"> </iframe>';
    function Iframe(props:any) {
        return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
    }
    function IFrameApp() {
        return (
            <div className="app">
                <Iframe iframe={iframe} />,
            </div>
        );
    }

    function buy_ticket() {
        const rootElement = document.getElementById("img-id");
        return (
            ReactDOM.render(<IFrameApp/>,rootElement)
        )
    }


    function renderCheckbox(desc: CheckboxDescription) {
        return (
            <div>
                <Form>
                    {
                        desc.variant.map(checkBox => {
                            return (
                                <Form.Check name={desc.name} type={"checkbox"} label={checkBox}/>
                            )
                        })
                    }
                </Form>
            </div>
        );
    }

    function renderDescriptions(descriptions: Description[]) {
        if (!descriptions) {
            return (<div></div>);
        }

        return descriptions.map((description: Description) => {
            if (description.type === "text") {
                return renderText(description as TextDescription);
            } else if (description.type === "image") {
                return renderImage(description as ImageDescription);
            } else if (description.type === "checkbox") {
                return renderCheckbox(description as CheckboxDescription);
            }
        });
    }

    async function submitComment() {
        let current: HTMLTextAreaElement | null = textAreaRef.current;

        if (!current) {
            return;
        }

        let textContent = current.value;

        if (!textContent) {
            return;
        }

        let itemId = state.item?.id;

        if (!itemId) {
            return;
        }

        await DataServiceInstance.submitComment(itemId, textContent);

        current.value = "";

        state.comments.push({
            text: textContent,
            shopItemId: 0
        });

        changeState({
            ...state,
            comments: state.comments
        });
    }

    // @ts-ignore
    /**
     * Отрисовка элемента
     * @param item
     *
     */

    function renderItem(item: ShopItem | null) {
        if (!item) {
            return (<div></div>);
        }

        // @ts-ignore
        return (
            <Container>
                <Row>
                    <Col>
                        <img className={"item-image"} src={item.imageSrc}/>
                    </Col>
                    <Col>
                        <h1>{item.title}</h1>
                        <p>{item.brief}</p>
                        <h5>Описание:</h5>
                        {renderDescriptions(item.description)}
                        <div className={"d-grid gap-2"}>
                            <span style={{color:"#404040", fontSize: "2rem" }}><b>${item.price}</b></span>
                            {/* eslint-disable-next-line @typescript-eslint/no-unused-expressions */}
                            <Link to={"/buy-ticket"}>
                                <Button size={"lg"} className={"buy-button"} variant={"light"} >Купить</Button>
                            </Link>
                        </div>
                    </Col>

                <div className="comment-block " id={"img-id"}>
                    {
                        state.comments.map(comment => {
                            return (
                                <Row>
                                    <Col>
                                        <p className="comment">{comment.text}</p>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </div>

                <Row>
                    <Col>
                        <textarea className="comment-input" ref={textAreaRef}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => submitComment()}>Submit</Button>
                    </Col>
                </Row>
                </Row>
            </Container>
        );
    }

    return renderItem(item);
}

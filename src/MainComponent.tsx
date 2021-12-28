import React, {useEffect, useState} from 'react';
import {ItemColor, ShopItem} from "./ShopItem";
import {Button, Col, Container, Row} from "react-bootstrap";
import {ListItemComponent} from "./ListItemComponent";
import {DataServiceInstance} from "./DataService";
import "./MainComponent.scss";

/**
 * Состояние компоненты главная страница
 */
interface MainComponentState {
    items: ShopItem[];
    color: string | null;
}

/**
 * Главная страница
 */
export function MainComponent() {
    let [state, changeState] = useState<MainComponentState>({
        items: [],
        color: null
    });

    useEffect(() => {
        // Один раз загружаем все товары
        DataServiceInstance.getData(state.color).then(value => {
            changeState({
                items: value,
                color: state.color
            });
        });
    }, [state.color]);

    function onColorInputChange(event: React.MouseEvent<HTMLButtonElement>, value:any) {
        if (value === "all") {
            value = "";
        }
        changeState({
            ...state,
            color: value
        });
    }

    let items = state.items;


    return (
      <Container>
          <Row className="filter-buttons">
              <Col xs={4}>
                      {
                          Object.keys(ItemColor).map(color => {
                              // @ts-ignore
                              let humanReadable = ItemColor[color]
                              return (
                                  <Button variant="outline-dark" className="color-select" onClick={event => onColorInputChange(event, color)}>
                                      {humanReadable}
                                  </Button>
                              );
                          })
                      }
              </Col>
          </Row>
          <Row>
              {
                  items.map((item: ShopItem) => {
                      return (
                          <Col xs={3} key={item.id}>
                              <ListItemComponent item={item}/>
                          </Col>
                      )
                  })
              }
          </Row>
      </Container>
    );
}

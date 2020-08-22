import React from 'react';
import ApiOrderDto from '../../dtos/ApiOrderDto';
import api, { ApiResponse } from '../../api/api';
import { Redirect } from 'react-router-dom';
import { Container, Card, Table, Modal, Button, Tabs, Tab } from 'react-bootstrap';
import RoledMainMenu from '../RoledMainMenu/RoledMainMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import CartType from '../../types/CartType';
import OrderType from '../../types/OrderType';

interface AdministratorDashboardOrderState{
    isAdministratorLoggedIn: boolean;
    cartVisible: boolean;
    orders: ApiOrderDto[];
    cart?: CartType;
    
}

export default class AdministratorDashboardOrder extends React.Component {
    state: AdministratorDashboardOrderState;

    constructor(props: Readonly<{}>){
        super(props);

        this.state = {
            isAdministratorLoggedIn: true,
            cartVisible: false,
            orders: [],
        };
    }

    private setOrders(orders: ApiOrderDto[]){
        const newState = Object.assign(this.state,{
            orders: orders,
        });
        this.setState(newState);
    }

    private setLogginState(isLoggedIn: boolean){
        this.setState(Object.assign(this.state,{
          isAdministratorLoggedIn: isLoggedIn,
        }));
      }

    private setCartVisibleState(state: boolean){
        this.setState(Object.assign(this.state,{
            cartVisible: state,
        }));
    }

    private setCartState(cart: CartType){
        this.setState(Object.assign(this.state,{
            cart: cart,
        }));
    }

    private hideCart(){
        this.setCartVisibleState(false);
    }

    private showCart(){
        this.setCartVisibleState(true);
    }

    private calculateSum(): number {
        let sum: number = 0;

        if(this.state.cart === undefined){
            return sum;
        }else{

            for(const item of this.state.cart?.cartArticles){
                sum += item.article.articlePrices[item.article.articlePrices.length-1].price * item.quantity;
                                        
            } 
        }

        return sum;
    }

    reloadOrders(){
        api('/api/order/','get',{},'administrator')
        .then((res:ApiResponse) => {
            if (res.status === "error" || res.status === "login"){
                this.setLogginState(false);
                return;
            }
            const data: ApiOrderDto[] = res.data;

            this.setOrders(data);

        });
    }

    

    componentDidMount(){
    }

    changeStatus(orderId: number, newStatus: "prihvacena" | "odbijena" | "na cekanju"){
        api('/api/order/' + orderId, 'patch', { newStatus }, 'administrator')
        .then((res:ApiResponse) => {
            if (res.status === "error" || res.status === "login"){
                this.setLogginState(false);
                return;
            }
            this.reloadOrders();

         });
    }



         private setAndShowCart(cart: CartType){
            this.setCartState(cart);
            this.showCart();
    
        }

        renderOrders(withStatus: "prihvacena" | "odbijena" | "na cekanju"){
            return(
                <Table hover size="sm" bordered>
                    <thead>
                        <tr>
                            <th className="text-right pr-2">Order ID</th>
                            <th>Date</th>
                            <th>Cart</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.orders.filter(order => order.status === withStatus).map(order => (
                            <tr>
                                <td className="text-right pr-2">{ order.orderId }</td>
                                <td>
                                <Button size="sm" variant="primary"
                                        onClick={() => this.setAndShowCart(order.cart)}>
                                        <FontAwesomeIcon icon={ faBoxOpen } />
                                </Button>
                                </td>
                                <td>
                                    { this.printStatusChangeButtons(order)}
                                </td>
                            </tr>
                        ), this) }
                                </tbody>
                </Table>
            );
        }

        render(){
            if (this.state.isAdministratorLoggedIn === false){
                return (
                    <Redirect to="/administrator/login/" />
                );
            }

            const sum = this.calculateSum();
    
            return (
            <Container>
                <RoledMainMenu role="administrator" />
    
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={ faCartArrowDown } /> Orders
                            </Card.Title>

                            <Tabs defaultActiveKey="na cekanju" id="order-tabs" className="ml-0 mb-0">
                                <Tab eventKey="na cekanju" title="Cekanje">
                                    { this.renderOrders("na cekanju") }
                                </Tab>

                                <Tab eventKey="prihvacena" title="Prihvacena">
                                    { this.renderOrders("prihvacena") }
                                </Tab>

                                <Tab eventKey="odbijena" title="Odbijena">
                                    { this.renderOrders("odbijena") }
                                </Tab>
                            </Tabs>

                            


                            
                        </Card.Body>
                    </Card>
                    
                    <Modal size="lg" centered show={ this.state.cartVisible } onHide={ () => this.hideCart()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Order content</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Table hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Article</th>
                                        <th className="text-right">Quantity</th>
                                        <th className="text-right">Price</th>
                                        <th className="text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody> 
                                    { this.state.cart?.cartArticles.map(item => {
                                        const price = Number(item.article.articlePrices[item.article.articlePrices.length-1].price).toFixed(2);
                                        const total = Number(item.article.articlePrices[item.article.articlePrices.length-1].price * item.quantity).toFixed(2);
                                        return(
                                            <tr>
                                                <td>{ item.article.category.name }</td>
                                                <td>{ item.article.name }</td>
                                                <td className="text-right">{ item.quantity }</td>
                                                <td className="text-right">{ price } RSD</td>
                                                <td className="text-right">{ total } RSD</td>
                                                
                                            </tr>
                                        )
                                    }, this)}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="text-right"><strong>Total:</strong></td>
                                        <td className="text-right">{ Number(sum).toFixed(2) } RSD</td>
                                        

                                    </tr>
                                </tfoot>
                            </Table>


                        </Modal.Body>
                        

                </Modal>
            </Container>
        );
    }

    printStatusChangeButtons(order: OrderType){
        if( order.status === "na cekanju"){
            return(
                <>
                    <Button type="button" variant="primary" size="sm" className="mr-1"
                            onClick={() => this.changeStatus(order.orderId, 'prihvacena')}>Prihvacena</Button>
                    <Button type="button" variant="danger" size="sm"
                            onClick={() => this.changeStatus(order.orderId, 'odbijena')}>Odbijena</Button>
                </>
            );
        }

        if( order.status === "prihvacena"){
            return(
                <>
                    <Button type="button" variant="secondary" size="sm"
                            onClick={() => this.changeStatus(order.orderId, 'na cekanju')}>Vrati na cekanje</Button>
                </>
            );
        }

        if( order.status === "odbijena"){
            return(
                <>
                    <Button type="button" variant="secondary" size="sm"
                            onClick={() => this.changeStatus(order.orderId, 'na cekanju')}>Vrati na cekanje</Button>
                </>
            );
        }
    }
}